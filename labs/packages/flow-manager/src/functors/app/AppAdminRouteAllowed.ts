import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class AppAdminRouteAllowed extends Functor {
	name = "AppAdminRouteAllowed";
	requires = [
		{ aspect: Aspect.HttpRouted, lambda: (route: string) => route.startsWith("/security/") },
		{ aspect: Aspect.Secured, lambda: (secured: boolean) => secured === true },
	];
	produces = [Aspect.AppAdminRouteAllowed];

	move(obj: {}): {} {
		Functor.debugger.extend("AppAdminRouteAllowed")("Set AdminFlag to any to pass");
		return {
			...obj,
			[Aspect.AppAdminRouteAllowed]: "AdminFlag" in obj,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
