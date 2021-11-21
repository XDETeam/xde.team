﻿using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

/// <summary>
/// TODO:
/// </summary>
/// <remarks>
/// .\rclone.exe lsd :webdav: --webdav-url=http://localhost:5000
/// .\rclone.exe ls :webdav: --webdav-url=http://localhost:5000
/// .\rclone.exe mount :webdav: --webdav-url=http://localhost:5000 e:\Mount\Mess
/// </remarks>
public class MeshFsMiddleware
    : IMiddleware
{
    private readonly IEnumerable<IWebDavCommand> _commands;

    public MeshFsMiddleware(
        IEnumerable<IWebDavCommand> commands
    )
    {
        _commands = commands;
    }

    async Task IMiddleware.InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var actualCommand = _commands
            .FirstOrDefault(command => command.Method == context.Request.Method)
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
