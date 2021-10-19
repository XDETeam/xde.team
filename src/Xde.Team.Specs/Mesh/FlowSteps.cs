using TechTalk.SpecFlow;

namespace Xde.Mesh
{
    [Binding]
    public class FlowSteps
    {
        [Given(@"Default flows")]
        public void GivenDefaultFlows()
        {
            //TODO: throw new PendingStepException();
        }

        [Given(@"User (.+)")]
        public void GivenUserStan(string userName)
        {
            //TODO: throw new PendingStepException();
        }

        [When(@"Get flows by tags (.+)")]
        public void WhenGetFlowsByTagsXdeServer(string tags)
        {
            //TODO: throw new PendingStepException();
        }

        [Then(@"Display flow ""(.+)""")]
        public void ThenDisplayFlow(string topic)
        {
            //TODO: throw new PendingStepException();
        }
    }
}
