import {
	THttpStatusCode,
	HttpStatusCode,
	HttpRouted,
	THttpRouted,
	TEndpointType,
	EndpointType,
	Endpoint,
} from "@xde/aspects";
import { PrimitiveFunctor } from "@xde/flow-manager";

export class AppHtml404 extends PrimitiveFunctor<
	THttpRouted & TEndpointType,
	THttpStatusCode<404>
> {
	name = "AppHtml404";
	from = [
		// {
		// 	aspect: [HttpStatusCode],
		// 	lambda: Undefined,
		// },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		HttpRouted,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
	];
	to = [HttpStatusCode];

	distinct() {
		return {
			[HttpStatusCode]: 404 as const,
		};
	}
}

const appHtml404Instance = new AppHtml404();
export default appHtml404Instance;
