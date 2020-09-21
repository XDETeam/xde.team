import { Aspect } from "./models";
import { ObjectFlow } from "./ObjectFlow";
import admin401ErrorInstance from "../functors/app/admin/Admin401Error";
import appAdminRouteAllowedInstance from "../functors/app/AppAdminRouteAllowed";
import error401Instance from "../functors/errors/Error401";
import httpRendererInstance from "../functors/http/HttpRenderer";
import routedInstance from "../functors/http/Routed";
import securedInstance from "../functors/http/Secured";
import hasAuthInstance from "../functors/security/HasAuth";
import { ITestHttpRequest } from "../models";

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
	expect(flow.object).toHaveProperty(Aspect.GeneratedHtml);
});

it("should handle replacements of move functions", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	flow.move([hasAuthInstance, securedInstance], {
		[securedInstance.constructor.name]: (obj) => ({
			...obj,
			[securedInstance.produces[0]]: 42,
		}),
	});
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(hasAuthInstance.produces);
	expect(flow.object[securedInstance.produces[0]]).toEqual(42);
});

it("should produce an error when resulting object does not have functor produces", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});

	expect(() =>
		flow.move([hasAuthInstance, securedInstance], {
			[securedInstance.constructor.name]: (obj) => ({
				...obj,
				Key: 42,
			}),
		})
	).toThrow(/validation failed/i);
});
