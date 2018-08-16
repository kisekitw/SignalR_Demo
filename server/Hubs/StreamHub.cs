using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace server.Hubs
{
    public class StreamHub : Hub
    {
        public async Task GetStream(string ip, string port) {
            await Clients.All.SendAsync("ReceiveStream", ip, port);
        }
        
    }
}