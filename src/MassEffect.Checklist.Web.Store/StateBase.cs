namespace MassEffect.Checklist.Web.Store;

public record StateBase
{
    public bool IsLoading { get; init; }
    public bool IsErrored { get; init; }
    public string? ErrorDetail { get; init; }
}