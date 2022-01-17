using System.Xml.Linq;

namespace Xde.MessFs
{
    public class SimpleMessService
        : IMessService
    {
        private readonly Dictionary<string, XElement> _data = new();

        void IMessService.Put(string url, XElement content)
        {
            _data[url] = content;
        }
    }
}
