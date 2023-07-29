using Microsoft.AspNetCore.Components;

namespace MassEffect.Checklist.Web;

public class CancellableComponent : ComponentBase, IDisposable
{
    private readonly CancellationTokenSource _cts = new();
    protected CancellationToken CancellationToken => _cts.Token;

    public void Dispose()
    {
        _cts.Cancel();
        _cts.Dispose();
    }
}