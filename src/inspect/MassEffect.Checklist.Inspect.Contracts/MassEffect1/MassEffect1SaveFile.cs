namespace MassEffect.Checklist.Inspect.Contracts.MassEffect1;

public class MassEffect1SaveFile : ISaveFile
{
    public Game Game => Game.MassEffect1;
    
    public string CharacterId => _saveData.CharacterId;
    public TimeSpan TimePlayed => TimeSpan.FromSeconds(_saveData.SecondsPlayed);
    public DateTime Timestamp => _saveData.Timestamp;
    public DateTime CareerCreatedAt => _saveData.CareerCreatedAt;
    
    public uint Version => _saveData.SaveFormatVersion;
    public string LevelName => !string.IsNullOrEmpty(_saveData.MapName) ? _saveData.MapName : _saveData.BaseLevelName;
    
    public IPlayer BasicPlayerData => _saveData.PlayerRecordData;
    
    private readonly InternalMassEffect1SaveFile _saveData;

    internal MassEffect1SaveFile(InternalMassEffect1SaveFile saveData)
    {
        _saveData = saveData;
    }
}