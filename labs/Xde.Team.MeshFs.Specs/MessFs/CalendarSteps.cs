using TechTalk.SpecFlow;

namespace Xde.MessFs
{
    [Binding]
    public class CalendarSteps
    {
        private readonly IMessService _mess;

        public CalendarSteps(IMessService mess)
        {
            _mess = mess;
        }

        //TODO:
        [When(@"(.+) look at calendar on (.+)")]
        public void WhenStanLookAtCalendarOn(string person, string calendar)
        {
            //throw new PendingStepException();
        }
    }
}
