import { TCommonApiResponse } from "@xde/common";
import { Functor, Some } from "@xde/flow-manager";

import { Aspect } from "../../../../models/aspects";
import { TSignInRequest, SingInRequest } from "../../../../models/user/SignInRequest";

export class ApiValidSignInRequested extends Functor<Aspect> {
	name = "ApiValidSignInRequested";
	from = [Aspect.ApiRawSignInRequest];
	to = [
		{
			aspect: [Aspect.ApiValidSignInRequest, [Aspect.GeneratedApiBody, Aspect.ResponseCode]],
			lambda: Some,
		},
	];

	async map(obj: { [Aspect.ApiRawSignInRequest]: TSignInRequest }): Promise<{}> {
		const request = new SingInRequest(obj[Aspect.ApiRawSignInRequest]);

		const validation = await request.validate();

		if (!Array.isArray(validation)) {
			return {
				...obj,
				[Aspect.ApiValidSignInRequest]: validation,
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

const apiValidSignInRequestedInstance = new ApiValidSignInRequested();
export default apiValidSignInRequestedInstance;
