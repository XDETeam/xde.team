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
import isAdminInstance from "../functor/functors/security/IsAdmin";
import { Aspects } from "../aspects";
import tLSedInstance from "../functor/functors/http/TLSed";
import { ITestHttpRequest } from "../models";

it("should register functors to the flow manager", () => {
	const flow = new FlowManager();
	flow.register(tLSedInstance);
	flow.register(httpRendererInstance);
	expect(flow.functors.length).toEqual(2);
});

it("should prevent duplication of registered functors", () => {
	const flow = new FlowManager();
	flow.register(tLSedInstance);
	expect(() => flow.register(tLSedInstance)).toThrowError(/duplicate/i);
});

it("should properly deal with hook functors", () => {
	const flow = new FlowManager();
	flow.register(tLSedInstance);
	flow.register(app404ErrorInstance);
	expect(flow.functors.length).toEqual(1);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should register an array of functors (module)", () => {
	const flow = new FlowManager();
	flow.register([tLSedInstance, app404ErrorInstance, httpRendererInstance]);
	expect(flow.functors.length).toEqual(2);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should f*cking handle the test app!", () => {
	const flow = new FlowManager();
	flow.register(admin401ErrorInstance);
	flow.register(adminPanelResponseInstance);
	flow.register(error401Instance);
	flow.register(tLSedInstance);
	flow.register(httpRendererInstance);
	flow.register(routedInstance);
	flow.register(hasAuthInstance);
	flow.register(isAdminInstance);
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
	flow.register([tLSedInstance, app404ErrorInstance, error404Instance, httpRendererInstance]);
	expect(flow.isPossible(Aspects.RouteHandled, Aspects.GeneratedHtml)).toEqual(true);
	expect(flow.isPossible(Aspects.TLSed, Aspects.GeneratedHtml)).toEqual(false);
	expect(flow.isPossible(Aspects.GeneratedHtml, Aspects.RenderedHtml)).toEqual(true);
});
