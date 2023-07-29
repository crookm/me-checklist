namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1.Records;

internal class HenchmanSaveRecord
{
    internal string Tag { get; set; } = null!;
    internal SimpleTalentSaveRecord[] SimpleTalents { get; set; } = Array.Empty<SimpleTalentSaveRecord>();
    internal ComplexTalentSaveRecord[] ComplexTalents { get; set; } = Array.Empty<ComplexTalentSaveRecord>();
    internal ItemSaveRecord[] Equipment { get; set; } = Array.Empty<ItemSaveRecord>();
    internal ItemSaveRecord[] Weapons { get; set; } = Array.Empty<ItemSaveRecord>();
    internal int TalentPoints { get; set; }
    internal int TalentPoolPoints { get; set; }
    internal int AutoLevelUpTemplateId { get; set; }
    internal int LastName { get; set; }
    internal int ClassName { get; set; }
    internal byte ClassBase { get; set; }
    internal float HealthPerLevel { get; set; }
    internal float StabilityCurrent { get; set; }
    internal byte Gender { get; set; }
    internal byte Race { get; set; }
    internal float ToxicCurrent { get; set; }
    internal int Stamina { get; set; }
    internal int Focus { get; set; }
    internal int Precision { get; set; }
    internal int Coordination { get; set; }
    internal byte AttributePrimary { get; set; }
    internal byte AttributeSecondary { get; set; }
    internal float HealthCurrent { get; set; }
    internal float ShieldCurrent { get; set; }
    internal int XpLevel { get; set; }
    internal bool IsHelmetShown { get; set; }
    internal byte CurrentQuickSlot { get; set; }
    internal float HealthMax { get; set; }
}