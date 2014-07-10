using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalR_Demo.Models;

namespace SignalR_Demo.Hubs
{
    public class FeedHub : Hub
    {
        public void Post(Post post)
        {
            Task.Factory.StartNew(() => { Clients.All.publish(post); });
        }
    }
}