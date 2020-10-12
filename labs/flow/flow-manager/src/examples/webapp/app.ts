import Debug from "debug";

import { ITestHttpRequest } from "./models";
import { CompositeFunctor } from "../../functor/Functor";
import { Aspect } from "../../models";
import { Some } from "../../helpers/lambdas";
import code404HtmlInstance from "./errors/Code404Html";
import httpRoutedInstance from "./http/HttpRouted";
import app404Instance from "./app/App404";
import code401HtmlInstance from "./errors/Code401Html";
import code301RedirectedInstance from "./http/Code301Redirected";
import htmlRendererInstance from "./http/HtmlRenderer";
import admin401Instance from "./app/admin/Admin401";
import adminPanelHtmlInstance from "./app/admin/AdminPanelHtml";
import appAdminRouteAllowedInstance from "./app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./app/AppSecuredRouteRedirected";
import httpHasAuthInstance from "./security/HttpHasAuth";
import httpSecuredInstance from "./http/HttpSecured";

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
	[{ aspect: [Aspect.RenderedHtml, Aspect.Redirected], lambda: Some }]
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
	httpHasAuthInstance,
	httpRoutedInstance,
	httpSecuredInstance,
]);

export const root = new CompositeFunctor<Aspect>("root", [], []);
root.addChildren([basicApp, app404Instance, renderer]);

// Debug.enable("*");
Debug.enable("app:ObjectFlow:short*");
// Debug.enable("app:ObjectFlow:verbose*");

root.map({
	HttpRequest: {
		authCookie: "valid",
		route: "/security/non-existing",
		isTLS: true,
	} as ITestHttpRequest,
	AdminFlag: true,
});
// flow.notify({ HttpRequest: { authCookie: "invalid", route: "/fdsfadf" } });
