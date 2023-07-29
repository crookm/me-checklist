using MassEffect.Checklist.Inspect.Contracts.Common;

namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class PlotTableSaveRecord
{
    internal bool[] BoolVariables { get; set; } = Array.Empty<bool>();
    internal int[] IntVariables { get; set; } = Array.Empty<int>();
    internal float[] FloatVariables { get; set; } = Array.Empty<float>();
    internal int QuestProgressCounter { get; set; }
    internal PlotQuestSaveRecord[] QuestProgress { get; set; } = Array.Empty<PlotQuestSaveRecord>();
    internal int[] QuestIds { get; set; } = Array.Empty<int>();
    internal PlotCodexSaveRecord[] CodexEntries { get; set; } = Array.Empty<PlotCodexSaveRecord>();
    internal int[] CodexIds { get; set; } = Array.Empty<int>();
}