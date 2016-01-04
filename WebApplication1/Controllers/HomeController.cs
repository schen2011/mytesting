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

        string powerurlconst = "https://xenrt.citrite.net:443/xenrt/api/v2/machine/{machinename}/power"; 
        string borrowmachineconst = "https://xenrt.citrite.net:443/xenrt/api/v2/machine/{machinename}/lease";

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
            ViewBag.MachineName = Id;

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

        public string GetData(string id)
        {
            string getmachineurl = "https://xenrt.citrite.net:443/xenrt/api/v2/machines";
            
            if(!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(getmachineurl);
                st.Append("?");
                st.Append("machine=");
                st.Append(id);
                getmachineurl = st.ToString();
            }

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

        public string GetPowerStatus(string id)
        {
            string getpowerstatus = "https://xenrt.citrite.net:443/xenrt/api/v2/machine/{machinename}/power";

            if (!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(getpowerstatus);
                st.Replace("{machinename}", id);
                getpowerstatus = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getpowerstatus);
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
            return null;
        }

        public void PowerOn(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(powerurlconst);
                st.Replace("{machinename}", id);
                powerurlconst = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(powerurlconst);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
                httpWebRequest.Method = "POST";
                httpWebRequest.Timeout = 20000;
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = new JavaScriptSerializer().Serialize(new
                    {
                        operation = "on"
                    });

                    streamWriter.Write(json);
                }

                using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
                {

                }
            }
        }


        public void BorrowMachine(string machineid, string reason, string duration)
        {
            if (!String.IsNullOrEmpty(machineid))
            {
                StringBuilder st = new StringBuilder(borrowmachineconst);
                st.Replace("{machinename}", machineid);
                borrowmachineconst = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(borrowmachineconst);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
                httpWebRequest.Method = "POST";
                httpWebRequest.Timeout = 20000;
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = new JavaScriptSerializer().Serialize(new
                    {
                        duration = Convert.ToInt32(duration),
                        reason = reason
                    });

                    streamWriter.Write(json);
                }

                using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
                {

                }
            }
        }

        public void ReturnMachine(string machineid)
        {
            if (!String.IsNullOrEmpty(machineid))
            {
                StringBuilder st = new StringBuilder(borrowmachineconst);
                st.Replace("{machinename}", machineid);
                borrowmachineconst = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(borrowmachineconst);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
                httpWebRequest.Method = "DELETE";
                httpWebRequest.Timeout = 20000;
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = new JavaScriptSerializer().Serialize(new
                    {
                        force = true
                    });

                    streamWriter.Write(json);
                }

                using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
                {

                }
            }
        }

        public void PowerOff(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(powerurlconst);
                st.Replace("{machinename}", id);
                powerurlconst = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(powerurlconst);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
                httpWebRequest.Method = "POST";
                httpWebRequest.Timeout = 20000;
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = new JavaScriptSerializer().Serialize(new
                    {
                        operation = "off"
                    });

                    streamWriter.Write(json);
                }

                using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
                {

                }
            }
        }


        public void PowerCycle(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(powerurlconst);
                st.Replace("{machinename}", id);
                powerurlconst = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(powerurlconst);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("X-Api-Key", "mx0hbgN97TSqTO/OxaAVuHtH+WpMoGbs5j71+g");
                httpWebRequest.Method = "POST";
                httpWebRequest.Timeout = 20000;
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = new JavaScriptSerializer().Serialize(new
                    {
                        operation = "reboot"
                    });

                    streamWriter.Write(json);
                }

                using (var response = (HttpWebResponse)httpWebRequest.GetResponse())
                {

                }
            }
        }

        public string GetJobHistroies(string id)
        {
            string getjobhistory = "https://xenrt.citrite.net:443/xenrt/api/v2/jobs?status=new%2Crunning%2Cdone%2Cremoved&machine={machinename}";

            if (!String.IsNullOrEmpty(id))
            {
                StringBuilder st = new StringBuilder(getjobhistory);
                st.Replace("{machinename}", id);
                getjobhistory = st.ToString();

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(getjobhistory);
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
            return null;
        }
    }
}