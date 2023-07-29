namespace MassEffect.Checklist.Inspect.Contracts.Common;

internal class PlotQuestSaveRecord
{
    internal int QuestCounter { get; set; }
    internal bool QuestUpdated { get; set; }
    internal int[] History { get; set; } = Array.Empty<int>();
}