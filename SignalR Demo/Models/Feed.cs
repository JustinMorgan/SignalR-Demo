using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR_Demo.Models
{
    public class Feed
    {
        public string Name { get; set; }
        public IEnumerable<Post> Posts { get; set; } 
    }
}