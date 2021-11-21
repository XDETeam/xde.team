using System.Xml.Linq;
using Microsoft.AspNetCore.Http;

namespace Xde.Lab.MeshFs
{
    public class WebDavPropFindCommand
        : IWebDavCommand
    {
        private readonly MeshContext _db;

        public WebDavPropFindCommand(MeshContext db)
        {
            _db = db;
        }

        string IWebDavCommand.Method { get => MethodName; }

        async Task IWebDavCommand.Process(HttpContext context)
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
			);

			await response.WriteAsync(xml.ToString());
		}

		public const string MethodName = "PROPFIND";
    }
}
