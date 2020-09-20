import { IHookFunctor } from "../../Functor";
import { Aspects, AspectState } from "../../../aspects/index";

export class App404Error implements IHookFunctor {
	isHook: true = true;

	requires = [
		{ aspect: Aspects.RouteHandled, is: AspectState.Undefined },
		// Two below - to ensure we are not adding 404 handling for something that doesn't need it.
		Aspects.Routed,
		Aspects.HttpRequest,
	];
	produces = [Aspects.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.ResponseCode]: 404,
		};
	}
}

const app404ErrorInstance = new App404Error();
export default app404ErrorInstance;
