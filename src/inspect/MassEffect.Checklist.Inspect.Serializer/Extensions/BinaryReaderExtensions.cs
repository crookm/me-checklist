using System.Drawing;
using System.Numerics;
using System.Text;
using Ardalis.GuardClauses;
using MassEffect.Checklist.Inspect.Contracts.Common;

namespace MassEffect.Checklist.Inspect.Serializer.Extensions;

internal static class BinaryReaderExtensions
{
    internal static Vector3 ReadVector(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);
        return new Vector3(reader.ReadSingle(), reader.ReadSingle(), reader.ReadSingle());
    }

    internal static RotatorRecord ReadRotator(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new RotatorRecord
        {
            Pitch = reader.ReadInt32(),
            Yaw = reader.ReadInt32(),
            Roll = reader.ReadInt32()
        };
    }

    internal static Color ReadColor(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        var r = (int)reader.ReadSingle();
        var g = (int)reader.ReadSingle();
        var b = (int)reader.ReadSingle();
        var a = (int)reader.ReadSingle();
        return Color.FromArgb(a, r, g, b);
    }

    internal static SaveTimeStampRecord ReadSaveTimeStamp(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        var timeStamp = new SaveTimeStampRecord
        {
            SecondsSinceMidnight = reader.ReadInt32(),
            Day = reader.ReadInt32(),
            Month = reader.ReadInt32(),
            Year = reader.ReadInt32()
        };

        return timeStamp;
    }

    internal static PlotQuestSaveRecord ReadPlotQuestSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new PlotQuestSaveRecord
        {
            QuestCounter = reader.ReadInt32(),
            QuestUpdated = reader.ReadInt32() == 1,
            History = reader.ReadArray(r => r.ReadInt32())
        };
    }

    internal static PlotCodexSaveRecord ReadPlotCodexSaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new PlotCodexSaveRecord
        {
            Pages = reader.ReadArray(r => new PlotCodexPageSaveRecord
            {
                Page = r.ReadInt32(),
                IsNew = r.ReadInt32() == 1
            })
        };
    }

    internal static HotKeySaveRecord ReadHotKeySaveRecord(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        return new HotKeySaveRecord
        {
            HotKeyPawn = reader.ReadInt32(),
            HotKeyEvent = reader.ReadInt32()
        };
    }

    internal static TArr[] ReadArray<TArr>(this BinaryReader reader, Func<BinaryReader, TArr> readFunc)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);
        Guard.Against.Null(readFunc);

        var count = reader.ReadInt32();
        if (count >= 0x7FFFFF) // Arbitrary limit for sanity
            throw new InvalidOperationException("Requested array size is too large");

        var array = new TArr[count];
        for (uint i = 0; i < count; i++)
            array[i] = readFunc(reader);

        return array;
    }

    internal static string ReadUnrealString(this BinaryReader reader)
    {
        Guard.Against.Null(reader);
        Guard.Against.Zero(reader.BaseStream.Length);

        var length = reader.ReadInt32();
        return (length switch
        {
            0 => string.Empty,
            < 0 => Encoding.Unicode.GetString(reader.ReadBytes(length * -2)),
            _ => Encoding.ASCII.GetString(reader.ReadBytes(length))
        }).TrimEnd('\0');
    }
}