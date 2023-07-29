using Fluxor;
using MassEffect.Checklist.Contracts;
using MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist.Actions;
using Microsoft.Extensions.Logging;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace MassEffect.Checklist.Web.Store.ChecklistUseCase.GameChecklist;

public class Effects
{
    private readonly ILogger<Effects> _logger;
    private readonly HttpClient _httpClient;

    public Effects(ILogger<Effects> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    [EffectMethod]
    public async Task HandleFetchGameChecklistDataAction(FetchGameChecklistDataAction action, IDispatcher dispatcher)
    {
        try
        {
            var gameId = action.Game switch
            {
                Game.MassEffect1 => "mass-effect-1",
                Game.MassEffect2 => "mass-effect-2",
                Game.MassEffect3 => "mass-effect-3",
                _ => throw new ArgumentOutOfRangeException()
            };

            var checklistData =
                await _httpClient.GetStringAsync($"api/game-checklist/{gameId}.yml", action.CancellationToken);
            var yamlDeserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();

            var gameChecklist = yamlDeserializer.Deserialize<IEnumerable<ChecklistEntryModel>>(checklistData);
            dispatcher.Dispatch(new FetchGameChecklistDataResultAction(gameChecklist));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch game checklist data");
            dispatcher.Dispatch(new FetchGameChecklistDataFailureAction("Failed to fetch game checklist data"));
        }
    }
}