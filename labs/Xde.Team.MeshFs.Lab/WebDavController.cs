using Microsoft.AspNetCore.Mvc;

namespace Xde.Lab.MeshFs
{
    public class WebDavController
        : ControllerBase
    {
        [WebDavPropfind]
        public async Task<ActionResult<string>> List(string path)
        {
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<string>> Index(string path)
        {
            return Ok();
        }
    }
}
