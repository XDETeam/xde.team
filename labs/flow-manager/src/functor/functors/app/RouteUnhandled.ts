import { IHookFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class RouteUnhandled implements IHookFunctor {
	isHook: true = true;

	requires = [Aspects.Routed];
	produces = [Aspects.RouteHandled];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.ResponseCode]: 404,
		};
	}
}

const routeUnhandledInstance = new RouteUnhandled();
export default routeUnhandledInstance;
