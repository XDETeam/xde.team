import { Aspect } from "./models";
import { ObjectFlow } from "./ObjectFlow";
import admin401Instance from "../functors/app/admin/Admin401";
import appAdminRouteAllowedInstance from "../functors/app/AppAdminRouteAllowed";
import { ITestHttpRequest } from "../models";
import httpHasAuthInstance from "../functors/security/HttpHasAuth";
import httpSecuredInstance from "../functors/http/HttpSecured";
import code401HtmlInstance from "../functors/errors/Code401Html";
import htmlRendererInstance from "../functors/http/HtmlRenderer";
import httpRoutedInstance from "../functors/http/HttpRouted";

it("should handle simple flow", () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	flow.move([httpHasAuthInstance, httpSecuredInstance]);
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(httpHasAuthInstance.produces);
	expect(flow.object).toHaveProperty(httpSecuredInstance.produces);
});

it("should handle lambda functions", () => {
	const flow = new ObjectFlow({
		HttpRouted: "/security/adminPanelRoute",
		AppAdminRouteAllowed: false,
	});
	flow.move([admin401Instance, code401HtmlInstance]);
	expect(flow.object).toHaveProperty(htmlRendererInstance.requires);
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
		admin401Instance,
		code401HtmlInstance,
		htmlRendererInstance,
		httpRoutedInstance,
		httpHasAuthInstance,
		httpSecuredInstance,
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
	flow.move([httpHasAuthInstance, httpSecuredInstance], {
		[httpSecuredInstance.name]: (obj) => ({
			...obj,
			[httpSecuredInstance.produces[0]]: 42,
		}),
	});
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(httpHasAuthInstance.produces);
	expect(flow.object[httpSecuredInstance.produces[0]]).toEqual(42);
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
		flow.move([httpHasAuthInstance, httpSecuredInstance], {
			[httpSecuredInstance.name]: (obj) => ({
				...obj,
				Key: 42,
			}),
		})
	).toThrow(/validation failed/i);
});
