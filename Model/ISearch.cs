using System.Threading.Tasks;

namespace Testtwo.Model
{
    public interface ISearch
    {
        Task SetConnectionId(string connectionId);
        Task Search(SearchQuery query);
        Task SearchResult(SearchResult result);
    }
}