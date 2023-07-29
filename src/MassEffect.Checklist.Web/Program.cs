using Fluxor;
using MassEffect.Checklist.Inspect.Contracts.MassEffect1;
using MassEffect.Checklist.Inspect.Serializer;
using MassEffect.Checklist.Inspect.Serializer.MassEffect1;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MassEffect.Checklist.Web;
using MassEffect.Checklist.Web.Store;
using MudBlazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddMudServices();
builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddFluxor(options =>
{
    options.ScanAssemblies(typeof(Program).Assembly, typeof(StateBase).Assembly);
});

builder.Services.AddSingleton<ISaveFileSerializer<MassEffect1SaveFile>, SaveFileSerializer>();

await builder.Build().RunAsync();