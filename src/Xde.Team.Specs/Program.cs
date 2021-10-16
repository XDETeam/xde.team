// TODO:Fill application properties (AssemblyVersion, AssemblyFileVersion,
// AssemblyInformationalVersion, Copyright, Description, etc). Share some
// of the between assemblies using some Xde.Meta package or Xde.Specs (if
// simply shared file is linked).
// TODO:Choose versioning model
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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

var host = builder.Build();

host.Run();
