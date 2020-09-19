import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class AppSecuredRouteRedirected implements IFunctor {
	requires = [
		{ aspect: Aspects.AppSecuredRouteAllowed, lambda: (allowed: boolean) => allowed === false },
		Aspects.Routed,
	];
	produces = [Aspects.LocationHeader, Aspects.ResponseCode];

	move(obj: { [Aspects.Routed]: string }): {} {
		return {
			...obj,
			[Aspects.LocationHeader]: `https://${obj[Aspects.Routed]}`,
			[Aspects.ResponseCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
