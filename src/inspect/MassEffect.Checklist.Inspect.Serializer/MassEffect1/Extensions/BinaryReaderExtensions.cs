using Ardalis.GuardClauses;
using MassEffect.Checklist.Inspect.Contracts.Common;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;
using MassEffect.Checklist.Inspect.Serializer.Extensions;

namespace MassEffect.Checklist.Inspect.Serializer.MassEffect1.Extensions;

public static class BinaryReaderExtensions
{
    internal static SaveChunkHeaderRecord ReadSaveChunkHeader(this BinaryReader reader, CancellationToken token = default)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        var header = new SaveChunkHeaderRecord
        {
            CompressedSize = reader.ReadUInt32(),
            DecompressedSize = reader.ReadUInt32()
        };

        // Guard against allocating a buffer that is larger than 4MiB, which is arbitrarily chosen as a reasonable limit
        if (header.DecompressedSize > 4 * 1024 * 1024)
            throw new InvalidOperationException("Specified decompressed size is too large");

        return header;
    }

    internal static PlotTableSaveRecord ReadPlotTableSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new PlotTableSaveRecord
        {
            BoolVariables = reader.ReadArray(r => r.ReadInt32() == 1),
            IntVariables = reader.ReadArray(r => r.ReadInt32()),
            FloatVariables = reader.ReadArray(r => r.ReadSingle()),
            QuestProgressCounter = reader.ReadInt32(),
            QuestProgress = reader.ReadArray(r => r.ReadPlotQuestSaveRecord()),
            QuestIds = reader.ReadArray(r => r.ReadInt32()),
            CodexEntries = reader.ReadArray(r => r.ReadPlotCodexSaveRecord()),
            CodexIds = reader.ReadArray(r => r.ReadInt32())
        };
    }

    internal static AppearanceSaveRecord ReadAppearanceSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        var record = new AppearanceSaveRecord { HasMorphHead = reader.ReadInt32() == 1 };
        if (record.HasMorphHead)
            record.MorphHead = new MorphHeadSaveRecord
            {
                HairMesh = reader.ReadUnrealString(),
                AccessoryMeshes = reader.ReadArray(r => r.ReadUnrealString()),
                MorphFeatures = reader.ReadArray(r => new MorphFeatureSaveRecord
                    { Feature = r.ReadUnrealString(), Offset = r.ReadSingle() }),
                OffsetBones = reader.ReadArray(r => new OffsetBoneSaveRecord
                    { Name = r.ReadUnrealString(), Offset = r.ReadVector() }),
                Lod0Vertices = reader.ReadArray(r => r.ReadVector()),
                Lod1Vertices = reader.ReadArray(r => r.ReadVector()),
                Lod2Vertices = reader.ReadArray(r => r.ReadVector()),
                Lod3Vertices = reader.ReadArray(r => r.ReadVector()),
                ScalarParameters = reader.ReadArray(r => new ScalarParameterSaveRecord
                    { Name = r.ReadUnrealString(), Value = r.ReadSingle() }),
                VectorParameters = reader.ReadArray(r => new VectorParameterSaveRecord
                    { Name = r.ReadUnrealString(), Value = r.ReadColor() }),
                TextureParameters = reader.ReadArray(r => new TextureParameterSaveRecord
                    { Name = r.ReadUnrealString(), Value = r.ReadUnrealString() })
            };
        return record;
    }

    internal static ComplexTalentSaveRecord ReadComplexTalentSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new ComplexTalentSaveRecord
        {
            TalentId = reader.ReadInt32(),
            CurrentRank = reader.ReadInt32(),
            MaxRank = reader.ReadInt32(),
            LevelOffset = reader.ReadInt32(),
            LevelsPerRank = reader.ReadInt32(),
            VisualOrder = reader.ReadInt32(),
            PreReqIds = reader.ReadArray(r => r.ReadInt32()),
            PreReqRanks = reader.ReadArray(r => r.ReadInt32())
        };
    }

    internal static ItemSaveRecord ReadItemSaveRecord(this BinaryReader reader, bool isMod = false)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new ItemSaveRecord
        {
            ItemId = reader.ReadInt32(),
            Sophistication = reader.ReadByte(),
            Manufacturer = reader.ReadInt32(),
            PlotConditionalId = reader.ReadInt32(),
            IsNewItem = reader.ReadInt32() == 1,
            IsJunkItem = reader.ReadInt32() == 1,
            ItemMods = isMod != true
                ? reader.ReadArray(r => r.ReadItemSaveRecord(isMod: true))
                : Array.Empty<ItemSaveRecord>()
        };
    }

    internal static PlayerRecord ReadPlayerRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new PlayerRecord
        {
            IsFemale = reader.ReadInt32() == 1,
            PlayerClassName = reader.ReadInt32(),
            PlayerClass = reader.ReadByte(),
            Level = reader.ReadInt32(),
            CurrentXp = reader.ReadSingle(),
            FirstName = reader.ReadUnrealString(),
            LastName = reader.ReadInt32(),
            Origin = reader.ReadByte(),
            Notoriety = reader.ReadByte(),
            SpecializationBonusId = reader.ReadInt32(),
            SpectreRank = reader.ReadByte(),
            TalentPoints = reader.ReadInt32(),
            TalentPoolPoints = reader.ReadInt32(),
            MappedTalent = reader.ReadUnrealString(),
            Appearance = reader.ReadAppearanceSaveRecord(),
            SimpleTalents = reader.ReadArray(r => new SimpleTalentSaveRecord
                { TalentId = r.ReadInt32(), CurrentRank = r.ReadInt32() }),
            ComplexTalents = reader.ReadArray(r => r.ReadComplexTalentSaveRecord()),
            Equipment = reader.ReadArray(r => r.ReadItemSaveRecord()),
            Weapons = reader.ReadArray(r => r.ReadItemSaveRecord()),
            Items = reader.ReadArray(r => r.ReadItemSaveRecord()),
            BuybackItems = reader.ReadArray(r => r.ReadItemSaveRecord()),
            Credits = reader.ReadInt32(),
            Medigel = reader.ReadInt32(),
            Grenades = reader.ReadSingle(),
            OmniGel = reader.ReadSingle(),
            FaceCode = reader.ReadUnrealString(),
            ArmorOverridden = reader.ReadInt32() == 1,
            AutoLevelUpTemplateId = reader.ReadInt32(),
            HealthPerLevel = reader.ReadSingle(),
            StabilityCurrent = reader.ReadSingle(),
            Race = reader.ReadByte(),
            ToxicCurrent = reader.ReadSingle(),
            Stamina = reader.ReadInt32(),
            Focus = reader.ReadInt32(),
            Precision = reader.ReadInt32(),
            Coordination = reader.ReadInt32(),
            AttributePrimary = reader.ReadByte(),
            AttributeSecondary = reader.ReadByte(),
            SkillCharm = reader.ReadSingle(),
            SkillIntimidate = reader.ReadSingle(),
            SkillHaggle = reader.ReadSingle(),
            HealthCurrent = reader.ReadSingle(),
            ShieldCurrent = reader.ReadSingle(),
            XpLevel = reader.ReadInt32(),
            IsDriving = reader.ReadInt32() == 1,
            GameOptions = reader.ReadArray(r => r.ReadInt32()), // maybe from here?
            IsHelmetShown = reader.ReadInt32() == 1,
            CurrentQuickSlot = reader.ReadByte(),
            LastQuickSlot = reader.ReadInt32(), // new
            LastPower = reader.ReadUnrealString(),
            HealthMax = reader.ReadSingle(),
            HotKeys = reader.ReadArray(r => r.ReadHotKeySaveRecord()),
            PrimaryWeapon = reader.ReadUnrealString(),
            SecondaryWeapon = reader.ReadUnrealString()
        };
    }

    internal static HenchmanSaveRecord ReadHenchmanSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new HenchmanSaveRecord
        {
            Tag = reader.ReadUnrealString(),
            SimpleTalents = reader.ReadArray(r => new SimpleTalentSaveRecord
                { TalentId = r.ReadInt32(), CurrentRank = r.ReadInt32() }),
            ComplexTalents = reader.ReadArray(r => r.ReadComplexTalentSaveRecord()),
            Equipment = reader.ReadArray(r => r.ReadItemSaveRecord()),
            Weapons = reader.ReadArray(r => r.ReadItemSaveRecord()),
            TalentPoints = reader.ReadInt32(),
            TalentPoolPoints = reader.ReadInt32(),
            AutoLevelUpTemplateId = reader.ReadInt32(),
            LastName = reader.ReadInt32(),
            ClassName = reader.ReadInt32(),
            ClassBase = reader.ReadByte(),
            HealthPerLevel = reader.ReadSingle(),
            StabilityCurrent = reader.ReadSingle(),
            Gender = reader.ReadByte(),
            Race = reader.ReadByte(),
            ToxicCurrent = reader.ReadSingle(),
            Stamina = reader.ReadInt32(),
            Focus = reader.ReadInt32(),
            Precision = reader.ReadInt32(),
            Coordination = reader.ReadInt32(),
            AttributePrimary = reader.ReadByte(),
            AttributeSecondary = reader.ReadByte(),
            HealthCurrent = reader.ReadSingle(),
            ShieldCurrent = reader.ReadSingle(),
            XpLevel = reader.ReadInt32(),
            IsHelmetShown = reader.ReadInt32() == 1,
            CurrentQuickSlot = reader.ReadByte(),
            HealthMax = reader.ReadSingle()
        };
    }
}