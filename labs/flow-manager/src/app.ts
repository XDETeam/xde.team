import { FlowManager } from "./flow/FlowManager";
import admin401ErrorInstance from "./functor/functors/app/Admin401Error";
import adminPanelResponseInstance from "./functor/functors/app/AdminPanelResponse";
import error401Instance from "./functor/functors/errors/Error401";
import httpInstance from "./functor/functors/http/Http";
import httpRendererInstance from "./functor/functors/http/HttpRenderer";
import routedInstance from "./functor/functors/http/Routed";
import hasAuthInstance from "./functor/functors/security/HasAuth";
import isAdminInstance from "./functor/functors/security/IsAdmin";
import app404ErrorInstance from "./functor/functors/app/App404Error";
import error404Instance from "./functor/functors/errors/Error404";

const flow = new FlowManager();
flow.register(admin401ErrorInstance);
flow.register(adminPanelResponseInstance);
flow.register(error401Instance);
flow.register(httpInstance);
flow.register(httpRendererInstance);
flow.register(routedInstance);
flow.register(hasAuthInstance);
flow.register(isAdminInstance);
flow.register(app404ErrorInstance);
flow.register(error404Instance);

flow.notify({ HttpRequest: { authCookie: "valid", route: "/adminPanelRoute" } });
// flow.notify({ HttpRequest: { authCookie: "invalid", route: "/fdsfadf" } });
