using BoDi;
using TechTalk.SpecFlow;

namespace Xde.MessFs
{
    [Binding]
    public class SharedScenarios
    {
        private readonly IObjectContainer _container;

        public SharedScenarios(IObjectContainer container)
        {
            _container = container;
        }

        [BeforeScenario]
        public void InitializeMessService()
        {
            var mess = new SimpleMessService();

            _container.RegisterInstanceAs<IMessService>(mess);
        }
    }
}
