namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class ItemSaveRecord
{
    internal int ItemId { get; set; }
    internal byte Sophistication { get; set; }
    internal int Manufacturer { get; set; }
    internal int PlotConditionalId { get; set; }
    internal bool IsNewItem { get; set; }
    internal bool IsJunkItem { get; set; }
    internal ItemSaveRecord[] ItemMods { get; set; } = Array.Empty<ItemSaveRecord>();
}