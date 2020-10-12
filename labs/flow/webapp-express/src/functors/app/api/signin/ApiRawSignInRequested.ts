import { Functor, PartialObject, Some } from "@xde/flow-manager";
import { TCommonApiResponse, THttpMethod } from "@xde/common";
import { Request } from "express";

import { Aspect } from "../../../../models/aspects";
import { IHttpRouted } from "../../../http/HttpRouted";

export class ApiRawSignInRequested extends Functor<Aspect> {
	name = "ApiRawSignInRequested";
	from = [
		Aspect.HttpRequest,
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/api/sign-in"),
		},
	];
	to = [
		{
			aspect: [
				Aspect.ApiRawSignInRequest,
				[Aspect.GeneratedApiBody, Aspect.ResponseCode, Aspect.AdditionalHeaders],
			],
			lambda: Some,
		},
	];

	map(obj: { [Aspect.HttpRouted]: IHttpRouted; [Aspect.HttpRequest]: Request }): {} {
		if (obj[Aspect.HttpRouted].method === "POST") {
			return {
				...obj,
				[Aspect.ApiRawSignInRequest]: obj[Aspect.HttpRequest].body,
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

const apiRawSignInRequestedInstance = new ApiRawSignInRequested();
export default apiRawSignInRequestedInstance;
