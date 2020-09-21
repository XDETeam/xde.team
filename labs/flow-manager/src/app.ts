import Debug from "debug";

import { FlowManager } from "./flow/FlowManager";
import admin401ErrorInstance from "./functors/app/admin/Admin401Error";
import adminPanelResponseInstance from "./functors/app/admin/AdminPanelResponse";
import app404ErrorInstance from "./functors/app/App404Error";
import appAdminRouteAllowedInstance from "./functors/app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./functors/app/AppSecuredRouteRedirected";
import error401Instance from "./functors/functors/errors/Error401";
import error404Instance from "./functors/functors/errors/Error404";
import httpRedirectInstance from "./functors/functors/http/HttpRedirect";
import httpRendererInstance from "./functors/functors/http/HttpRenderer";
import routedInstance from "./functors/functors/http/Routed";
import securedInstance from "./functors/functors/http/Secured";
import hasAuthInstance from "./functors/functors/security/HasAuth";
import { ITestHttpRequest } from "./models";
import routeHandledInstance from "./functors/functors/http/RouteHandled";

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
