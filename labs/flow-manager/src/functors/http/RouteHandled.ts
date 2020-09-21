import { Functor } from "../../core/Functor";
import { Aspect, AspectsState } from "../../core/models";

export class RouteHandled extends Functor {
	requires = [
		{ aspects: [Aspect.RenderedHtml, Aspect.Redirected], are: AspectsState.SomeTruthy },
	];
	produces = [Aspect.RouteHandled];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.RouteHandled]: true,
		};
	}
}

const routeHandledInstance = new RouteHandled();
export default routeHandledInstance;
