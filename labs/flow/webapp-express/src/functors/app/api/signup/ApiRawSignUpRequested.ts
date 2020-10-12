import { TCommonApiResponse, THttpMethod } from "@xde/common";
import { Functor, PartialObject, Some } from "@xde/flow-manager";
import { Request } from "express";

import { Aspect } from "../../../../models/aspects";
import { IHttpRouted } from "../../../http/HttpRouted";

export class ApiRawSignUpRequested extends Functor<Aspect> {
	name = "ApiRawSignUpRequested";
	from = [
		Aspect.HttpRequest,
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/api/sign-up"),
		},
	];
	to = [
		{
			aspect: [
				Aspect.ApiRawSignUpRequest,
				[Aspect.GeneratedApiBody, Aspect.ResponseCode, Aspect.AdditionalHeaders],
			],
			lambda: Some,
		},
	];

	map(obj: { [Aspect.HttpRouted]: IHttpRouted; [Aspect.HttpRequest]: Request }): {} {
		if (obj[Aspect.HttpRouted].method === "POST") {
			return {
				...obj,
				[Aspect.ApiRawSignUpRequest]: obj[Aspect.HttpRequest].body,
			};
		} else {
			const response: TCommonApiResponse = {
				result: false,
				code: "MethodNotAllowed",
			};
			const additionalHeaders: { [key: string]: THttpMethod } = { Allow: "POST" };
			return {
				...obj,
				[Aspect.GeneratedApiBody]: response,
				[Aspect.AdditionalHeaders]: additionalHeaders,
				[Aspect.ResponseCode]: 405,
			};
		}
	}
}

const apiRawSignUpRequestedInstance = new ApiRawSignUpRequested();
export default apiRawSignUpRequestedInstance;
