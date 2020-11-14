import { CompositeFunctor, Exists, Optional, Some } from "@xde/flow-manager";
import { PrioritizedInitially } from "@xde/functors";

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
	TPriority,
	Priority,
} from "@xde/aspects";

export class PriorityWrapper1 extends CompositeFunctor<
	THttpRouted & THttpSecured & Partial<TEndpointType>,
	TPriority<1> & TEndpointType & Partial<TGeneratedApiBody> & Partial<THttpStatusCode<400>>
> {
	name = "PriorityWrapper1";
	from = [HttpRouted, HttpSecured, { aspect: EndpointType, lambda: Optional }];
	to = [
		Priority,
		{ aspect: EndpointType, lambda: Exists, force: true },
		{ aspect: GeneratedApiBody, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	];
}

export const priorityWrapper1 = new PriorityWrapper1();
priorityWrapper1.addChildren([
	new PrioritizedInitially(1),
	apiBadRequestedInstance,
	apiEndpointTypedInstance,
]);

export class PriorityWrapper2 extends CompositeFunctor<
	THttpRouted & THttpSecured & TEndpointType & TPriority<1>,
	TGeneratedApiBody & THttpStatusCode
> {
	name = "PriorityWrapper2";
	from = [
		HttpRouted,
		HttpSecured,
		EndpointType,
		{ aspect: Priority, lambda: (obj: TPriority) => obj[Priority] === 1 },
	];
	to = [
		{ aspect: GeneratedApiBody, lambda: Optional },
		{ aspect: HttpStatusCode, lambda: Optional },
	];
}

export const priorityWrapper2 = new PriorityWrapper2();
priorityWrapper2.addChildren([
	apiRawSignInRequestedInstance,
	apiValidSignInRequestedInstance,
	apiProcessedSignInRequestedInstance,
	apiRawSignUpRequestedInstance,
	apiValidSignUpRequestedInstance,
	apiProcessedSignUpRequestedInstance,
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
