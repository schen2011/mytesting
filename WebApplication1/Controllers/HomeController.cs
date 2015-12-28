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

            const string getmachineurl = "https://xenrt.citrite.net:443/xenrt/api/v2/machines";
            //StringBuilder ss = new StringBuilder(getmachineurl);
            //ss.Append("?user=stephench");
            //string url = ss.ToString();
            HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getmachineurl);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
            httpWebRequest.Method = "GET";
            httpWebRequest.Timeout = 20000;

            //HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    var obj = js.Deserialize<dynamic>(reader.ReadToEnd());
                    ViewData["machinelist"] = obj;
                }
            }
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

        public string GetData()
        {
            const string getmachineurl = "https://xenrt.citrite.net:443/xenrt/api/v2/machines";
            //StringBuilder ss = new StringBuilder(getmachineurl);
            //ss.Append("?user=stephench");
            //string url = ss.ToString();
            HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getmachineurl);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
            httpWebRequest.Method = "GET";
            httpWebRequest.Timeout = 20000;

            //HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
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






            //List<User> users = new List<User>
            //{
            //    new User {Name = "Hakeem", Phone = "076 4876 6579",
            //    CurrentBalance = 6026, UserType = "Administrator", UserCode = "AD-00001"},
            //    new User {Name = "Lucian", Phone = "055 9658 5713",
            //    CurrentBalance = 9741, UserType = "Branch",
            //    UserCode = "BR-00001", ParentCode = "AD-00001"},
            //    new User {Name = "Felix",  Phone = "076 2291 6071",
            //    CurrentBalance = 8852, UserType = "Distributor",
            //    UserCode = "DR-00001", ParentCode = "BR-00001"},
            //    new User {Name = "Aquila", Phone = "056 5580 0460",
            //    CurrentBalance = 9095, UserType = "Agent",
            //    UserCode = "AG-00001", ParentCode = "DR-00001"},
            //    new User {Name = "Tyrone", Phone = "0916 103 0684",
            //    CurrentBalance = 5822, UserType = "User",
            //    UserCode = "UR-00001", ParentCode = "AG-00001"},

            //    new User {Name = "Jasper", Phone = "0916 103 0684",
            //    CurrentBalance = 9935 , UserType = "Branch",
            //    UserCode = "BR-00002", ParentCode = "AD-00001"},
            //    new User {Name = "Erasmus", Phone = "0314 951 0576",
            //    CurrentBalance = 5636 , UserType = "Distributor",
            //    UserCode = "DR-00002", ParentCode = "BR-00002"},
            //    new User {Name = "Elton", Phone = "0887 799 4296",
            //    CurrentBalance = 6448 , UserType = "Distributor",
            //    UserCode = "DR-00003", ParentCode = "BR-00002"},
            //    new User {Name = "Colt", Phone = "07624 841017",
            //    CurrentBalance = 5425, UserType = "Agent",
            //    UserCode = "AG-00002", ParentCode = "DR-00003"},
            //    new User {Name = "Phillip", Phone = "070 7469 2182",
            //    CurrentBalance = 8344, UserType = "User",
            //    UserCode = "UR-00002", ParentCode = "AG-00001"},
            //    new User {Name = "Lucian", Phone = "055 9658 5713",
            //    CurrentBalance = 9741, UserType = "User",
            //    UserCode = "UR-00003", ParentCode = "AG-00001"},
            //    new User {Name = "Aron", Phone = "0800 722148",
            //    CurrentBalance = 5527, UserType = "User",
            //    UserCode = "UR-00004", ParentCode = "AG-00002"},
            //};

        }
    }
}