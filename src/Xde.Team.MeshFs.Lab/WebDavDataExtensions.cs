using System.Xml.Linq;

namespace Xde.Lab.MeshFs
{
    internal static class WebDavDataExtensions
    {
        internal static readonly XNamespace Ns = XNamespace.Get("DAV:");

        private static readonly XElement XmlResourceType = new(
            Ns.GetName("getcontenttype"),
            "text/xml"
        );
        private static readonly XElement XmlStatusOk = new(
            Ns.GetName("status"),
            "HTTP/1.1 200 OK"
        );

        //TODO:
        internal static XElement ToWebDavFile(this Flow flow)
        {
            List<XElement> attrs = new()
            {
                new XElement(
                    Ns.GetName("displayname"),
                    "Example file"
                ),
                new XElement(
                    Ns.GetName("resourcetype")
                    //new XElement(Ns.GetName("collection"))
                ),
                new XElement(
                    Ns.GetName("getcontentlength"),
                    flow.Value?.Length ?? 0
                ),
                XmlResourceType,
                //new XElement(
                //    Ns.GetName("getetag"),
                //    "tag1,tag2"
                //),
                //new XElement(
                //    Ns.GetName("getlastmodified"),
                //    "Mon, 12 Jan 1998 09:25:56 GMT"
                //)
            };

            if (flow.Created != null)
            {
                attrs.Add(
                    new XElement(
                        Ns.GetName("creationdate"),
                        flow.Created.Value.ToString("O")
                    )
                );
            }

            var fileTags = flow.Tags != null
                ? $" ({flow.Tags.Replace('.', ',')}) "
                : string.Empty
            ;
            var fileName = $"{flow.Topic ?? "NULL"} {fileTags}[{flow.Id}].xml";

            return new(
                Ns.GetName("response"),
                new XElement(
                    Ns.GetName("href"),
                    $"{fileName}"
                ),
                new XElement(
                    Ns.GetName("propstat"),
                    new XElement(
                        Ns.GetName("prop"),
                        attrs
                    )
                ),
                XmlStatusOk
            );
        }
    }
}
