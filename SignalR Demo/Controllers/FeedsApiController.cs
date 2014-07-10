using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SignalR_Demo.Models;

namespace SignalR_Demo.Controllers
{
    [RoutePrefix("api/feeds")]
    public class FeedsApiController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<Post> Get()
        {
            return new List<Post>()
            {
                new Post()
                {
                    Body = "Lorem ipsum dolor sit amet, consectetur",
                    DateTime = DateTime.Today,
                    FeedName = "test 1"
                },
                new Post()
                {
                    Body = "adipisicing elit, sed do eiusmod tempor incididunt ut labore",
                    DateTime = DateTime.Today.AddDays(-1),
                    FeedName = "test 2"
                },
                new Post()
                {
                    Body = "et dolore magna aliqua. Ut enim ad minim veniam",
                    DateTime = DateTime.Today.AddDays(-2),
                    FeedName = "test 3"
                },
            };
        }

        [HttpGet]
        [Route("{id}")]
        public Post Get(string id)
        {
            return new Post() { FeedName = id };
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]Feed feed)
        {
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Put([FromBody]Feed feed)
        {
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete()
        {
            return Ok();
        }
    }
}
