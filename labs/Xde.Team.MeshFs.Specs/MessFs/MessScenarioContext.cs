using System.Xml.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Bindings;

namespace Xde.MessFs
{
    public class MessScenarioContext
    {
        private readonly ScenarioContext _context;
        private bool _deployed = false;
        private XElement? _head;

        public MessScenarioContext(ScenarioContext context)
        {
            _context = context;
        }

        public XElement? Head => _head;

        public bool ShouldDeploy
        {
            get
            {
                if (_deployed)
                {
                    return false;
                }

                var stepType = _context
                    .StepContext
                    .StepInfo
                    .StepInstance
                    .StepDefinitionType
                ;

                if (stepType == StepDefinitionType.Given)
                {
                    return false;
                }

                return _deployed = true;
            }
        }

        private static XAttribute[] ConvertAttributes(
            (string, object)[] attributes
        ) => attributes
            .Select(tuple => new XAttribute(
                XName.Get(tuple.Item1),
                tuple.Item2
            ))
            .ToArray()
        ;

        private static XElement CreateElement(
            string tagName,
            params (string, object)[] attributes
        )
            => new(tagName, ConvertAttributes(attributes))
        ;

        public void Push(XElement xml)
        {
            _head = xml;
        }

        public void Push(string tagName)
            => Push(new XElement(XName.Get(tagName)))
        ;

        public void Push(string tagName, params XAttribute[] attributes)
            => Push(new XElement(XName.Get(tagName), attributes))
        ;

        public void Push(string tagName, params (string, object)[] attributes)
            => Push(CreateElement(tagName, attributes))
        ;

        public void Aspect(XElement xml)
        {
            if (_head == null)
            {
                throw new InvalidOperationException("TODO:Missing head");
            }

            _head.Add(xml);
        }

        public void Aspect(string tagName, params (string, object)[] attributes)
            => Aspect(CreateElement(tagName, attributes))
        ;
    }
}
