using BundleTransformer.Core.Bundles;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;
using System.Web;
using System.Web.Optimization;

namespace SignalR_Demo
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.UseCdn = true;

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/bootstrap/bootstrap.less")
                .Include("~/Content/angular-csp.css")
                .Include("~/Content/Site.less"));

            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/bundles/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval")
                .Include("~/Scripts/bundles/jquery/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/signalr")
                .Include("~/Scripts/bundles/jquery/jquery.signalR-{version}.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/bundles/modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include("~/Scripts/bundles/bootstrap/bootstrap.js")
                .Include("~/Scripts/bundles/respond/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/bundles/angular/angular.js")
                .Include("~/Scripts/bundles/angular/*.js"));

            bundles.Add(new ScriptBundle("~/apps/feeds")
                .Include("~/Scripts/apps/feeds/*.js"));
        }
    }
}
