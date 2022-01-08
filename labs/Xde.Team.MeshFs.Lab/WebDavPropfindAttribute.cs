using Microsoft.AspNetCore.Mvc.Routing;

namespace Xde.Lab.MeshFs
{
    public class WebDavPropfindAttribute
        : HttpMethodAttribute
    {
        public const string MethodName = "PROPFIND";

        public WebDavPropfindAttribute()
            : base(Enumerable.Repeat(MethodName, 1))
        {

        }
    }
}
