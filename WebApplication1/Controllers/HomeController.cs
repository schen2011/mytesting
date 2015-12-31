using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            /*
             * https://xenrt.citrite.net:443/xenrt/api/v2/machines?user=stephench&limit=10
            */

            //const string getmachineurl = "https://xenrt.citrite.net:443/xenrt/api/v2/machines";
            ////StringBuilder ss = new StringBuilder(getmachineurl);
            ////ss.Append("?user=stephench");
            ////string url = ss.ToString();
            //HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getmachineurl);
            //httpWebRequest.ContentType = "application/json";
            //httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
            //httpWebRequest.Method = "GET";
            //httpWebRequest.Timeout = 20000;

            ////HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            //using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
            //{
            //    using (var reader = new StreamReader(response.GetResponseStream()))
            //    {
            //        JavaScriptSerializer js = new JavaScriptSerializer();
            //        var obj = js.Deserialize<dynamic>(reader.ReadToEnd());
            //        ViewData["machinelist"] = obj;
            //    }
            //}
            return View();
        }

        public ActionResult MachineDetail(string Id)
        {
            return View("About");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult NewProduct()
        {
            return View();
        }

        public ActionResult Test1()
        {
            return View();
        }

        public ActionResult Test2()
        {
            return View();
        }

        public string GetData()
        {
            const string getmachineurl = "https://xenrt.citrite.net:443/xenrt/api/v2/machines";
            HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getmachineurl);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
            httpWebRequest.Method = "GET";
            httpWebRequest.Timeout = 20000;
            using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    var obj = js.Deserialize<dynamic>(reader.ReadToEnd());
                    string data = JsonConvert.SerializeObject(obj);
                    return data;
                }
            }
        }
    }
}