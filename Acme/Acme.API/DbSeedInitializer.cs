﻿using Acme.API.Interfaces;
using Acme.API.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Acme.API
{
    public static class DbSeedInitializer
    {
        /// <summary>
        /// Ensures the database is seeded.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns></returns>
        public static int EnsureDatabaseIsSeeded(this IApplicationBuilder builder, IOptions<AppSettings> options)
        {
            IDbConnectionFactory connectionFactory = builder.ApplicationServices.GetService(typeof(IDbConnectionFactory)) as IDbConnectionFactory;
            var context = new Repositories.AcmeContext(connectionFactory);
            context.Database.EnsureCreated();
            return context.EnsureSeedData(options.Value.RedisConnectionString);
        }
    }
}
