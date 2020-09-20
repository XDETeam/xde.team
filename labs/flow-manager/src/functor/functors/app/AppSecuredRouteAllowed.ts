import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class AppSecuredRouteAllowed implements IFunctor {
	requires = [
		{ aspect: Aspects.Routed, lambda: (route: string) => route.startsWith("/security/") },
		Aspects.Secured,
	];
	produces = [Aspects.AppSecuredRouteAllowed];

	move(obj: { [Aspects.Secured]: boolean }): {} {
		return {
			...obj,
			[Aspects.AppSecuredRouteAllowed]: obj[Aspects.Secured],
		};
	}
}

const appSecuredRouteAllowedInstance = new AppSecuredRouteAllowed();
export default appSecuredRouteAllowedInstance;
