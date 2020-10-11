import { ITestHttpRequest } from "./models";
import { CompositeFunctor } from "../../functor/Functor";
import { Aspect } from "../../models";
import { Some } from "../../helpers/lambdas";
import code404HtmlInstance from "./errors/Code404Html";
import httpRoutedInstance from "./http/HttpRouted";
import app404Instance from "./app/App404";
import code401HtmlInstance from "./errors/Code401Html";
import code301RedirectedInstance from "./http/Code301Redirected";
import htmlRendererInstance from "./http/HtmlRenderer";
import admin401Instance from "./app/admin/Admin401";
import adminPanelHtmlInstance from "./app/admin/AdminPanelHtml";
import appAdminRouteAllowedInstance from "./app/AppAdminRouteAllowed";
import appSecuredRouteRedirectedInstance from "./app/AppSecuredRouteRedirected";
import httpHasAuthInstance from "./security/HttpHasAuth";
import httpSecuredInstance from "./http/HttpSecured";

const renderer = new CompositeFunctor<Aspect>(
	"renderer",
	[
		{
			aspect: [
				Aspect.ResponseCode,
				[Aspect.ResponseCode, Aspect.LocationHeader],
				Aspect.GeneratedHtml,
			],
			lambda: Some,
		},
	],
	[{ aspect: [Aspect.RenderedHtml, Aspect.Redirected], lambda: Some }]
);
renderer.addChildren([
	code404HtmlInstance,
	code401HtmlInstance,
	code301RedirectedInstance,
	htmlRendererInstance,
]);

const basicApp = new CompositeFunctor<Aspect>(
	"basicApp",
	[Aspect.HttpRequest],
	[
		{
			aspect: [
				Aspect.HttpRouted,
				[Aspect.LocationHeader, Aspect.ResponseCode],
				Aspect.ResponseCode,
				Aspect.GeneratedHtml,
			],
			lambda: Some,
		},
	]
);
basicApp.addChildren([
	admin401Instance,
	adminPanelHtmlInstance,
	appAdminRouteAllowedInstance,
	appSecuredRouteRedirectedInstance,
	httpHasAuthInstance,
	httpRoutedInstance,
	httpSecuredInstance,
]);

export const root = new CompositeFunctor<Aspect>("root", [], []);
root.addChildren([basicApp, app404Instance, renderer]);

const httpRequest: ITestHttpRequest = {
	authCookie: "valid",
	route: "/security/adminPanelRoute",
	isTLS: true,
};

it("should return 401 on admin route for non-admin", async () => {
	const res = await root.map({
		HttpRequest: httpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			HttpRouted: "/security/adminPanelRoute",
			Secured: true,
			AppAdminRouteAllowed: false,
			ResponseCode: 401,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 401 on non-existing security route for non-admin", async () => {
	const res = await root.map({
		HttpRequest: {
			...httpRequest,
			route: "/security/non-existing",
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			HttpRouted: "/security/non-existing",
			Secured: true,
			AppAdminRouteAllowed: false,
			ResponseCode: 401,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 301 on security route without tls for non-admin", async () => {
	const res = await root.map({
		HttpRequest: {
			...httpRequest,
			isTLS: false,
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			HttpRouted: "/security/adminPanelRoute",
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

it("should return 301 on security route without tls for admin", async () => {
	const res = await root.map({
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
			HttpRouted: "/security/non-existing",
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

it("should show admin panel for valid admin request", async () => {
	const res = await root.map({
		HttpRequest: httpRequest,
		AdminFlag: true,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			HttpRouted: "/security/adminPanelRoute",
			Secured: true,
			AppAdminRouteAllowed: true,
			GeneratedHtml: "<div>secret dashboard</div>",
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.Redirected);
	expect(res).not.toHaveProperty(Aspect.LocationHeader);
});

it("should return 404 for non-existing admin route for admin user", async () => {
	const res = await root.map({
		HttpRequest: {
			...httpRequest,
			route: "/security/non-existing",
		} as ITestHttpRequest,
		AdminFlag: true,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: true,
			HttpRouted: "/security/non-existing",
			Secured: true,
			AppAdminRouteAllowed: true,
			ResponseCode: 404,
			GeneratedHtml: expect.any(String),
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.Redirected);
});

it("should return 404 on any non-existing route for any user", async () => {
	const res = await root.map({
		HttpRequest: {
			...httpRequest,
			authCookie: "",
			route: "/non-existing/adminPanelRoute",
		} as ITestHttpRequest,
	});
	expect(res).toEqual(
		expect.objectContaining({
			HasAuth: false,
			HttpRouted: "/non-existing/adminPanelRoute",
			Secured: true,
			ResponseCode: 404,
			GeneratedHtml: "<div>404 page</div>",
			RenderedHtml: true,
		})
	);
	expect(res).not.toHaveProperty(Aspect.AppAdminRouteAllowed);
	expect(res).not.toHaveProperty(Aspect.Redirected);
});
