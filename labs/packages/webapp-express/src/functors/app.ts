import { CompositeFunctor, Some } from "@xde/flow-manager";

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

const renderer = new CompositeFunctor<Aspect>(
	"renderer",
	[
		{
			aspect: [
				Aspect.ResponseCode,
				[Aspect.ResponseCode, Aspect.LocationHeader],
				Aspect.GeneratedHtml,
			],
			lambda: Some,
		},
	],
	[{ aspect: [Aspect.SentHtml, Aspect.Redirected], lambda: Some }]
);
renderer.addChildren([
	code404HtmlInstance,
	code401HtmlInstance,
	code301RedirectedInstance,
	htmlRendererInstance,
]);

const basicApp = new CompositeFunctor<Aspect>(
	"basicApp",
	[Aspect.HttpRequest],
	[
		Aspect.HttpRouted,
		{
			aspect: [
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
]);

export const root = new CompositeFunctor<Aspect>(
	"root",
	[Aspect.HttpRequest, Aspect.HttpResponse],
	[Aspect.Ended]
);
root.addChildren([basicApp, app404Instance, renderer, httpEndedInstance]);
