import { Aspect } from "../../core/models";
import { Functor } from "../../core/Functor";
import { ITestHttpRequest } from "../../models";

export class HttpSecured extends Functor {
	name = "HttpSecured";
	requires = [Aspect.HttpRequest];
	produces = [Aspect.Secured];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.Secured]: obj[Aspect.HttpRequest].isTLS,
		};
	}
}

const httpSecuredInstance = new HttpSecured();
export default httpSecuredInstance;
