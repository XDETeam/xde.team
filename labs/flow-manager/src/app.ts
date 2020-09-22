import Debug from "debug";
import admin401ErrorInstance from "./functors/app/admin/Admin401Error";
import adminPanelResponseInstance from "./functors/app/admin/AdminPanelResponse";
import app404ErrorInstance from "./functors/app/App404Error";
import appAdminRouteAllowedInstance from "./functors/app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./functors/app/AppSecuredRouteRedirected";
import error401Instance from "./functors/errors/Error401";
import error404Instance from "./functors/errors/Error404";
import httpRedirectInstance from "./functors/http/HttpRedirect";
import httpRendererInstance from "./functors/http/HttpRenderer";
import routedInstance from "./functors/http/Routed";
import securedInstance from "./functors/http/Secured";
import hasAuthInstance from "./functors/security/HasAuth";
import { ITestHttpRequest } from "./models";
import { CompositeFunctor } from "./core/Functor";
import { Aspect } from "./core/models";

const renderer = new CompositeFunctor([{ some: [Aspect.ResponseCode, Aspect.GeneratedHtml] }], []);
renderer.addSubFunctors([
	error404Instance,
	error401Instance,
	httpRedirectInstance,
	httpRendererInstance,
]);

const basicApp = new CompositeFunctor([Aspect.HttpRequest], []);
basicApp.addSubFunctors([
	admin401ErrorInstance,
	adminPanelResponseInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	hasAuthInstance,
	routedInstance,
	securedInstance,
]);

export const root = new CompositeFunctor([], []);
root.addSubFunctors([basicApp, app404ErrorInstance, renderer]);

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
