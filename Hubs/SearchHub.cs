using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Testtwo.Model;

namespace Testtwo.Hubs
{
    public class SearchHub : Hub<ISearch>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Connect(int sessionId)
        {
            return Groups.Add(Context.ConnectionId, sessionId.ToString());
        }

        public Task Disconnect(int sessionId)
        {
            return Groups.Remove(Context.ConnectionId, sessionId.ToString());
        }
    }
}
