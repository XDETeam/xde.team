import Debug from "debug";

import { FlowManager } from "./flow/FlowManager";
import admin401ErrorInstance from "./functor/functors/app/admin/Admin401Error";
import adminPanelResponseInstance from "./functor/functors/app/admin/AdminPanelResponse";
import app404ErrorInstance from "./functor/functors/app/App404Error";
import appAdminRouteAllowedInstance from "./functor/functors/app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./functor/functors/app/AppSecuredRouteRedirected";
import error401Instance from "./functor/functors/errors/Error401";
import error404Instance from "./functor/functors/errors/Error404";
import httpRedirectInstance from "./functor/functors/http/HttpRedirect";
import httpRendererInstance from "./functor/functors/http/HttpRenderer";
import routedInstance from "./functor/functors/http/Routed";
import securedInstance from "./functor/functors/http/Secured";
import hasAuthInstance from "./functor/functors/security/HasAuth";
import { ITestHttpRequest } from "./models";
import routeHandledInstance from "./functor/functors/http/RouteHandled";

const flow = new FlowManager();
flow.register([
	admin401ErrorInstance,
	adminPanelResponseInstance,
	app404ErrorInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	error401Instance,
	error404Instance,
	hasAuthInstance,
	httpRedirectInstance,
	httpRendererInstance,
	routedInstance,
	securedInstance,
	routeHandledInstance,
]);

// Debug.enable("*");
Debug.enable("app:ObjectFlow:short*");

flow.notify({
	HttpRequest: {
		authCookie: "valid",
		route: "/security/adminPanelRoute",
		isTLS: true,
	} as ITestHttpRequest,
});
// flow.notify({ HttpRequest: { authCookie: "invalid", route: "/fdsfadf" } });
