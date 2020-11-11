import { PrimitiveFunctor, Some } from "@xde/flow-manager";
import { GeneratedApiBody, HttpStatusCode, TGeneratedApiBody, THttpStatusCode } from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";

import {
	ApiRawSignUpRequest,
	ApiValidSignUpRequest,
	TApiValidSignUpRequest,
	TApiRawSignUpRequest,
} from "../../../../models/aspects";
import { SingUpRequest } from "../../../../models/user/SignUpRequest";

export class ApiValidSignUpRequested extends PrimitiveFunctor<
	TApiRawSignUpRequest,
	TApiValidSignUpRequest | (TGeneratedApiBody & THttpStatusCode<422>)
> {
	name = "ApiValidSignUpRequested";
	from = [ApiRawSignUpRequest];
	to = [
		{
			aspect: [[ApiValidSignUpRequest], [GeneratedApiBody, HttpStatusCode]],
			lambda: Some,
		},
	];

	async distinct(obj: TApiRawSignUpRequest) {
		const request = new SingUpRequest(obj[ApiRawSignUpRequest] as any);
		const validation = await request.validate();

		if (!Array.isArray(validation)) {
			return {
				[ApiValidSignUpRequest]: validation,
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

const apiValidSignUpRequestedInstance = new ApiValidSignUpRequested();
export default apiValidSignUpRequestedInstance;
