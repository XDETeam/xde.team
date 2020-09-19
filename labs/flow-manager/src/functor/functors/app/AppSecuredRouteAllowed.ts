import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class AppSecuredRouteAllowed implements IFunctor {
	requires = [
		{ aspect: Aspects.Routed, lambda: (route: string) => route.startsWith("/security/") },
		Aspects.TLSed,
	];
	produces = [Aspects.AppSecuredRouteAllowed];

	move(obj: { [Aspects.TLSed]: boolean }): {} {
		return {
			...obj,
			[Aspects.AppSecuredRouteAllowed]: obj[Aspects.TLSed],
		};
	}
}

const appSecuredRouteAllowedInstance = new AppSecuredRouteAllowed();
export default appSecuredRouteAllowedInstance;
