using MassEffect.Checklist.Inspect.Contracts.MassEffect1;
using MassEffect.Checklist.Inspect.Serializer.Extensions;
using MassEffect.Checklist.Inspect.Serializer.MassEffect1.Extensions;

namespace MassEffect.Checklist.Inspect.Serializer.MassEffect1;

public class SaveFileReader
{
    private readonly BinaryReader _reader;

    public SaveFileReader(BinaryReader reader)
    {
        _reader = reader;
    }

    internal MassEffect1SaveFile Read() =>
        new(new InternalMassEffect1SaveFile
        {
            SaveFormatVersion = _reader.ReadUInt32(),
            CharacterId = _reader.ReadUnrealString(),
            CareerCreatedAt = _reader.ReadSaveTimeStamp(),
            PlotData = _reader.ReadPlotTableSaveRecord(),
            Timestamp = _reader.ReadSaveTimeStamp(),
            SecondsPlayed = _reader.ReadInt32(),
            PlayerRecordData = _reader.ReadPlayerRecord(),
            BaseLevelName = _reader.ReadUnrealString(),
            MapName = _reader.ReadUnrealString(),
            ParentMapName = _reader.ReadUnrealString(),
            Location = _reader.ReadVector(),
            Rotation = _reader.ReadRotator(),
            HenchmenData = _reader.ReadArray(r => r.ReadHenchmanSaveRecord())
        });
}