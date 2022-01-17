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
                if (_context.Head == null)
                {
                    throw new Exception("TODO:Missing data object");
                }

                _mess.Put("/todo", _context.Head);
            }
        }
    }
}
