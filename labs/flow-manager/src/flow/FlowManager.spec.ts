import { FlowManager } from "./FlowManager";
import admin401ErrorInstance from "../functor/functors/app/Admin401Error";
import adminPanelResponseInstance from "../functor/functors/app/AdminPanelResponse";
import app404ErrorInstance from "../functor/functors/app/App404Error";
import error401Instance from "../functor/functors/errors/Error401";
// TODO: Add to test
import error404Instance from "../functor/functors/errors/Error404";
import httpInstance from "../functor/functors/http/Http";
import httpRendererInstance from "../functor/functors/http/HttpRenderer";
import routedInstance from "../functor/functors/http/Routed";
import hasAuthInstance from "../functor/functors/security/HasAuth";
import isAdminInstance from "../functor/functors/security/IsAdmin";

it("should register functors to the flow manager", () => {
	const flow = new FlowManager();
	flow.register(httpInstance);
	flow.register(httpRendererInstance);
	expect(flow.functors.length).toEqual(2);
});

it("should prevent duplication of registered functors", () => {
	const flow = new FlowManager();
	flow.register(httpInstance);
	expect(() => flow.register(httpInstance)).toThrowError(/duplicate/i);
});

it("should properly deal with hook functors", () => {
	const flow = new FlowManager();
	flow.register(httpInstance);
	flow.register(app404ErrorInstance);
	expect(flow.functors.length).toEqual(1);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should register an array of functors (module)", () => {
	const flow = new FlowManager();
	flow.register([httpInstance, app404ErrorInstance, httpRendererInstance]);
	expect(flow.functors.length).toEqual(2);
	expect(flow.beforeObjectReleaseFunctors.length).toEqual(1);
});

it("should f*cking handle the test app!", () => {
	const flow = new FlowManager();
	flow.register(admin401ErrorInstance);
	flow.register(adminPanelResponseInstance);
	flow.register(error401Instance);
	flow.register(httpInstance);
	flow.register(httpRendererInstance);
	flow.register(routedInstance);
	flow.register(hasAuthInstance);
	flow.register(isAdminInstance);
	flow.notify({ HttpRequest: { authCookie: "valid", route: "/adminPanelRoute" } });
});
