import { Functor, PartialObject, Undefined } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";
import { EndpointType } from "../http/HttpEndpointTyped";

// TODO: separate 404 json response?
export class App404 extends Functor<Aspect> {
	name = "App404";
	from = [
		{
			aspect: [Aspect.ResponseCode],
			lambda: Undefined,
		},
		// {
		// 	aspect: Aspect.EndpointType,
		// 	lambda: (
		// 		obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
		// 	) => obj[Aspect.EndpointType] === EndpointType.Html,
		// },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		Aspect.HttpRouted,
	];
	to = [Aspect.ResponseCode];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 404,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
