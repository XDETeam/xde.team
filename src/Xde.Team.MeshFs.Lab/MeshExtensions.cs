using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

public static class MeshExtensions
{
    public static IServiceCollection AddMesh(this IServiceCollection services) => services
        .AddSingleton<IConfigureOptions<MeshFsOptions>, MeshFsOptions.Setup>()
        .AddTransient<MeshFsMiddleware>()
        .AddTransient<IWebDavCommand, WebDavPropFindCommand>()
        .AddTransient<IWebDavCommand, WebDavGetCommand>()
        .AddTransient<IWebDavCommand, WebDavPutCommand>()
    ;

    public static IApplicationBuilder UseMesh(this IApplicationBuilder application)
        => application.UseMiddleware<MeshFsMiddleware>()
    ;
}
