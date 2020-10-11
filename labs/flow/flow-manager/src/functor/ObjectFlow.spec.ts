import { ITestHttpRequest } from "../examples/webapp/models";
import { ObjectFlow } from "./ObjectFlow";
import httpHasAuthInstance from "../examples/webapp/security/HttpHasAuth";
import admin401Instance from "../examples/webapp/app/admin/Admin401";
import code401HtmlInstance from "../examples/webapp/errors/Code401Html";
import htmlRendererInstance from "../examples/webapp/http/HtmlRenderer";
import httpSecuredInstance from "../examples/webapp/http/HttpSecured";

it("should handle simple flow", async () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	await flow.process([httpHasAuthInstance, httpSecuredInstance]);
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(httpHasAuthInstance.to);
	expect(flow.object).toHaveProperty(httpSecuredInstance.to);
});

it("should handle lambda functions", async () => {
	const flow = new ObjectFlow({
		HttpRouted: "/security/adminPanelRoute",
		AppAdminRouteAllowed: false,
	});
	await flow.process([admin401Instance, code401HtmlInstance]);
	expect(flow.object).toHaveProperty(htmlRendererInstance.from);
});

it("should handle replacements of map functions", async () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
	await flow.process([httpHasAuthInstance, httpSecuredInstance], {
		[httpSecuredInstance.name]: (obj) => ({
			...obj,
			[httpSecuredInstance.to[0]]: 42,
		}),
	});
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(httpHasAuthInstance.to);
	expect(flow.object[httpSecuredInstance.to[0]]).toEqual(42);
});

it("should produce an error when resulting object does not have functor to", async () => {
	const flow = new ObjectFlow({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});

	await expect(
		flow.process([httpHasAuthInstance, httpSecuredInstance], {
			[httpSecuredInstance.name]: (obj) => ({
				...obj,
				Key: 42,
			}),
		})
	).rejects.toThrow(/validation failed/i);
});
