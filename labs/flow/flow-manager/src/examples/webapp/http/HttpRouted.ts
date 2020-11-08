import { THttpRouted, HttpRouted as HttpRoutedAspect } from "@xde/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TestHttpRequest, TTestHttpRequest } from "../models/TestHttpRequest";

export class HttpRouted extends PrimitiveFunctor<TTestHttpRequest, THttpRouted> {
	name = "HttpRouted";
	from = [TestHttpRequest];
	to = [HttpRoutedAspect];

	distinct(obj: TTestHttpRequest): THttpRouted {
		return {
			[HttpRoutedAspect]: {
				protocol: obj[TestHttpRequest].isTLS ? "https" : "http",
				hostname: obj[TestHttpRequest].host,
				path: obj[TestHttpRequest].path,
				originalUrl: obj[TestHttpRequest].path,
				method: "GET",
			},
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
