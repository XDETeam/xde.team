using TechTalk.SpecFlow;

namespace Xde.MessFs
{
    [Binding]
    public class MeetingSteps
        : Steps
    {
        private readonly MessScenarioContext _context;

        public MeetingSteps(MessScenarioContext context)
        {
            _context = context;
        }

        [Given(@"Meeting of (.+)")]
        public void GivenMeetingBy(string url)
        {
            _context.Push("meeting", ("url", url));
        }
    }
}
