using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class User
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public decimal CurrentBalance { get; set; }
        public string UserType { get; set; }
        public string UserCode { get; set; }
        public string ParentCode { get; set; }
    }
}