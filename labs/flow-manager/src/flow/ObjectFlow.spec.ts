import { ObjectFlow } from "./ObjectFlow";
import hasAuthInstance from "../functor/functors/security/HasAuth";
import isAdminInstance from "../functor/functors/security/IsAdmin";
import adminPanelResponseInstance from "../functor/functors/app/AdminPanelResponse";
import admin401ErrorInstance from "../functor/functors/app/Admin401Error";
import error401Instance from "../functor/functors/errors/Error401";
import httpRendererInstance from "../functor/functors/http/HttpRenderer";
import routedInstance from "../functor/functors/http/Routed";
import httpInstance from "../functor/functors/http/Http";
import { Aspects } from "../aspects";

it("should register functors to the flow manager", () => {
	const flow = new ObjectFlow({
		HttpRequest: { authCookie: "valid", route: "/adminPanelRoute" },
	});
	flow.move([hasAuthInstance, isAdminInstance]);
	expect(flow.object).toHaveProperty("HttpRequest");
	expect(flow.object).toHaveProperty(hasAuthInstance.produces);
	expect(flow.object).toHaveProperty(isAdminInstance.produces);
});

it("should handle lambda functions", () => {
	const flow = new ObjectFlow({ IsAdmin: true, Routed: "/adminPanelRoute" });
	flow.move([adminPanelResponseInstance, admin401ErrorInstance, error401Instance]);
	expect(flow.object).toHaveProperty(httpRendererInstance.requires);
});

it("should move pass", () => {
	const flow = new ObjectFlow({
		HttpRequest: { authCookie: "valid", route: "/adminPanelRoute" },
	});

	flow.movePass([
		isAdminInstance,
		admin401ErrorInstance,
		error401Instance,
		httpRendererInstance,
		routedInstance,
		hasAuthInstance,
		httpInstance,
	]);
	expect(flow.object).toHaveProperty(Aspects.GeneratedHtml);
});
