using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Acme
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {

        /// <summary>
        /// The application settings
        /// </summary>
        private AppSettings appSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// </summary>
        /// <param name="options">The options.</param>
        public HomeController(IOptions<AppSettings> options)
        {
            this.appSettings = options.Value;
        }

        // GET: api/<controller>
        /// <summary>
        /// Gets this instance.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult( new { apiserver = appSettings.APIServer });
        }
    }
}
