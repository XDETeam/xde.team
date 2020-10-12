import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../../models/aspects";
import { IHttpRouted } from "../../http/HttpRouted";
import { EndpointType } from "../../http/HttpEndpointTyped";

export class ApiEndpointTyped extends Functor<Aspect> {
	name = "ApiEndpointTyped";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/api/"),
		},
	];
	// TODO: lambda: () => true ?
	to = [
		{
			aspect: Aspect.EndpointType,
			lambda: (
				obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
			) => obj[Aspect.EndpointType] === EndpointType.Json,
			force: true,
		},
	];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.EndpointType]: EndpointType.Json,
		};
	}
}

const apiEndpointTypedInstance = new ApiEndpointTyped();
export default apiEndpointTypedInstance;
