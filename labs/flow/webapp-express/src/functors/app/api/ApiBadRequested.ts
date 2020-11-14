import {
	THttpStatusCode,
	HttpStatusCode,
	HttpRouted,
	THttpRouted,
	THttpSecured,
	HttpSecured,
	TGeneratedApiBody,
	GeneratedApiBody,
} from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";
import { PrimitiveFunctor } from "@xde/flow-manager";

export class ApiBadRequested extends PrimitiveFunctor<
	THttpRouted & THttpSecured,
	TGeneratedApiBody & THttpStatusCode<400>
> {
	name = "ApiBadRequested";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/"),
		},
		{
			aspect: HttpSecured,
			lambda: (obj: THttpSecured) => obj[HttpSecured] === false,
		},
	];
	to = [GeneratedApiBody, HttpStatusCode];

	distinct() {
		return {
			[GeneratedApiBody]: {
				result: false,
				code: EndpointErrorCode.InsecureApiRequest,
			},
			[HttpStatusCode]: 400 as const,
		};
	}
}

const apiBadRequestedInstance = new ApiBadRequested();
export default apiBadRequestedInstance;
