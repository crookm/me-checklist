namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class ComplexTalentSaveRecord
{
    internal int TalentId { get; set; }
    internal int CurrentRank { get; set; }
    internal int MaxRank { get; set; }
    internal int LevelOffset { get; set; }
    internal int LevelsPerRank { get; set; }
    internal int VisualOrder { get; set; }
    internal int[] PreReqIds { get; set; } = Array.Empty<int>();
    internal int[] PreReqRanks { get; set; } = Array.Empty<int>();
}