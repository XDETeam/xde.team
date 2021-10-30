using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Xde.Host
{
    //TODO:Not the best name, can be reconsidered later when usage will be clarified.
    public class CliHostedService
        : IHostedService
    {
        private readonly ILogger<CliHostedService> _log;
        private readonly IHostApplicationLifetime _lifetime;
        private readonly IHostEnvironment _env;
        private readonly IConfiguration _config;

        public CliHostedService(
            ILogger<CliHostedService> log,
            IHostApplicationLifetime lifetime,
            IHostEnvironment env,
            IConfiguration config
        )
        {
            _log = log;
            _lifetime = lifetime;
            _env = env;
            _config = config;
        }

        //TODO: hostingContext.HostingEnvironment.ApplicationName = AssemblyInformation.Current.Product;
        public record AssemblyInformation(string Product, string Description, string Version)
        {
            public static readonly AssemblyInformation Current = new(typeof(AssemblyInformation).Assembly);

            public AssemblyInformation(Assembly assembly)
                : this(
                    assembly.GetCustomAttribute<AssemblyProductAttribute>()!.Product,
                    assembly.GetCustomAttribute<AssemblyDescriptionAttribute>()!.Description,
                    assembly.GetCustomAttribute<AssemblyFileVersionAttribute>()!.Version)
            {

            }
        }

        private void OnApplicationStarted()
        {
            var appName = typeof(Xde.Team.Specs.NamespaceDoc).Assembly.GetName();
            _log.LogInformation($"{_env.ApplicationName} {appName.Version}");

            //TODO:How to prefix CLI args or implement another way to distinguish from
            //other settings. Maybe implement specific IDictionary for AddCommandLine
            //if (_env.IsDevelopment())
            //{
            //    _config
            //        .AsEnumerable()
            //        .ToList()
            //        .ForEach(setting => _log.LogInformation($"{setting.Key} = {setting.Value}"))
            //    ;
            //}
        }

        Task IHostedService.StartAsync(CancellationToken cancellationToken)
        {
            _lifetime
                .ApplicationStarted
                .Register(OnApplicationStarted)
            ;

            return Task.CompletedTask;
        }

        Task IHostedService.StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
