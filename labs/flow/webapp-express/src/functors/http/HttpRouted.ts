import { THttpMethod } from "@xde/common";
import { PrimitiveFunctor } from "@xde/flow-manager";
import {
	NodejsExpressRequest,
	TNodejsExpressRequest,
	HttpRouted as HttpRoutedAspect,
	THttpRouted,
	IHttpRouted,
} from "@xde/aspects";

import { APP_HTTP_PORT, APP_TLS_PORT } from "../../config";

export class HttpRouted extends PrimitiveFunctor<TNodejsExpressRequest, THttpRouted> {
	name = "HttpRouted";
	from = [NodejsExpressRequest];
	to = [HttpRoutedAspect];

	distinct(obj: TNodejsExpressRequest) {
		const port = obj[NodejsExpressRequest].secure
			? (APP_TLS_PORT as number)
			: (APP_HTTP_PORT as number);
		const routed: IHttpRouted = {
			protocol: obj[NodejsExpressRequest].protocol,
			hostname: obj[NodejsExpressRequest].hostname,
			nonStandardPort: port === 80 || port === 443 ? undefined : port,
			path: obj[NodejsExpressRequest].path,
			originalUrl: obj[NodejsExpressRequest].originalUrl,
			method: obj[NodejsExpressRequest].method as THttpMethod,
		};
		return {
			[HttpRoutedAspect]: routed,
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
