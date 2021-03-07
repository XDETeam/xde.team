import {
	THttpStatusCode,
	HttpStatusCode,
	TGeneratedApiBody,
	GeneratedApiBody,
	HttpHeaders,
	THttpHeaders,
} from "@xde.labs/aspects";
import { EndpointErrorCode } from "@xde.labs/endpoint";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import { TApi405AllowHeaders, Api405AllowHeaders } from "../../../models/aspects";

export class Api405 extends PrimitiveFunctor<
	TApi405AllowHeaders & Partial<THttpHeaders>,
	TGeneratedApiBody & THttpStatusCode<405> & THttpHeaders
> {
	name = "Api405";
	from = [
		Api405AllowHeaders,
		{
			aspect: [HttpHeaders],
			lambda: Optional,
		},
	];
	to = [GeneratedApiBody, HttpStatusCode, HttpHeaders];

	distinct(obj: TApi405AllowHeaders & Partial<THttpHeaders>) {
		return {
			[GeneratedApiBody]: {
				result: false,
				code: EndpointErrorCode.MethodNotAllowed,
			},
			[HttpHeaders]: {
				...obj[HttpHeaders],
				Allow: obj[Api405AllowHeaders].join(),
			},
			[HttpStatusCode]: 405 as const,
		};
	}
}

const api405Instance = new Api405();
export default api405Instance;
