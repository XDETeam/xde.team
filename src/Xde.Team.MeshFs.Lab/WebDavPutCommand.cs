using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace Xde.Lab.MeshFs
{
    public class WebDavPutCommand
        : IWebDavCommand
    {
        private readonly MeshContext _db;

        public WebDavPutCommand(MeshContext db)
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

            var body = await new StreamReader(request.Body)
                .ReadToEndAsync()
            ;

            flow.Value = body;
            //TODO: await _db.SaveChangesAsync();
        }

        private static readonly Regex _rxId = new(
            @".*\[(\d+)\]\.xml$",
            RegexOptions.Compiled | RegexOptions.Singleline
        );

        public const string MethodName = "PUT";
    }
}
