using MassEffect.Checklist.Contracts;

namespace MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist.Actions;

public record FetchGameChecklistDataAction(Game Game)
{
    public CancellationToken CancellationToken { get; init; }
}

public record FetchGameChecklistDataResultAction(IEnumerable<ChecklistEntryModel> Entries);

public record FetchGameChecklistDataFailureAction(string FailureReason);