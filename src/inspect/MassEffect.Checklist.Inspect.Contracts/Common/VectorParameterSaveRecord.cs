using System.Drawing;

namespace MassEffect.Checklist.Inspect.Contracts.Common;

internal class VectorParameterSaveRecord
{
    internal string Name { get; set; } = null!;
    internal Color Value { get; set; }
}