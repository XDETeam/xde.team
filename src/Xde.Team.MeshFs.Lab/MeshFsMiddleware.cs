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
/// </remarks>
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
		var request = context.Request;
		request.Headers.TryGetValue("Depth", out var depth);

		var response = context.Response;
		response.StatusCode = 200;
		response.ContentType = "application/xml; charset=\"utf-8\"";

		var ns = XNamespace.Get("DAV:");

		//var xml = new XDocument(
		//	new XDeclaration(version: "1.0", encoding: "utf-8", standalone: "no"),
		//	new XElement(ns.GetName("propfind"))
		//);

		var xml = new XDocument(
			new XDeclaration(version: "1.0", encoding: "utf-8", standalone: "no"),
			new XElement(
				ns.GetName("multistatus"),
				new XElement(
					ns.GetName("response"),
					new XElement(
						ns.GetName("href"),
						//"http://localhost:5000/test1.html"
						"/folder1/"
					),
					new XElement(
						ns.GetName("propstat"),
						new XElement(
							ns.GetName("prop"),
							new XElement(
								ns.GetName("displayname"),
								"Example collection"
							),
							new XElement(
								ns.GetName("resourcetype"),
								new XElement(ns.GetName("collection"))
							),
							new XElement(
								ns.GetName("creationdate"),
								"1997-12-01T17:42:21-08:00"
							),
							new XElement(
								ns.GetName("getcontentlength"),
								4568
							),
							new XElement(
								ns.GetName("getcontenttype"),
								"text/html"
							),
							new XElement(
								ns.GetName("getetag"),
								"tag1,tag2"
							),
							new XElement(
								ns.GetName("getlastmodified"),
								"Mon, 12 Jan 1998 09:25:56 GMT"
							)
						)
					),
					new XElement(
						ns.GetName("status"),
						"HTTP/1.1 200 OK"
					)
				),

				new XElement(
					ns.GetName("response"),
					new XElement(
						ns.GetName("href"),
						"/file1.txt"
					),
					new XElement(
						ns.GetName("propstat"),
						new XElement(
							ns.GetName("prop"),
							new XElement(
								ns.GetName("displayname"),
								"Example file"
							),
							new XElement(
								ns.GetName("resourcetype")
							//new XElement(ns.GetName("collection"))
							),
							new XElement(
								ns.GetName("creationdate"),
								"1997-12-01T17:42:21-08:00"
							),
							new XElement(
								ns.GetName("getcontentlength"),
								4568
							),
							new XElement(
								ns.GetName("getcontenttype"),
								"text/html"
							),
							new XElement(
								ns.GetName("getetag"),
								"tag1,tag2"
							),
							new XElement(
								ns.GetName("getlastmodified"),
								"Mon, 12 Jan 1998 09:25:56 GMT"
							)
						)
					),
					new XElement(
						ns.GetName("status"),
						"HTTP/1.1 200 OK"
					)
				)
			)
		); ;

		await response.WriteAsync(xml.ToString());
    }
}
