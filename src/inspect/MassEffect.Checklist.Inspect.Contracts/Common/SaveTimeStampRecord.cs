namespace MassEffect.Checklist.Inspect.Contracts.Common;

internal class SaveTimeStampRecord
{
    internal int SecondsSinceMidnight { get; set; }
    internal int Day { get; set; }
    internal int Month { get; set; }
    internal int Year { get; set; }

    public static implicit operator DateTime(SaveTimeStampRecord saveTimeStamp)
    {
        var hour = (int)Math.Floor(saveTimeStamp.SecondsSinceMidnight / 60.0 / 60.0);
        var minutes = (int)Math.Round(saveTimeStamp.SecondsSinceMidnight / 60.0) % 60;
        return new DateTime(saveTimeStamp.Year, saveTimeStamp.Month, saveTimeStamp.Day, hour, minutes, 0);
    }
}