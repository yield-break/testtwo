using Google.Apis.Customsearch.v1.Data;
using GoogleSearch.Lib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Testtwo.Hubs;
using Testtwo.Model;

namespace Testtwo.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : ApiHubController<SearchHub>
    {
        private readonly Searcher _searcher;
        private readonly ISearchConfigProvider _searchConfig;

        public SearchController(IConnectionManager signalRConnectionManager) : base(signalRConnectionManager)
        {
            // TODO: Dependency injection.
            _searcher = new Searcher();
            _searchConfig = new SearchConfig();
        }

        //[HttpGet("[action]")]
        [HttpPost]
        public async void Search([FromBody] SearchQuery query)
        {
            var search = _searcher.Execute(_searchConfig, query.Query);
            var result = ToSearchResult(query, search);

            await Clients.Group(result.SessionId.ToString())
                         .SearchResult(result);
        }

        private static SearchResult ToSearchResult(SearchQuery query, Search search)
        {
            return new SearchResult
            {
                SessionId = query.SessionId,
                NumberOfResults = search?.SearchInformation?.TotalResults ?? 0,
            };
        }

    }

    // TODO: Drive from config.
    public class SearchConfig : ISearchConfigProvider
    {
        public string ApiKey => "AIzaSyCxD1ksgLLVRfupPfBoiNgyo5blJjA7YV4";
        public string SearchEngineId => "011080823379728481381:yjr7014qghk";
    }
}
