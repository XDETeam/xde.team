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

        [Given(@"Scheduled (.+) on (.+) at (.+)")]
        public void GivenScheduledWeeklyAt(string repeat, string on, string at)
        {
            _context.Aspect("schedule", ("on", on), ("at", at));
        }
    }
}
