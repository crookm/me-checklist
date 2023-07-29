using System.Numerics;
using MassEffect.Checklist.Inspect.Contracts.Common;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1;

internal class InternalMassEffect1SaveFile
{
    internal uint SaveFormatVersion { get; init; }
    internal string CharacterId { get; init; } = string.Empty;
    internal SaveTimeStampRecord CareerCreatedAt { get; init; } = null!;

    internal PlotTableSaveRecord PlotData { get; init; } = null!;

    internal SaveTimeStampRecord Timestamp { get; init; } = null!;
    internal int SecondsPlayed { get; init; }

    internal PlayerRecord PlayerRecordData { get; init; } = null!;

    internal string BaseLevelName { get; init; } = string.Empty;
    internal string MapName { get; init; } = string.Empty;
    internal string ParentMapName { get; init; } = string.Empty;

    internal Vector3 Location { get; init; }
    internal RotatorRecord Rotation { get; init; } = null!;

    internal HenchmanSaveRecord[] HenchmenData { get; init; } = Array.Empty<HenchmanSaveRecord>();

    // Remainder of the data is not relevant to the checklist.
}