import { PrimitiveFunctor, Some } from "@xde/flow-manager";
import { GeneratedApiBody, HttpStatusCode, TGeneratedApiBody, THttpStatusCode } from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";

import {
	ApiRawSignInRequest,
	ApiValidSignInRequest,
	TApiValidSignInRequest,
	TApiRawSignInRequest,
} from "../../../../models/aspects";
import { SingInRequest } from "../../../../models/user/SignInRequest";

export class ApiValidSignInRequested extends PrimitiveFunctor<
	TApiRawSignInRequest,
	TApiValidSignInRequest | (TGeneratedApiBody & THttpStatusCode<422>)
> {
	name = "ApiValidSignInRequested";
	from = [ApiRawSignInRequest];
	to = [
		{
			aspect: [[ApiValidSignInRequest], [GeneratedApiBody, HttpStatusCode]],
			lambda: Some,
		},
	];

	async distinct(obj: TApiRawSignInRequest) {
		const request = new SingInRequest(obj[ApiRawSignInRequest] as any);

		const validation = await request.validate();

		if (!Array.isArray(validation)) {
			return {
				[ApiValidSignInRequest]: validation,
			};
		} else {
			return {
				[GeneratedApiBody]: {
					result: false,
					code: EndpointErrorCode.UnprocessableEntity,
					details: validation,
				},
				[HttpStatusCode]: 422 as const,
			};
		}
	}
}

const apiValidSignInRequestedInstance = new ApiValidSignInRequested();
export default apiValidSignInRequestedInstance;
