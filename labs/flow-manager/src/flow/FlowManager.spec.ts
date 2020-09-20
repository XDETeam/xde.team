import { FlowManager } from "./FlowManager";
import admin401ErrorInstance from "../functor/functors/app/admin/Admin401Error";
import adminPanelResponseInstance from "../functor/functors/app/admin/AdminPanelResponse";
import app404ErrorInstance from "../functor/functors/app/App404Error";
import error401Instance from "../functor/functors/errors/Error401";
// TODO: Add to test
import error404Instance from "../functor/functors/errors/Error404";
import httpRendererInstance from "../functor/functors/http/HttpRenderer";
import routedInstance from "../functor/functors/http/Routed";
import hasAuthInstance from "../functor/functors/security/HasAuth";
import { Aspects } from "../aspects";
import securedInstance from "../functor/functors/http/Secured";
import { ITestHttpRequest } from "../models";

it("should register functors to the flow manager", () => {
	const flow = new FlowManager();
	flow.register(securedInstance);
	flow.register(httpRendererInstance);
	expect(flow.functors.length).toEqual(2);
});

it("should prevent duplication of registered functors", () => {
	const flow = new FlowManager();
	flow.register(securedInstance);
	expect(() => flow.register(securedInstance)).toThrowError(/duplicate/i);
});

it("should properly deal with hook functors", () => {
	const flow = new FlowManager();
	flow.register(securedInstance);
	flow.register(app404ErrorInstance);
	expect(flow.functors.length).toEqual(1);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should register an array of functors (module)", () => {
	const flow = new FlowManager();
	flow.register([securedInstance, app404ErrorInstance, httpRendererInstance]);
	expect(flow.functors.length).toEqual(2);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should f*cking handle the test app!", () => {
	const flow = new FlowManager();
	flow.register(admin401ErrorInstance);
	flow.register(adminPanelResponseInstance);
	flow.register(error401Instance);
	flow.register(securedInstance);
	flow.register(httpRendererInstance);
	flow.register(routedInstance);
	flow.register(hasAuthInstance);
	flow.notify({
		HttpRequest: {
			authCookie: "valid",
			route: "/security/adminPanelRoute",
			isTLS: true,
		} as ITestHttpRequest,
	});
});

it("should test if it is possible to receive some aspect", () => {
	const flow = new FlowManager();
	flow.register([securedInstance, app404ErrorInstance, error404Instance, httpRendererInstance]);
	expect(flow.isPossible(Aspects.ResponseCode, Aspects.RenderedHtml)).toEqual(true);
	expect(flow.isPossible(Aspects.Secured, Aspects.GeneratedHtml)).toEqual(false);
	expect(flow.isPossible(Aspects.GeneratedHtml, Aspects.RenderedHtml)).toEqual(true);
});
