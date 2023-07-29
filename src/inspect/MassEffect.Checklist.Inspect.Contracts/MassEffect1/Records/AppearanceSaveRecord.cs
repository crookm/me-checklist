using MassEffect.Checklist.Inspect.Contracts.Common;

namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class AppearanceSaveRecord
{
    internal bool HasMorphHead { get; set; }
    internal MorphHeadSaveRecord MorphHead { get; set; } = null!;
}