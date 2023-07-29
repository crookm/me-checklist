using System.Collections.Immutable;
using Fluxor;
using MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist.Actions;

namespace MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist;

public static class Reducers
{
    [ReducerMethod]
    public static GameChecklistState ReduceFetchGameChecklistDataAction(GameChecklistState prevState, FetchGameChecklistDataAction action)
        => new() { IsLoading = true };
    
    [ReducerMethod]
    public static GameChecklistState ReduceFetchGameChecklistDataResultAction(GameChecklistState prevState, FetchGameChecklistDataResultAction action)
        => new() { Entries = action.Entries.ToImmutableList() };
    
    [ReducerMethod]
    public static GameChecklistState ReduceFetchGameChecklistDataFailureAction(GameChecklistState prevState, FetchGameChecklistDataFailureAction action)
        => new() { IsErrored = true, ErrorDetail = action.FailureReason };
}