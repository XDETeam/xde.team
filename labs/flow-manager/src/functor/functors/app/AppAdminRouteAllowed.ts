import { Functor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class AppAdminRouteAllowed extends Functor {
	requires = [
		{ aspect: Aspects.Routed, lambda: (route: string) => route.startsWith("/security/") },
		{ aspect: Aspects.Secured, lambda: (secured: boolean) => secured === true },
	];
	produces = [Aspects.AppAdminRouteAllowed];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.AppAdminRouteAllowed]: Math.random() > 0.5,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
