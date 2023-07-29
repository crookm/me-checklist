using System.Numerics;

namespace MassEffect.Checklist.Inspect.Contracts.Common;

internal class MorphHeadSaveRecord
{
    internal string HairMesh { get; set; } = null!;
    internal string[] AccessoryMeshes { get; set; } = Array.Empty<string>();
    internal MorphFeatureSaveRecord[] MorphFeatures { get; set; } = Array.Empty<MorphFeatureSaveRecord>();
    internal OffsetBoneSaveRecord[] OffsetBones { get; set; } = Array.Empty<OffsetBoneSaveRecord>();
    internal Vector3[] Lod0Vertices { get; set; } = Array.Empty<Vector3>();
    internal Vector3[] Lod1Vertices { get; set; } = Array.Empty<Vector3>();
    internal Vector3[] Lod2Vertices { get; set; } = Array.Empty<Vector3>();
    internal Vector3[] Lod3Vertices { get; set; } = Array.Empty<Vector3>();

    internal ScalarParameterSaveRecord[] ScalarParameters { get; set; } =
        Array.Empty<ScalarParameterSaveRecord>();

    internal VectorParameterSaveRecord[] VectorParameters { get; set; } =
        Array.Empty<VectorParameterSaveRecord>();

    internal TextureParameterSaveRecord[] TextureParameters { get; set; } =
        Array.Empty<TextureParameterSaveRecord>();
}