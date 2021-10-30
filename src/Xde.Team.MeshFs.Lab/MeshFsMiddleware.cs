using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

public class MeshFsMiddleware
    : IMiddleware
{
    private readonly ILogger<MeshFsMiddleware> _log;
    private readonly IOptions<MeshFsOptions> _options;

    public MeshFsMiddleware(
        ILogger<MeshFsMiddleware> log,
        IOptions<MeshFsOptions> options
    )
    {
        _log = log;
        _options = options;
    }

    async Task IMiddleware.InvokeAsync(HttpContext context, RequestDelegate next)
    {
        _log.LogDebug($"{nameof(MeshFsMiddleware)} called");

        await context.Response.WriteAsync($"MeshFS on {_options.Value.WebDavRoute}");
    }
}
