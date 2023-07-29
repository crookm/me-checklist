using System.IO.Compression;
using Ardalis.GuardClauses;
using MassEffect.Checklist.Contracts;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;
using MassEffect.Checklist.Inspect.Serializer.MassEffect1.Extensions;

namespace MassEffect.Checklist.Inspect.Serializer.MassEffect1;

public class SaveFileSerializer : ISaveFileSerializer<MassEffect1SaveFile>
{
    public Game ImplementedGame => Game.MassEffect1;

    public async Task<MassEffect1SaveFile> DeserializeAsync(Stream stream, CancellationToken token = default)
    {
        Guard.Against.Null(stream);
        Guard.Against.Zero(stream.Length);

        using var compressedReader = new BinaryReader(stream);
        if (compressedReader.ReadUInt32() != 0x9E2A83C1)
            throw new InvalidOperationException("Invalid save file magic number");

        var blockSize = compressedReader.ReadUInt32();
        var fullHeader = compressedReader.ReadSaveChunkHeader();

        var decompressedBuffer = new byte[fullHeader.DecompressedSize];
        using var decompressedSaveStream = new MemoryStream(decompressedBuffer, writable: true);

        var chunkedHeaders = new List<SaveChunkHeaderRecord>();
        while (true)
        {
            var header = compressedReader.ReadSaveChunkHeader();
            chunkedHeaders.Add(header);
            if (header.DecompressedSize < blockSize) break; // The last chunk is smaller than the block size
        }

        foreach (var chunkBytes in
                 chunkedHeaders.Select(chunk => compressedReader.ReadBytes((int)chunk.CompressedSize)))
        {
            using var compressedStream = new MemoryStream(chunkBytes);
            await using var decompressor = new ZLibStream(compressedStream, CompressionMode.Decompress);
            await decompressor.CopyToAsync(decompressedSaveStream, token);
        }

        decompressedSaveStream.Seek(0, SeekOrigin.Begin);
        using var decompressedReader = new BinaryReader(decompressedSaveStream);
        return new SaveFileReader(decompressedReader).Read();
    }
}