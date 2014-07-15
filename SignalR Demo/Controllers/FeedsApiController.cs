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
            return _repo.All();
        }

        [HttpGet]
        [Route("{id}")]
        public Post Get(Guid id)
        {
            return _repo.Get(id);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]Post post)
        {
            _repo.Add(post);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Put([FromBody]Post post)
        {
            _repo.Update(post);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete([FromBody]Post post)
        {
            _repo.Delete(post);
            return Ok();
        }

        #region Quick-and-dirty fake repository
        private static class _repo
        {
            private static List<Post> _posts;

            static _repo()
            {
                _posts = new List<Post>()
                {
                    new Post()
                    {
                        Body = "Lorem ipsum dolor sit amet, consectetur",
                        DateTime = DateTime.Today,
                        FeedName = "test 1",
                        Id = Guid.NewGuid()
                    },
                    new Post()
                    {
                        Body = "adipisicing elit, sed do eiusmod tempor incididunt ut labore",
                        DateTime = DateTime.Today.AddDays(-1),
                        FeedName = "test 2",
                        Id = Guid.NewGuid()
                    },
                    new Post()
                    {
                        Body = "et dolore magna aliqua. Ut enim ad minim veniam",
                        DateTime = DateTime.Today.AddDays(-2),
                        FeedName = "test 3",
                        Id = Guid.NewGuid()
                    },
                };
            }

            public static IEnumerable<Post> All()
            {
                return _posts;
            }

            public static Post Get(Guid id)
            {
                return _posts.FirstOrDefault(p => p.Id == id);
            }

            public static void Add(Post post)
            {
                _posts.Add(post);
            }

            public static void Delete(Post post)
            {
                _posts.Remove(Get(post.Id));
            }

            public static void Update(Post post)
            {
                Delete(post);
                Add(post);
            }
        }
        #endregion
    }
}
