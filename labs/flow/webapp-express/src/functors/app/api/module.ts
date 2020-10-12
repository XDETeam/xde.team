import { CompositeFunctor, PartialObject, Optional } from "@xde/flow-manager";

import { Aspect } from "../../../models/aspects";
import { EndpointType } from "../../http/HttpEndpointTyped";
import apiBadRequestedInstance from "./ApiBadRequested";
import apiEndpointTypedInstance from "./ApiEndpointTyped";
import apiProcessedSignInRequestedInstance from "./signin/ApiProcessedSignInRequested";
import apiRawSignInRequestedInstance from "./signin/ApiRawSignInRequested";
import apiValidSignInRequestedInstance from "./signin/ApiValidSignInRequested";
import apiRawSignUpRequestedInstance from "./signup/ApiRawSignUpRequested";
import apiValidSignUpRequestedInstance from "./signup/ApiValidSignUpRequested";
import apiProcessedSignUpRequestedInstance from "./signup/ApiProcessedSignUpRequested";
import { IHttpRouted } from "../../http/HttpRouted";

export const api = new CompositeFunctor<Aspect>(
	"api",
	[
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/api/"),
		},
		Aspect.Secured,
	],
	[
		Aspect.GeneratedApiBody,
		{
			aspect: Aspect.EndpointType,
			lambda: (
				obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
			) => obj[Aspect.EndpointType] === EndpointType.Json,
			force: true,
		},
		{ aspect: Aspect.LocationHeader, lambda: Optional },
		{ aspect: Aspect.ResponseCode, lambda: Optional },
		{ aspect: Aspect.AdditionalHeaders, lambda: Optional },
	]
);

api.addChildren([
	apiBadRequestedInstance,
	apiEndpointTypedInstance,
	apiRawSignInRequestedInstance,
	apiValidSignInRequestedInstance,
	apiProcessedSignInRequestedInstance,
	apiRawSignUpRequestedInstance,
	apiValidSignUpRequestedInstance,
	apiProcessedSignUpRequestedInstance,
]);
