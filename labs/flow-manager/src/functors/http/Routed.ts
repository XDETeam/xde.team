import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";
import { ITestHttpRequest } from "../../models";

export class Routed extends Functor {
	requires = [Aspect.HttpRequest];
	produces = [Aspect.Routed];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.Routed]: obj[Aspect.HttpRequest].route,
		};
	}
}

const routedInstance = new Routed();
export default routedInstance;
