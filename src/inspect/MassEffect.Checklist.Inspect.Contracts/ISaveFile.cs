using MassEffect.Checklist.Contracts;

namespace MassEffect.Checklist.Inspect.Contracts;

/// <summary>
/// Represents a save file for one of the Mass Effect games.
/// </summary>
public interface ISaveFile
{
    /// <summary>
    /// The game this save file is for.
    /// </summary>
    Game Game { get; }

    /// <summary>
    /// The amount of time played.
    /// </summary>
    TimeSpan TimePlayed { get; }

    /// <summary>
    /// The time the save file was created.
    /// </summary>
    DateTime Timestamp { get; }

    /// <summary>
    /// The version of the save file.
    /// </summary>
    uint Version { get; }

    /// <summary>
    /// The name of the level the player is currently on.
    /// </summary>
    string LevelName { get; }

    /// <summary>
    /// Basic player information.
    /// </summary>
    IPlayer BasicPlayerData { get; }
}