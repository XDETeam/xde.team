import { Functor, Optional, PartialObject } from "@xde/flow-manager";
import { Response } from "express";

import { Aspect } from "../../models/aspects";
import { EndpointType } from "./HttpEndpointTyped";

export class ApiSender extends Functor<Aspect> {
	name = "ApiSender";
	from = [
		Aspect.HttpResponse,
		Aspect.GeneratedApiBody,
		{
			aspect: Aspect.EndpointType,
			lambda: (
				obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
			) => obj[Aspect.EndpointType] === EndpointType.Json,
		},
		{ aspect: Aspect.LocationHeader, lambda: Optional },
		{ aspect: Aspect.ResponseCode, lambda: Optional },
		{ aspect: Aspect.AdditionalHeaders, lambda: Optional },
	];
	to = [Aspect.SentApiResponse];

	map(obj: {
		[Aspect.HttpResponse]: Response;
		[Aspect.GeneratedApiBody]: {};
		[Aspect.LocationHeader]?: string;
		[Aspect.ResponseCode]?: number;
		[Aspect.AdditionalHeaders]?: {};
	}) {
		obj[Aspect.HttpResponse].status(obj[Aspect.ResponseCode] ?? 200);

		const additionalHeaders = obj[Aspect.AdditionalHeaders];
		if (additionalHeaders) {
			obj[Aspect.HttpResponse].header(additionalHeaders);
		}

		const location = obj[Aspect.LocationHeader];
		if (location) {
			obj[Aspect.HttpResponse].location(location);
		}

		obj[Aspect.HttpResponse].json(obj[Aspect.GeneratedApiBody]);

		return {
			...obj,
			[Aspect.SentApiResponse]: true,
		};
	}
}

const apiSenderInstance = new ApiSender();
export default apiSenderInstance;
