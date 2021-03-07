import { CompositeFunctor, Some, Optional } from "@xde.labs/flow-manager";
import {
	NodejsExpressRequest,
	TNodejsExpressRequest,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	SentHtml,
	HttpRedirected,
	SentApiResponse,
	TSentHtml,
	THttpRedirected,
	TSentApiResponse,
	THttpEnded,
	HttpEnded,
	VisitorRoled,
	TVisitorRoled,
	HttpHeaders,
	THttpHeaders,
	THttpStatusCode,
	HttpStatusCode,
	GeneratedApiBody,
	TGeneratedApiBody,
	HtmlHtmlTagged,
	THtmlHtmlTagged,
	TLocationHeader,
	HttpRouted,
	THttpRouted,
	HttpSecured,
	THttpSecured,
	EndpointType,
	TEndpointType,
} from "@xde.labs/aspects";
import { htmlGenerator } from "@xde.labs/html-generator";

import admin401Instance from "./app/admin/Admin401";
import adminPanelHtmlInstance from "./app/admin/AdminPanelHtml";
import appHtml404Instance from "./app/AppHtml404";
import appAdminRouteAllowedInstance from "./app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./app/AppSecuredRouteRedirected";
import code401HtmlInstance from "./errors/Code401Html";
import code404HtmlInstance from "./errors/Code404Html";
import code301RedirectedInstance from "./http/Code301Redirected";
import htmlRendererInstance from "./http/HtmlSender";
import httpRoutedInstance from "./http/HttpRouted";
import httpSecuredInstance from "./http/HttpSecured";
import httpVisitorRoledInstance from "./security/HttpVisitorRoled";
import httpEndedInstance from "./http/HttpEnded";
import { api } from "./app/api/module";
import httpEndpointTypedInstance from "./http/HttpEndpointTyped";
import apiSenderInstance from "./http/ApiSender";
import appJson404Instance from "./app/api/AppJson404";

export class Renderer extends CompositeFunctor<
	TNodejsExpressResponse &
		Partial<THttpHeaders> &
		(
			| THttpStatusCode
			| TGeneratedApiBody
			| THtmlHtmlTagged
			| (THttpHeaders<TLocationHeader> & THttpStatusCode)
		),
	TSentHtml | THttpRedirected | TSentApiResponse
> {
	name = "renderer";
	from = [
		NodejsExpressResponse,
		{
			aspect: [
				[HttpStatusCode],
				[GeneratedApiBody],
				// TODO: Http location header
				[HttpStatusCode, HttpHeaders],
				[HtmlHtmlTagged],
			],
			lambda: Some,
		},
		{ aspect: HttpHeaders, lambda: Optional },
	];
	to = [{ aspect: [SentHtml, HttpRedirected, SentApiResponse], lambda: Some }];
}
const renderer = new Renderer();
renderer.addChildren([
	code404HtmlInstance,
	code401HtmlInstance,
	code301RedirectedInstance,
	htmlRendererInstance,
	apiSenderInstance,
	htmlGenerator,
]);

export class BasicApp extends CompositeFunctor<
	TNodejsExpressRequest,
	THttpRouted &
		THttpSecured &
		TVisitorRoled &
		TEndpointType &
		(THttpRouted | THtmlHtmlTagged | THttpStatusCode | (THttpStatusCode & THttpHeaders))
> {
	name = "BasicApp";
	from = [NodejsExpressRequest];
	to = [
		HttpRouted,
		HttpSecured,
		VisitorRoled,
		EndpointType,
		{
			aspect: [
				[HttpRouted],
				// TODO: Http location header
				[HttpStatusCode, HttpHeaders],
				[HttpStatusCode],
				[HtmlHtmlTagged],
			],
			lambda: Some,
		},
	];
}
const basicApp = new BasicApp();

basicApp.addChildren([
	admin401Instance,
	adminPanelHtmlInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	httpVisitorRoledInstance,
	httpRoutedInstance,
	httpSecuredInstance,
	httpEndpointTypedInstance,
]);

export class Root extends CompositeFunctor<
	TNodejsExpressRequest & TNodejsExpressResponse,
	THttpEnded
> {
	name = "Root";
	from = [NodejsExpressRequest, NodejsExpressResponse];
	to = [HttpEnded];
}
export const root = new Root();

export class BasicAppAndApi extends CompositeFunctor<
	TNodejsExpressRequest & TNodejsExpressResponse,
	TEndpointType &
		THttpRouted &
		THttpSecured &
		TVisitorRoled &
		Partial<THttpHeaders> &
		(
			| (TGeneratedApiBody & THttpStatusCode)
			| TEndpointType
			| THtmlHtmlTagged
			| THttpStatusCode
			| (THttpStatusCode & THttpHeaders)
		)
> {
	name = "BasicAppAndApi";
	from = [NodejsExpressRequest, NodejsExpressResponse];
	to = [
		EndpointType,
		HttpRouted,
		HttpSecured,
		VisitorRoled,
		{
			aspect: [
				[GeneratedApiBody, HttpStatusCode],
				[HttpStatusCode, HttpHeaders],
				[HttpStatusCode],
				[HtmlHtmlTagged],
				[EndpointType],
			],
			lambda: Some,
		},
		{ aspect: HttpHeaders, lambda: Optional },
	];
}
export const basicAppAndApi = new BasicAppAndApi();
basicAppAndApi.addChildren([basicApp, api]);

root.addChildren([
	basicAppAndApi,
	renderer,
	appHtml404Instance,
	appJson404Instance,
	httpEndedInstance,
]);
