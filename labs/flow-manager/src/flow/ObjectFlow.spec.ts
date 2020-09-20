import { ObjectFlow } from "./ObjectFlow";
import hasAuthInstance from "../functor/functors/security/HasAuth";
import isAdminInstance from "../functor/functors/security/IsAdmin";
import adminPanelResponseInstance from "../functor/functors/app/admin/AdminPanelResponse";
import admin401ErrorInstance from "../functor/functors/app/admin/Admin401Error";
import error401Instance from "../functor/functors/errors/Error401";
import httpRendererInstance from "../functor/functors/http/HttpRenderer";
import routedInstance from "../functor/functors/http/Routed";
import { Aspects } from "../aspects";
import securedInstance from "../functor/functors/http/Secured";
import appSecuredRouteAllowedInstance from "../functor/functors/app/AppSecuredRouteAllowed";
import { ITestHttpRequest } from "../models";

it("should register functors to the flow manager", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	flow.move([hasAuthInstance, isAdminInstance]);
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(hasAuthInstance.produces);
	expect(flow.object).toHaveProperty(isAdminInstance.produces);
});

it("should handle lambda functions", () => {
	const flow = new ObjectFlow({
		IsAdmin: true,
		Routed: "/security/adminPanelRoute",
		AppSecuredRouteAllowed: true,
	});
	flow.move([adminPanelResponseInstance, admin401ErrorInstance, error401Instance]);
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
		isAdminInstance,
		admin401ErrorInstance,
		error401Instance,
		httpRendererInstance,
		routedInstance,
		hasAuthInstance,
		securedInstance,
	]);
	expect(flow.object).toHaveProperty(Aspects.GeneratedHtml);
});
