using Fluxor.Blazor.Web.Components;

namespace MassEffect.Checklist.Web;

public class CancellableFluxorComponent : FluxorComponent
{
    private readonly CancellationTokenSource _cts = new();
    protected CancellationToken CancellationToken => _cts.Token;

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        if (!disposing) return;
        _cts.Cancel();
        _cts.Dispose();
    }
}