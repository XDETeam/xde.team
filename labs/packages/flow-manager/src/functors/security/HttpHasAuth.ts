import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";
import { ITestHttpRequest } from "../../models";

export class HttpHasAuth extends Functor {
	name = "HttpHasAuth";
	from = [Aspect.HttpRequest];
	to = [Aspect.HasAuth];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		Functor.debugger.extend("HttpHasAuth")("Pass 'valid' to be authorized");

		return {
			...obj,
			[Aspect.HasAuth]: obj[Aspect.HttpRequest].authCookie === "valid",
		};
	}
}

const httpHasAuthInstance = new HttpHasAuth();
export default httpHasAuthInstance;
