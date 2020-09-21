import { Aspect } from "../../core/models";
import { Functor } from "../../core/Functor";
import { ITestHttpRequest } from "../../models";

export class Secured extends Functor {
	requires = [Aspect.HttpRequest];
	produces = [Aspect.Secured];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.Secured]: obj[Aspect.HttpRequest].isTLS,
		};
	}
}

const securedInstance = new Secured();
export default securedInstance;
