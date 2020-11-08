import { TAuthorized, Authorized } from "@xde/aspects";

import { Functor } from "../../../functor/Functor";
import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TestHttpRequest, TTestHttpRequest } from "../models/TestHttpRequest";

export class HttpHasAuth extends PrimitiveFunctor<TTestHttpRequest, TAuthorized> {
	name = "HttpHasAuth";
	from = [TestHttpRequest];
	to = [Authorized];

	distinct(obj: TTestHttpRequest): TAuthorized {
		Functor.debugger.extend("HttpHasAuth")("Pass 'valid' to be authorized");

		return {
			[Authorized]: obj[TestHttpRequest].authCookie === "valid",
		};
	}
}

const httpHasAuthInstance = new HttpHasAuth();
export default httpHasAuthInstance;
