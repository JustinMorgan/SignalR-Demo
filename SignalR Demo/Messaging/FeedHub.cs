using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using SignalR_Demo.Models;

namespace SignalR_Demo.Messaging
{
    public class FeedHub : Hub
    {
        public void Post(Post post)
        {
            Task.Factory.StartNew(() => { Clients.All.publish(post); });
            Task.Factory.StartNew(() => { _repo.Add(post); });
        }
    }
}