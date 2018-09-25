using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Acme.API;
using Acme.API.Repositories;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Acme.API
{
    public class Startup
    {

        /// <summary>
        /// Gets container reference
        /// </summary>
        public IContainer ApplicationContainer { get; private set; }

        /// <summary>
        /// Gets configuration reference
        /// </summary>
        public IConfigurationRoot Configuration { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors();
            services.Configure<DbConnectionFactoryOptions>(this.Configuration);
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            var builder = new ContainerBuilder();
            // register the autoFacModules found in loaded runtime assemblies
            builder.RegisterAssemblyModules(DependencyContext.Default.RuntimeLibraries.SelectMany(lib => lib.GetDefaultAssemblyNames(DependencyContext.Default).Select(Assembly.Load)).ToArray());
            builder.Populate(services);
            this.ApplicationContainer = builder.Build();
            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(this.ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            string apiServer = Configuration.GetSection("AppSettings").GetValue<string>("APIServer");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.EnsureDatabaseIsSeeded(app.ApplicationServices.GetService<IOptions<AppSettings>>());
            }
            app.UseCors(builder =>
                            builder.WithOrigins(apiServer, "https://dc.services.visualstudio.com"));
            app.UseMvc();
        }
    }
}
