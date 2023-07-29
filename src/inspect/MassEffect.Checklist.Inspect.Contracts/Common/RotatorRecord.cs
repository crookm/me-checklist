namespace MassEffect.Checklist.Inspect.Contracts.Common;

/// <summary>
/// Represents a 3D vector's rotation.
/// </summary>
// TODO: can this be a Quaternion instead?
internal class RotatorRecord
{
    internal int Pitch { get; set; }
    internal int Yaw { get; set; }
    internal int Roll { get; set; }
}