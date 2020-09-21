import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class AppAdminRouteAllowed extends Functor {
	requires = [
		{ aspect: Aspect.Routed, lambda: (route: string) => route.startsWith("/security/") },
		{ aspect: Aspect.Secured, lambda: (secured: boolean) => secured === true },
	];
	produces = [Aspect.AppAdminRouteAllowed];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.AppAdminRouteAllowed]: Math.random() > 0.5,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
