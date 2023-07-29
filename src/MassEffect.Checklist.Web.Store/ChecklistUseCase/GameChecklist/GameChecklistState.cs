using System.Collections.Immutable;
using Fluxor;

namespace MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist;

public record ChecklistEntryModel
{
    public int Id { get; init; }
    public string? Title { get; init; }
    public string? Section { get; init; }
    public string? Description { get; init; }
    public Uri? WikiUri { get; init; }

    public ChecklistTimelineModel? Timeline { get; init; }

    public bool IsHint { get; init; }
    public bool IsSectionPromoted { get; init; }
    public bool IsCompleted { get; init; }
    public DateTimeOffset? CompletedAt { get; init; }
}

public record ChecklistTimelineModel
{
    public int? BeforeId { get; init; }
    public string? BeforeNote { get; init; }
    public int? AfterId { get; init; }
    public string? AfterNote { get; init; }
}

[FeatureState]
public record GameChecklistState : StateBase
{
    public IImmutableList<ChecklistEntryModel> Entries { get; init; } = ImmutableList<ChecklistEntryModel>.Empty;
}