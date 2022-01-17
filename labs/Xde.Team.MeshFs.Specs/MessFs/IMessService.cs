using System.Xml.Linq;

namespace Xde.MessFs
{
    public interface IMessService
    {
        void Put(string url, XElement content);
    }
}
