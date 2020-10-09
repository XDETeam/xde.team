import { Functor } from "../../../functor/Functor";
import { Aspect } from "../../../models";
import { ITestHttpRequest } from "../models";

export class HttpSecured extends Functor {
	name = "HttpSecured";
	from = [Aspect.HttpRequest];
	to = [Aspect.Secured];

	map(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.Secured]: obj[Aspect.HttpRequest].isTLS,
		};
	}
}

const httpSecuredInstance = new HttpSecured();
export default httpSecuredInstance;
