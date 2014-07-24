using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SignalR_Demo.Models;

namespace SignalR_Demo.Controllers
{
    public class FeedsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}