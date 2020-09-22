import Debug from "debug";
import admin401Instance from "./functors/app/admin/Admin401";
import adminPanelHtmlInstance from "./functors/app/admin/AdminPanelHtml";
import app404Instance from "./functors/app/App404";
import appAdminRouteAllowedInstance from "./functors/app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./functors/app/AppSecuredRouteRedirected";
import code401HtmlInstance from "./functors/errors/Code401Html";
import code404HtmlInstance from "./functors/errors/Code404Html";
import code301RedirectedInstance from "./functors/http/Code301Redirected";
import htmlRendererInstance from "./functors/http/HtmlRenderer";
import httpRoutedInstance from "./functors/http/HttpRouted";
import httpSecuredInstance from "./functors/http/HttpSecured";
import httpHasAuthInstance from "./functors/security/HttpHasAuth";
import { ITestHttpRequest } from "./models";
import { CompositeFunctor } from "./core/Functor";
import { Aspect } from "./core/models";

const renderer = new CompositeFunctor(
	"renderer",
	[{ some: [Aspect.ResponseCode, Aspect.GeneratedHtml] }],
	[]
);
renderer.addSubFunctors([
	code404HtmlInstance,
	code401HtmlInstance,
	code301RedirectedInstance,
	htmlRendererInstance,
]);

const basicApp = new CompositeFunctor("basicApp", [Aspect.HttpRequest], []);
basicApp.addSubFunctors([
	admin401Instance,
	adminPanelHtmlInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	httpHasAuthInstance,
	httpRoutedInstance,
	httpSecuredInstance,
]);

export const root = new CompositeFunctor("root", [], []);
root.addSubFunctors([basicApp, app404Instance, renderer]);

// Debug.enable("*");
// Debug.enable("app:ObjectFlow:short*");
Debug.enable("app:ObjectFlow:verbose*");

root.move({
	HttpRequest: {
		authCookie: "valid",
		route: "/security/non-existing",
		isTLS: true,
	} as ITestHttpRequest,
	AdminFlag: true,
});
// flow.notify({ HttpRequest: { authCookie: "invalid", route: "/fdsfadf" } });
