import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import {
	THttpStatusCode,
	HttpStatusCode,
	TEndpointType,
	EndpointType,
	Endpoint,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	GeneratedApiBody,
	TGeneratedApiBody,
	SentApiResponse,
	TSentApiResponse,
	THttpHeaders,
	HttpHeaders,
} from "@xde.labs/aspects";

export class ApiSender extends PrimitiveFunctor<
	TNodejsExpressResponse &
		TGeneratedApiBody &
		TEndpointType &
		Partial<THttpStatusCode> &
		Partial<THttpHeaders>,
	TSentApiResponse
> {
	name = "ApiSender";
	from = [
		NodejsExpressResponse,
		GeneratedApiBody,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Json,
		},
		{ aspect: HttpHeaders, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	];
	to = [SentApiResponse];

	distinct(
		obj: TNodejsExpressResponse &
			TGeneratedApiBody &
			Partial<THttpStatusCode> &
			Partial<THttpHeaders>
	) {
		obj[NodejsExpressResponse].status(obj[HttpStatusCode] ?? 200);

		if (obj[HttpHeaders]) {
			obj[NodejsExpressResponse].header(obj[HttpHeaders]);
		}

		obj[NodejsExpressResponse].json(obj[GeneratedApiBody]);

		return {
			[SentApiResponse]: true,
		};
	}
}

const apiSenderInstance = new ApiSender();
export default apiSenderInstance;
