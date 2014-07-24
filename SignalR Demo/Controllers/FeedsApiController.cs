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
    }
}
