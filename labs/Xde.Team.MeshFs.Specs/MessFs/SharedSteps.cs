using System.Xml.Linq;
using TechTalk.SpecFlow;

namespace Xde.MessFs
{
    [Binding]
    public class SharedSteps
    {
        private readonly MessScenarioContext _context;
        private readonly IMessService _mess;

        public SharedSteps(
            MessScenarioContext context,
            IMessService mess
        )
        {
            _context = context;
            _mess = mess;
        }

        [BeforeStep]
        public void BeforeStep()
        {
            if (_context.ShouldDeploy)
            {
                var head = _context.Head;
                
                if (head == null)
                {
                    throw new Exception("TODO:Missing data object");
                }

                var url = head.Attribute(XName.Get("url"));
                if (url == null)
                {
                    throw new Exception("TODO:Missing URL");
                }

                _mess.Put(url.Value, head);
            }
        }
    }
}
