// TODO:Fill application properties (AssemblyVersion, AssemblyFileVersion,
// AssemblyInformationalVersion, Copyright, Description, etc). Share some
// of the between assemblies using some Xde.Meta package or Xde.Specs (if
// simply shared file is linked).
// TODO:Choose versioning model
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Xde.Host;

// TODO:Does it make sense to avoid host creation and get service directly
// from IoC when we need a simple tool call, e.g. generate/convert/etc.
// So host will be create in case of "xts host ...args..." execution.

var builder = Host
    .CreateDefaultBuilder(args)
    .UseEnvironment(Environments.Development) //TODO:
    .ConfigureServices(services => services
        .AddHostedService<CliHostedService>()
    )
;

if (args is { Length: > 0 })
{
    builder = builder.ConfigureAppConfiguration(configuration
        => configuration.AddCommandLine(args)
    );
}

// TODO: Multiple web host do not work simultaneously
// TODO:Dashboard and any other webapp can be optional, so WebApplication.CreateBuilder
// looks not good
// TODO:Settings (like endpoints should be also configurable)
builder
    .ConfigureWebHostDefaults(dashboard => dashboard
        .UseUrls("https://localhost:4001")
        .Configure(application => application
            .UseRouting()
            .UseEndpoints(endpoints => endpoints
                .MapGet("/", () => "Team server dashboard")
            )
        )
    )

    .ConfigureWebHostDefaults(proxy => proxy
        .UseUrls("https://localhost:4002")
        .Configure(application => application
            .UseRouting()
            .UseEndpoints(endpoints => endpoints
                .MapGet("/", () => "Team server proxy service")
            )
        )
    )
;

var host = builder.Build();

host.Run();
