import {
	THttpStatusCode,
	HttpStatusCode,
	HttpRouted,
	THttpRouted,
	GeneratedApiBody,
	TGeneratedApiBody,
	TEndpointType,
	EndpointType,
	Endpoint,
} from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";
import { PrimitiveFunctor } from "@xde/flow-manager";

export class AppJson404 extends PrimitiveFunctor<
	THttpRouted & TEndpointType,
	TGeneratedApiBody & THttpStatusCode<404>
> {
	name = "AppJson404";
	from = [
		// To ensure we are not adding 404 handling for something that doesn't need it.
		HttpRouted,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Json,
		},
	];
	to = [GeneratedApiBody, HttpStatusCode];

	distinct() {
		return {
			[GeneratedApiBody]: {
				result: false,
				code: EndpointErrorCode.NotFound,
			},
			[HttpStatusCode]: 404 as const,
		};
	}
}

const appJson404Instance = new AppJson404();
export default appJson404Instance;
