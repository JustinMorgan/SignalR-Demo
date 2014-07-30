using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using Microsoft.AspNet.SignalR;

namespace SignalR_Demo.Messaging
{
    public class BlocksConnection : PersistentConnection
    {
        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            var values = Json.Decode(data);
            switch (values.method as string)
            {
                case "drag":
                    return Connection.Broadcast(new {
                        method = "move",
                        values.top,
                        values.left,
                        values.sender
                    });
                default:
                    throw new NotImplementedException();
            }
        }
    }
    public class BlocksHub : Hub
    {
        public void Drag(Guid sender, int top, int left)
        {
            Clients.All.move(top, left, sender);
        }
    }
}