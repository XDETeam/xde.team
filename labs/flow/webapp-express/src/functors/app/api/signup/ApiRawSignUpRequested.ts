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

import { TApiRawSignUpRequest, ApiRawSignUpRequest } from "../../../../models/aspects";

export class ApiRawSignUpRequested extends PrimitiveFunctor<
	TNodejsExpressRequest & THttpRouted & Partial<THttpHeaders>,
	TApiRawSignUpRequest | (TGeneratedApiBody & THttpStatusCode<405> & THttpHeaders)
> {
	name = "ApiRawSignUpRequested";
	from = [
		NodejsExpressRequest,
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/sign-up"),
		},
		{
			aspect: [HttpHeaders],
			lambda: Optional,
		},
	];
	to = [
		{
			aspect: [[ApiRawSignUpRequest], [GeneratedApiBody, HttpStatusCode, HttpHeaders]],
			lambda: Some,
		},
	];

	distinct(obj: TNodejsExpressRequest & THttpRouted & Partial<THttpHeaders>) {
		if (obj[HttpRouted].method === "POST") {
			return {
				[ApiRawSignUpRequest]: obj[NodejsExpressRequest].body,
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

const apiRawSignUpRequestedInstance = new ApiRawSignUpRequested();
export default apiRawSignUpRequestedInstance;
