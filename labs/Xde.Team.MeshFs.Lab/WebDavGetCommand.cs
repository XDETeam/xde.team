using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

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

            var id = request.GetFlowId();
            if (id == null)
            {
                context.Response.StatusCode = 400;
                await response.WriteAsync("Flow id not found or incorrect");

                return;
            }

            var flow = await _db
                .Flow
                .FirstOrDefaultAsync(item => item.Id == id)
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
