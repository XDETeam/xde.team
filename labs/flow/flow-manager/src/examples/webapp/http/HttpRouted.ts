import { THttpRoute, HttpRoute } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TestHttpRequest, TTestHttpRequest } from "../models/TestHttpRequest";

export class HttpRouted extends PrimitiveFunctor<TTestHttpRequest, THttpRoute> {
	name = "HttpRouted";
	from = [TestHttpRequest];
	to = [HttpRoute];

	distinct(obj: TTestHttpRequest): THttpRoute {
		return {
			[HttpRoute]: {
				protocol: obj[TestHttpRequest].isTLS ? "https" : "http",
				hostname: obj[TestHttpRequest].host,
				path: obj[TestHttpRequest].path,
				originalUrl: obj[TestHttpRequest].path,
			},
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
