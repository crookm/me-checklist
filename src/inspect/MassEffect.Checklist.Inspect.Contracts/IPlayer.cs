namespace MassEffect.Checklist.Inspect.Contracts;

/// <summary>
/// Represents some basic information about the player, common to all games.
/// </summary>
public interface IPlayer
{
    /// <summary>
    /// The first name of the player, which is chosen at the start of the game.
    /// </summary>
    string FirstName { get; }

    /// <summary>
    /// A flag to indicate that the player is female
    /// </summary>
    /// <remarks>
    /// Apparently, BioWare thought this would be the edge case - Jennifer Hale femshep FTW
    /// </remarks>
    bool IsFemale { get; }
}