using MassEffect.Checklist.Contracts;
using MassEffect.Checklist.Inspect.Contracts;

namespace MassEffect.Checklist.Inspect.Serializer;

public interface ISaveFileSerializer<TGameImpl> where TGameImpl : ISaveFile
{
    Game ImplementedGame { get; }

    /// <summary>
    /// Deserializes a Mass Effect save game file from the given <paramref name="stream"/>
    /// </summary>
    /// <remarks>This method will also perform decompression</remarks>
    /// <param name="stream">The raw file stream of the Mass Effect save file</param>
    /// <param name="token">A cancellation token</param>
    /// <exception cref="ArgumentException">Thrown when the input <paramref name="stream"/> has a length of zero</exception>
    /// <exception cref="ArgumentNullException">Thrown when the <paramref name="stream"/> parameter is null</exception>
    /// <exception cref="InvalidOperationException">Thrown when the file stream is invalid in some way, such as not being a valid save file, or appears maliciously crafted</exception>
    /// <exception cref="EndOfStreamException">Thrown when the end of the file stream is reached unexpectedly</exception>
    /// <returns>The deserialized save file</returns>
    Task<TGameImpl> DeserializeAsync(Stream stream, CancellationToken token = default);
}