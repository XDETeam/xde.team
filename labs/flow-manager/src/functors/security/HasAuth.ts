import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";
import { ITestHttpRequest } from "../../models";

export class HasAuth extends Functor {
	requires = [Aspect.HttpRequest];
	produces = [Aspect.HasAuth];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		Functor.debugger.extend("HasAuth")("Pass 'valid' to be authorized");

		return {
			...obj,
			[Aspect.HasAuth]: obj[Aspect.HttpRequest].authCookie === "valid",
		};
	}
}

const hasAuthInstance = new HasAuth();
export default hasAuthInstance;
