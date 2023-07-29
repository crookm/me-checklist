using MassEffect.Checklist.Inspect.Contracts.Common;

namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class PlayerRecord : IPlayer
{
    public bool IsFemale { get; set; }
    internal int PlayerClassName { get; set; }
    internal byte PlayerClass { get; set; }
    internal int Level { get; set; }
    internal float CurrentXp { get; set; }
    public string FirstName { get; set; } = null!;
    internal int LastName { get; set; }
    internal byte Origin { get; set; }
    internal byte Notoriety { get; set; }
    internal int SpecializationBonusId { get; set; }
    internal byte SpectreRank { get; set; }
    internal int TalentPoints { get; set; }
    internal int TalentPoolPoints { get; set; }
    internal string MappedTalent { get; set; } = null!;
    internal AppearanceSaveRecord Appearance { get; set; } = null!;
    internal SimpleTalentSaveRecord[] SimpleTalents { get; set; } = Array.Empty<SimpleTalentSaveRecord>();
    internal ComplexTalentSaveRecord[] ComplexTalents { get; set; } = Array.Empty<ComplexTalentSaveRecord>();
    internal ItemSaveRecord[] Equipment { get; set; } = Array.Empty<ItemSaveRecord>();
    internal ItemSaveRecord[] Weapons { get; set; } = Array.Empty<ItemSaveRecord>();
    internal ItemSaveRecord[] Items { get; set; } = Array.Empty<ItemSaveRecord>();
    internal ItemSaveRecord[] BuybackItems { get; set; } = Array.Empty<ItemSaveRecord>();
    internal int Credits { get; set; }
    internal int Medigel { get; set; }
    internal float Grenades { get; set; }
    internal float OmniGel { get; set; }
    internal string FaceCode { get; set; } = null!;
    internal bool ArmorOverridden { get; set; }
    internal int AutoLevelUpTemplateId { get; set; }
    internal float HealthPerLevel { get; set; }
    internal float StabilityCurrent { get; set; }
    internal byte Race { get; set; }
    internal float ToxicCurrent { get; set; }
    internal int Stamina { get; set; }
    internal int Focus { get; set; }
    internal int Precision { get; set; }
    internal int Coordination { get; set; }
    internal byte AttributePrimary { get; set; }
    internal byte AttributeSecondary { get; set; }
    internal float SkillCharm { get; set; }
    internal float SkillIntimidate { get; set; }
    internal float SkillHaggle { get; set; }
    internal float HealthCurrent { get; set; }
    internal float ShieldCurrent { get; set; }
    internal int XpLevel { get; set; }
    internal bool IsDriving { get; set; }
    internal int[] GameOptions { get; set; } = Array.Empty<int>();
    internal bool IsHelmetShown { get; set; }
    internal byte CurrentQuickSlot { get; set; }
    internal int LastQuickSlot { get; set; }
    internal string LastPower { get; set; } = null!;
    internal float HealthMax { get; set; }
    internal HotKeySaveRecord[] HotKeys { get; set; } = Array.Empty<HotKeySaveRecord>();
    internal string PrimaryWeapon { get; set; } = null!;
    internal string SecondaryWeapon { get; set; } = null!;
}