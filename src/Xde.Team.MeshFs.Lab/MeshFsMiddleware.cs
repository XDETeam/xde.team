using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

/// <summary>
/// TODO:
/// </summary>
/// <remarks>
/// .\rclone.exe lsd :webdav: --webdav-url=http://localhost:5000
/// .\rclone.exe ls :webdav: --webdav-url=http://localhost:5000
/// .\rclone.exe mount :webdav: --webdav-url=http://localhost:5000 --vfs-cache-mode=full e:\Mount\Mess
/// </remarks>
public class MeshFsMiddleware
    : IMiddleware
{
    private readonly IOptions<MeshFsOptions> _options;
    private readonly IEnumerable<IWebDavCommand> _commands;
    private readonly PathString _prefix;

    public MeshFsMiddleware(
        IOptions<MeshFsOptions> options,
        IEnumerable<IWebDavCommand> commands
    )
    {
        _options = options;
        _commands = commands;

        _prefix = new PathString(options.Value.WebDavRoute);
    }

    async Task IMiddleware.InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var request = context.Request;
        if (!request.Path.StartsWithSegments(_prefix))
        {
            await next(context);

            return;
        }

        var actualCommand = _commands
            .FirstOrDefault(command => command.Method == request.Method)
        ;

        if (actualCommand != null)
        {
            await actualCommand.Process(context);
        }
        else
        {
            await next(context);
        }
    }
}
