import { HttpRouted, THttpRouted, EndpointType, TEndpointType, Endpoint } from "@xde/aspects";
import { PrimitiveFunctor } from "@xde/flow-manager";

export class ApiEndpointTyped extends PrimitiveFunctor<
	THttpRouted & Partial<TEndpointType>,
	TEndpointType
> {
	name = "ApiEndpointTyped";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/"),
		},
		{
			aspect: EndpointType,
			lambda: (obj: Partial<TEndpointType>) => obj[EndpointType] !== Endpoint.Json,
		},
	];
	to = [
		{
			aspect: EndpointType,
			// TODO: allow force without lambda? or leave as additional protection from unwanted force effects? and to be sure that exits form the loop?
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Json,
			force: true,
		},
	];

	distinct() {
		return {
			[EndpointType]: Endpoint.Json,
		};
	}
}

const apiEndpointTypedInstance = new ApiEndpointTyped();
export default apiEndpointTypedInstance;
