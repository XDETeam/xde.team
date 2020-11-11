import { CompositeFunctor, Optional } from "@xde/flow-manager";

import apiBadRequestedInstance from "./ApiBadRequested";
import apiEndpointTypedInstance from "./ApiEndpointTyped";
import apiProcessedSignInRequestedInstance from "./signin/ApiProcessedSignInRequested";
import apiRawSignInRequestedInstance from "./signin/ApiRawSignInRequested";
import apiValidSignInRequestedInstance from "./signin/ApiValidSignInRequested";
import apiRawSignUpRequestedInstance from "./signup/ApiRawSignUpRequested";
import apiValidSignUpRequestedInstance from "./signup/ApiValidSignUpRequested";
import apiProcessedSignUpRequestedInstance from "./signup/ApiProcessedSignUpRequested";
import {
	HttpRouted,
	THttpRouted,
	THttpSecured,
	HttpSecured,
	TGeneratedApiBody,
	GeneratedApiBody,
	EndpointType,
	TEndpointType,
	Endpoint,
	THttpStatusCode,
	HttpStatusCode,
	THttpHeaders,
	HttpHeaders,
} from "@xde/aspects";

export class Api extends CompositeFunctor<
	THttpRouted & THttpSecured,
	TGeneratedApiBody & TEndpointType & Partial<THttpStatusCode> & Partial<THttpHeaders>
> {
	name = "Api";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/"),
		},
		HttpSecured,
	];
	to = [
		GeneratedApiBody,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Json,
			force: true,
		},
		{ aspect: HttpHeaders, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	];
}

export const api = new Api();

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
