import { Functor } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";

export enum EndpointType {
	Html,
	Json,
}

export class HttpEndpointTyped extends Functor<Aspect> {
	name = "HttpEndpointTyped";
	from = [Aspect.HttpRouted];
	to = [Aspect.EndpointType];

	map(obj: {}): {} {
		return {
			...obj,
			// By default - html. Override in case change is required
			[Aspect.EndpointType]: EndpointType.Html,
		};
	}
}

const httpEndpointTypedInstance = new HttpEndpointTyped();
export default httpEndpointTypedInstance;
