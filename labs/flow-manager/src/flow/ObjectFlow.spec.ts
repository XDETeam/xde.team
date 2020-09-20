import { ObjectFlow } from "./ObjectFlow";
import hasAuthInstance from "../functor/functors/security/HasAuth";
import adminPanelResponseInstance from "../functor/functors/app/admin/AdminPanelResponse";
import admin401ErrorInstance from "../functor/functors/app/admin/Admin401Error";
import error401Instance from "../functor/functors/errors/Error401";
import httpRendererInstance from "../functor/functors/http/HttpRenderer";
import routedInstance from "../functor/functors/http/Routed";
import { Aspects } from "../aspects";
import securedInstance from "../functor/functors/http/Secured";
import appAdminRouteAllowedInstance from "../functor/functors/app/AppAdminRouteAllowed";
import { ITestHttpRequest } from "../models";
import appSecuredRouteRedirectedInstance from "../functor/functors/app/AppSecuredRouteRedirected";

it("should handle simple flow", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	flow.move([hasAuthInstance, securedInstance]);
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(hasAuthInstance.produces);
	expect(flow.object).toHaveProperty(securedInstance.produces);
});

it("should handle lambda functions", () => {
	const flow = new ObjectFlow({
		Routed: "/security/adminPanelRoute",
		AppAdminRouteAllowed: false,
	});
	flow.move([admin401ErrorInstance, error401Instance]);
	expect(flow.object).toHaveProperty(httpRendererInstance.requires);
});

it("should move pass", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});

	flow.movePass([
		appAdminRouteAllowedInstance,
		admin401ErrorInstance,
		error401Instance,
		httpRendererInstance,
		routedInstance,
		hasAuthInstance,
		securedInstance,
	]);
	expect(flow.object).toHaveProperty(Aspects.GeneratedHtml);
});
