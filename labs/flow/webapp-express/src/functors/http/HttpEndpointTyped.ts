import { PrimitiveFunctor } from "@xde/flow-manager";
import { TEndpointType, EndpointType, Endpoint, HttpRouted, THttpRouted } from "@xde/aspects";

export class HttpEndpointTyped extends PrimitiveFunctor<THttpRouted, TEndpointType> {
	name = "HttpEndpointTyped";
	from = [HttpRouted];
	to = [EndpointType];

	distinct() {
		return {
			// By default - html. Override in case change is required
			[EndpointType]: Endpoint.Html,
		};
	}
}

const httpEndpointTypedInstance = new HttpEndpointTyped();
export default httpEndpointTypedInstance;
