using System.Numerics;

namespace MassEffect.Checklist.Inspect.Contracts.Common;

internal class OffsetBoneSaveRecord
{
    internal string Name { get; set; } = null!;
    internal Vector3 Offset { get; set; }
}