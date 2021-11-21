using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace Xde.Lab.MeshFs
{
    public class WebDavGetCommand
        : IWebDavCommand
    {
        private readonly MeshContext _db;

        public WebDavGetCommand(MeshContext db)
        {
            _db = db;
        }

        string IWebDavCommand.Method => MethodName;

        /// TODO: Responses
        async Task IWebDavCommand.Process(HttpContext context)
        {
            var request = context.Request;
            var response = context.Response;

            if (request?.Path.Value == null)
            {
                context.Response.StatusCode = 500;
                await response.WriteAsync("Path is missing");

                return;
            }

            var match = _rxId.Match(request.Path.Value);
            if (!match.Success)
            {
                context.Response.StatusCode = 500;
                await response.WriteAsync("Id not found or incorrect");

                return;
            }

            var id = long.Parse(match.Groups[1].Value);
            var flow = _db
                .Flow
                .FirstOrDefault(item => item.Id == id)
            ;

            if (flow == null)
            {
                context.Response.StatusCode = 404;
                await response.WriteAsync($"Flow [{id}] not found");

                return;
            }

            await response.WriteAsync(flow.Value ?? "");
        }

        private static readonly Regex _rxId = new(
            @".*\[(\d+)\]\.xml$",
            RegexOptions.Compiled | RegexOptions.Singleline
        );

        public const string MethodName = "GET";
    }
}
