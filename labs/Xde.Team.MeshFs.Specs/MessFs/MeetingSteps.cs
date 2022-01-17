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

        [Given(@"Meeting ""(.*)""")]
        public void GivenMeeting(string meetingName)
        {
            _context.Push("meeting", ("name", meetingName));
        }
    }
}
