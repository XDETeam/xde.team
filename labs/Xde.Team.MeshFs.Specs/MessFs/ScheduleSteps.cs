using TechTalk.SpecFlow;

namespace Xde.MessFs
{
    [Binding]
    public class ScheduleSteps
        : Steps
    {
        private readonly MessScenarioContext _context;

        public ScheduleSteps(MessScenarioContext context)
        {
            _context = context;
        }

        [Given(@"Scheduled (.+) at (.+)")]
        public void GivenScheduledWeeklyAt(string repeat, string at)
        {
            _context.Aspect("schedule", ("at", at));
        }
    }
}
