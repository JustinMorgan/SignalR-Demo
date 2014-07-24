using Microsoft.Owin;
using Owin;
using SignalR_Demo.Messaging;

[assembly: OwinStartupAttribute(typeof(SignalR_Demo.Startup))]
namespace SignalR_Demo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR(); //bootstrap all hubs
            app.MapSignalR<BlocksConnection>("/blocksConnection"); //bootstrap BlocksConnection
        }
    }
}
