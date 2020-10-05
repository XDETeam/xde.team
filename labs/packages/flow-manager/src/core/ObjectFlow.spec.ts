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
	expect(flow.object).toHaveProperty(httpHasAuthInstance.to);
	expect(flow.object).toHaveProperty(httpSecuredInstance.to);
});

it("should handle lambda functions", () => {
	const flow = new ObjectFlow({
		HttpRouted: "/security/adminPanelRoute",
		AppAdminRouteAllowed: false,
	});
	flow.move([admin401Instance, code401HtmlInstance]);
	expect(flow.object).toHaveProperty(htmlRendererInstance.from);
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
			[httpSecuredInstance.to[0]]: 42,
		}),
	});
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(httpHasAuthInstance.to);
	expect(flow.object[httpSecuredInstance.to[0]]).toEqual(42);
});

it("should produce an error when resulting object does not have functor to", () => {
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
