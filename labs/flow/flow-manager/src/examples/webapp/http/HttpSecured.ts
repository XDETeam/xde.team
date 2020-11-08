import { THttpSecured, HttpSecured as HttpSecuredAspect } from "@xde/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TestHttpRequest, TTestHttpRequest } from "../models/TestHttpRequest";

export class HttpSecured extends PrimitiveFunctor<TTestHttpRequest, THttpSecured> {
	name = "HttpSecured";
	from = [TestHttpRequest];
	to = [HttpSecuredAspect];

	distinct(obj: TTestHttpRequest): THttpSecured {
		return {
			[HttpSecuredAspect]: obj[TestHttpRequest].isTLS,
		};
	}
}

const httpSecuredInstance = new HttpSecured();
export default httpSecuredInstance;
