import { Functor } from "@xde/flow-manager";
import { Request } from "express";

import { Aspect } from "../../models/aspects";

export class HttpSecured extends Functor<Aspect> {
	name = "HttpSecured";
	from = [Aspect.HttpRequest];
	to = [Aspect.Secured];

	map(obj: { [Aspect.HttpRequest]: Request }): {} {
		return {
			...obj,
			[Aspect.Secured]: obj[Aspect.HttpRequest].secure,
		};
	}
}

const httpSecuredInstance = new HttpSecured();
export default httpSecuredInstance;
