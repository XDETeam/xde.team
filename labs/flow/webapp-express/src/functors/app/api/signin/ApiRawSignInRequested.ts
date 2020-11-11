import { PrimitiveFunctor, Some, Optional } from "@xde/flow-manager";
import {
	GeneratedApiBody,
	HttpStatusCode,
	HttpHeaders,
	TGeneratedApiBody,
	THttpStatusCode,
	THttpHeaders,
	NodejsExpressRequest,
	TNodejsExpressRequest,
	HttpRouted,
	THttpRouted,
} from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";

import { TApiRawSignInRequest, ApiRawSignInRequest } from "../../../../models/aspects";

export class ApiRawSignInRequested extends PrimitiveFunctor<
	TNodejsExpressRequest & THttpRouted & Partial<THttpHeaders>,
	TApiRawSignInRequest | (TGeneratedApiBody & THttpStatusCode<405> & THttpHeaders)
> {
	name = "ApiRawSignInRequested";
	from = [
		NodejsExpressRequest,
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/sign-in"),
		},
		{
			aspect: [HttpHeaders],
			lambda: Optional,
		},
	];
	to = [
		{
			aspect: [[ApiRawSignInRequest], [GeneratedApiBody, HttpStatusCode, HttpHeaders]],
			lambda: Some,
		},
	];

	distinct(obj: TNodejsExpressRequest & THttpRouted & Partial<THttpHeaders>) {
		if (obj[HttpRouted].method === "POST") {
			return {
				[ApiRawSignInRequest]: obj[NodejsExpressRequest].body,
			};
		} else {
			return {
				[GeneratedApiBody]: {
					result: false,
					code: EndpointErrorCode.MethodNotAllowed,
				},
				[HttpHeaders]: {
					...obj[HttpHeaders],
					Allow: "POST",
				},
				[HttpStatusCode]: 405 as const,
			};
		}
	}
}

const apiRawSignInRequestedInstance = new ApiRawSignInRequested();
export default apiRawSignInRequestedInstance;
