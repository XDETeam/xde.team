import { CompositeFunctor, Some, Optional } from "@xde/flow-manager";

import admin401Instance from "./app/admin/Admin401";
import adminPanelHtmlInstance from "./app/admin/AdminPanelHtml";
import app404Instance from "./app/App404";
import appAdminRouteAllowedInstance from "./app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./app/AppSecuredRouteRedirected";
import code401HtmlInstance from "./errors/Code401Html";
import code404HtmlInstance from "./errors/Code404Html";
import code301RedirectedInstance from "./http/Code301Redirected";
import htmlRendererInstance from "./http/HtmlSender";
import httpRoutedInstance from "./http/HttpRouted";
import httpSecuredInstance from "./http/HttpSecured";
import httpUserRoledInstance from "./security/HttpUserRoled";
import { Aspect } from "../models/aspects";
import httpEndedInstance from "./http/HttpEnded";
import { api } from "./app/api/module";
import httpEndpointTypedInstance from "./http/HttpEndpointTyped";
import apiSenderInstance from "./http/ApiSender";

const renderer = new CompositeFunctor<Aspect>(
	"renderer",
	[
		Aspect.HttpResponse,
		{
			aspect: [
				Aspect.ResponseCode,
				Aspect.GeneratedApiBody,
				[Aspect.ResponseCode, Aspect.LocationHeader],
				Aspect.GeneratedHtml,
			],
			lambda: Some,
		},
		{ aspect: Aspect.AdditionalHeaders, lambda: Optional },
	],
	[{ aspect: [Aspect.SentHtml, Aspect.Redirected, Aspect.SentApiResponse], lambda: Some }]
);
renderer.addChildren([
	code404HtmlInstance,
	code401HtmlInstance,
	code301RedirectedInstance,
	htmlRendererInstance,
	apiSenderInstance,
]);

const basicApp = new CompositeFunctor<Aspect>(
	"basicApp",
	[Aspect.HttpRequest],
	[
		Aspect.HttpRouted,
		Aspect.Secured,
		Aspect.UserRoled,
		Aspect.EndpointType,
		{
			aspect: [
				Aspect.HttpRouted,
				[Aspect.LocationHeader, Aspect.ResponseCode],
				Aspect.ResponseCode,
				Aspect.GeneratedHtml,
			],
			lambda: Some,
		},
	]
);
basicApp.addChildren([
	admin401Instance,
	adminPanelHtmlInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	httpUserRoledInstance,
	httpRoutedInstance,
	httpSecuredInstance,
	httpEndpointTypedInstance,
]);

export const root = new CompositeFunctor<Aspect>(
	"root",
	[Aspect.HttpRequest, Aspect.HttpResponse],
	[Aspect.Ended]
);
// app404Instance
root.addChildren([basicApp, renderer, httpEndedInstance, api]);
