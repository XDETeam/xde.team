import { TCommonApiResponse } from "@xde/common";
import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../../models/aspects";
import { IHttpRouted } from "../../http/HttpRouted";

export class ApiBadRequested extends Functor<Aspect> {
	name = "ApiBadRequested";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/api/"),
		},
		{
			aspect: Aspect.Secured,
			lambda: (obj: PartialObject<Aspect.Secured, { [Aspect.Secured]?: boolean }>) =>
				obj[Aspect.Secured] === false,
		},
	];
	to = [Aspect.GeneratedApiBody, Aspect.ResponseCode];

	map(obj: {}): {} {
		const response: TCommonApiResponse = {
			result: false,
			code: "InsecureApiRequest",
		};

		return {
			...obj,
			[Aspect.GeneratedApiBody]: response,
			[Aspect.ResponseCode]: 400,
		};
	}
}

const apiBadRequestedInstance = new ApiBadRequested();
export default apiBadRequestedInstance;
