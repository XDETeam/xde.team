using Xunit;

namespace Xde.MessFs
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// - There are multiple participands of the meeting. Each one has its own
    /// outcomes from the meeting.
    /// - Meeting itself has a schedule. But this schedule is shared. So everybody
    /// in the meeting should have it in personal notifications.
    /// - Participant subscribes to the meeting or meeting contains subscribers?
    /// - Meeting is a template. It can have an estimated duration.
    /// </remarks>
    public class TeamMeetingSpecs
    {
        /// <summary>
        /// Shared calendars for the meeting
        /// </summary>
        [Fact]
        public void MultipleParticipants_MeetingHasSchedule_EachParticipantHasInCalendar()
        {
            var meeting = $@"
                <meeting name=""Some cool meeting"">
                    <weekly on=""Tue"" at=""09:30+1""/>
                </meeting>
            ";

            //TODO:
            //TODO:Meetings template

            Assert.True(false);
        }
    }
}
