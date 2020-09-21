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
import { Aspect, AspectsState } from "./core/models";

const initialApp = new CompositeFunctor([Aspect.HttpRequest], []);
initialApp.addSubFunctors([
	admin401ErrorInstance,
	adminPanelResponseInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	hasAuthInstance,
	routedInstance,
	securedInstance,
]);

const renderer = new CompositeFunctor(
	[{ aspects: [Aspect.ResponseCode, Aspect.GeneratedHtml], are: AspectsState.SomeTruthy }],
	[]
);
renderer.addSubFunctors([
	error404Instance,
	error401Instance,
	httpRedirectInstance,
	httpRendererInstance,
]);

const root = new CompositeFunctor([], []);
root.addSubFunctors([initialApp, app404ErrorInstance, renderer]);

const httpRequest: ITestHttpRequest = {
	authCookie: "valid",
	route: "/security/adminPanelRoute",
	isTLS: true,
};

it("should return 401 on admin route for non-admin", () => {
	const res = root.move({
		HttpRequest: httpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/adminPanelRoute",
			Secured: true,
			AppAdminRouteAllowed: false,
			ResponseCode: 401,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 401 on non-existing security route for non-admin", () => {
	const res = root.move({
		HttpRequest: {
			...httpRequest,
			route: "/security/non-existing",
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/non-existing",
			Secured: true,
			AppAdminRouteAllowed: false,
			ResponseCode: 401,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 301 on security route without tls for non-admin", () => {
	const res = root.move({
		HttpRequest: {
			...httpRequest,
			isTLS: false,
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/adminPanelRoute",
			Secured: false,
			LocationHeader: "https:///security/adminPanelRoute",
			ResponseCode: 301,
			Redirected: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.AppAdminRouteAllowed);
	expect(res).not.toHaveProperty(Aspect.GeneratedHtml);
	expect(res).not.toHaveProperty(Aspect.RenderedHtml);
});

it("should return 301 on security route without tls for admin", () => {
	const res = root.move({
		HttpRequest: {
			...httpRequest,
			route: "/security/non-existing",
			isTLS: false,
		} as ITestHttpRequest,
		AdminFlag: true,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/non-existing",
			Secured: false,
			LocationHeader: "https:///security/non-existing",
			ResponseCode: 301,
			Redirected: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.AppAdminRouteAllowed);
	expect(res).not.toHaveProperty(Aspect.GeneratedHtml);
	expect(res).not.toHaveProperty(Aspect.RenderedHtml);
});

it("should show admin panel for valid admin request", () => {
	const res = root.move({
		HttpRequest: httpRequest,
		AdminFlag: true,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/adminPanelRoute",
			Secured: true,
			AppAdminRouteAllowed: true,
			GeneratedHtml: "<div>secret dashboard</div>",
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.Redirected);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 404 for non-existing admin route for admin user", () => {
	const res = root.move({
		HttpRequest: {
			...httpRequest,
			route: "/security/non-existing",
		} as ITestHttpRequest,
		AdminFlag: true,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			Routed: "/security/non-existing",
			Secured: true,
			AppAdminRouteAllowed: true,
			ResponseCode: 404,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.Redirected);
});

it("should return 404 on any non-existing route for any user", () => {
	const res = root.move({
		HttpRequest: {
			...httpRequest,
			authCookie: "",
			route: "/non-existing/adminPanelRoute",
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: false,
			Routed: "/non-existing/adminPanelRoute",
			Secured: true,
			ResponseCode: 404,
			GeneratedHtml: "<div>404 page</div>",
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.AppAdminRouteAllowed);
	expect(res).not.toHaveProperty(Aspect.Redirected);
});
