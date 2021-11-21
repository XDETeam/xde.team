using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Xde.Lab.MeshFs;

/// <summary>
/// TODO:
/// </summary>
/// <remarks>
/// - .\rclone.exe lsd :webdav: --webdav-url=http://localhost:5000
/// - .\rclone.exe ls :webdav: --webdav-url=http://localhost:5000
/// </remarks>
public class MeshFsMiddleware
    : IMiddleware
{
    private readonly ILogger<MeshFsMiddleware> _log;
    private readonly IOptions<MeshFsOptions> _options;
    private readonly MeshContext _db;

    public MeshFsMiddleware(
        ILogger<MeshFsMiddleware> log,
        IOptions<MeshFsOptions> options,
		MeshContext db
    )
    {
        _log = log;
        _options = options;
		_db = db;
    }

    async Task IMiddleware.InvokeAsync(HttpContext context, RequestDelegate next)
    {
		var request = context.Request;
		request.Headers.TryGetValue("Depth", out var depth);

		var response = context.Response;
		response.StatusCode = 200;
		response.ContentType = "text/xml; charset=\"utf-8\"";

		var ns = WebDavDataExtensions.Ns;

		//var xml = new XDocument(
		//	new XDeclaration(version: "1.0", encoding: "utf-8", standalone: "no"),
		//	new XElement(ns.GetName("propfind"))
		//);

		var xml = new XDocument(
			new XDeclaration(version: "1.0", encoding: "utf-8", standalone: "no"),
			new XElement(
				ns.GetName("multistatus"),

				_db
					.Flow
					.Select(flow => flow.ToWebDavFile())
			)
		); ;

		await response.WriteAsync(xml.ToString());
    }
}
