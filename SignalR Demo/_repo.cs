using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR_Demo.Models;

namespace SignalR_Demo
{
    /// <summary>
    /// Quick-and-dirty fake repository
    /// </summary>
    public static class _repo
    {
        private static List<Post> _posts;

        static _repo()
        {
            _posts = new List<Post>()
                {
                    new Post()
                    {
                        Body = "Lorem ipsum dolor sit amet, consectetur",
                        DateTime = DateTime.Now,
                        FeedName = "1",
                        Id = Guid.NewGuid()
                    },
                    new Post()
                    {
                        Body = "adipisicing elit, sed do eiusmod tempor incididunt ut labore",
                        DateTime = DateTime.Now.AddMinutes(-5),
                        FeedName = "2",
                        Id = Guid.NewGuid()
                    },
                    new Post()
                    {
                        Body = "et dolore magna aliqua. Ut enim ad minim veniam",
                        DateTime = DateTime.Now.AddMinutes(-10),
                        FeedName = "3",
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
            _posts.Insert(0, post);
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
}