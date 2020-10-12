import { TCommonApiResponse } from "@xde/common";
import { Functor, Some } from "@xde/flow-manager";

import { Aspect } from "../../../../models/aspects";
import { SingUpRequest, TSignUpRequest } from "../../../../models/user/SignUpRequest";

export class ApiValidSignUpRequested extends Functor<Aspect> {
	name = "ApiValidSignUpRequested";
	from = [Aspect.ApiRawSignUpRequest];
	to = [
		{
			aspect: [Aspect.ApiValidSignUpRequest, [Aspect.GeneratedApiBody, Aspect.ResponseCode]],
			lambda: Some,
		},
	];

	async map(obj: { [Aspect.ApiRawSignUpRequest]: TSignUpRequest }): Promise<{}> {
		const request = new SingUpRequest(obj[Aspect.ApiRawSignUpRequest]);
		const validation = await request.validate();

		if (!Array.isArray(validation)) {
			return {
				...obj,
				[Aspect.ApiValidSignUpRequest]: validation,
			};
		} else {
			const response: TCommonApiResponse = {
				result: false,
				code: "UnprocessableEntity",
				details: validation,
			};
			return {
				...obj,
				[Aspect.GeneratedApiBody]: response,
				[Aspect.ResponseCode]: 422,
			};
		}
	}
}

const apiValidSignUpRequestedInstance = new ApiValidSignUpRequested();
export default apiValidSignUpRequestedInstance;
