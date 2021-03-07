import { CompositeFunctor, Exists, Optional, Some } from "@xde.labs/flow-manager";
import { PriorityInitialWrapper, RePrioritizedWrapper } from "@xde.labs/functors";

import apiBadRequestedInstance from "./ApiBadRequested";
import apiEndpointTypedInstance from "./ApiEndpointTyped";
import apiProcessedSignInRequestedInstance from "./signin/ApiProcessedSignInRequested";
import apiValidSignInRequestedInstance from "./signin/ApiValidSignInRequested";
import apiValidSignUpRequestedInstance from "./signup/ApiValidSignUpRequested";
import apiProcessedSignUpRequestedInstance from "./signup/ApiProcessedSignUpRequested";
import api405Instance from "./Api405";
import apiSignInPostMethodAllowedInstance from "./signin/ApiSignInPostMethodAllowed";
import apiSignUpPostMethodAllowedInstance from "./signup/ApiSignUpPostMethodAllowed";

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
} from "@xde.labs/aspects";

export const priorityWrapper1 = new PriorityInitialWrapper<
	THttpRouted & THttpSecured & Partial<TEndpointType>,
	TEndpointType & Partial<TGeneratedApiBody> & Partial<THttpStatusCode<400>>,
	1
>(
	"PriorityWrapper1",
	[HttpRouted, HttpSecured, { aspect: EndpointType, lambda: Optional }],
	[
		{ aspect: EndpointType, lambda: Exists, force: true },
		{ aspect: GeneratedApiBody, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	],
	1
);
priorityWrapper1.addChildren([apiBadRequestedInstance, apiEndpointTypedInstance]);

export const priorityWrapper2 = new RePrioritizedWrapper<
	THttpRouted & THttpSecured & TEndpointType,
	TGeneratedApiBody & THttpStatusCode,
	1,
	2
>(
	"PriorityWrapper2",
	[HttpRouted, HttpSecured, EndpointType],
	[
		{ aspect: GeneratedApiBody, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	],
	2,
	1
);
priorityWrapper2.addChildren([
	apiSignInPostMethodAllowedInstance,
	apiValidSignInRequestedInstance,
	apiProcessedSignInRequestedInstance,
	apiSignUpPostMethodAllowedInstance,
	apiValidSignUpRequestedInstance,
	apiProcessedSignUpRequestedInstance,
	api405Instance,
]);

export class Api extends CompositeFunctor<
	THttpRouted & THttpSecured & Partial<TEndpointType>,
	TEndpointType & ((THttpStatusCode & TGeneratedApiBody) | TEndpointType) & Partial<THttpHeaders>
> {
	name = "Api";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/api/"),
		},
		HttpSecured,
		{
			aspect: EndpointType,
			lambda: Optional,
		},
	];
	to = [
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Json,
			force: true,
		},
		{
			aspect: [[GeneratedApiBody, HttpStatusCode], [EndpointType]],
			lambda: Some,
		},
		{ aspect: HttpHeaders, lambda: Optional },
	];
}

export const api = new Api();

api.addChildren([priorityWrapper2, priorityWrapper1]);
