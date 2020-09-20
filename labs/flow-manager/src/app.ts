import Debug from "debug";

import { FlowManager } from "./flow/FlowManager";
import admin401ErrorInstance from "./functor/functors/app/admin/Admin401Error";
import adminPanelResponseInstance from "./functor/functors/app/admin/AdminPanelResponse";
import app404ErrorInstance from "./functor/functors/app/App404Error";
import appSecuredRouteAllowedInstance from "./functor/functors/app/AppSecuredRouteAllowed";
import appSecuredRouteRedirectedInstance from "./functor/functors/app/AppSecuredRouteRedirected";
import error401Instance from "./functor/functors/errors/Error401";
import error404Instance from "./functor/functors/errors/Error404";
import httpRedirectInstance from "./functor/functors/http/HttpRedirect";
import httpRendererInstance from "./functor/functors/http/HttpRenderer";
import routedInstance from "./functor/functors/http/Routed";
import securedInstance from "./functor/functors/http/Secured";
import hasAuthInstance from "./functor/functors/security/HasAuth";
import isAdminInstance from "./functor/functors/security/IsAdmin";
import { ITestHttpRequest } from "./models";

const flow = new FlowManager();
flow.register([
	admin401ErrorInstance,
	adminPanelResponseInstance,
	app404ErrorInstance,
	appSecuredRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	error401Instance,
	error404Instance,
	hasAuthInstance,
	httpRedirectInstance,
	httpRendererInstance,
	isAdminInstance,
	routedInstance,
	securedInstance,
]);

// Debug.enable("*");
Debug.enable("app:ObjectFlow:short*");

flow.notify({
	HttpRequest: {
		authCookie: "valid",
		route: "/securit3y/adminPanelRoute",
		isTLS: true,
	} as ITestHttpRequest,
});
// flow.notify({ HttpRequest: { authCookie: "invalid", route: "/fdsfadf" } });
