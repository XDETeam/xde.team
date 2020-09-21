import { Functor } from "../../Functor";
import { Aspects, AspectsState } from "../../../aspects/index";

export class RouteHandled extends Functor {
	requires = [
		{ aspects: [Aspects.RenderedHtml, Aspects.Redirected], are: AspectsState.SomeTruthy },
	];
	produces = [Aspects.RouteHandled];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.RouteHandled]: true,
		};
	}
}

const routeHandledInstance = new RouteHandled();
export default routeHandledInstance;
