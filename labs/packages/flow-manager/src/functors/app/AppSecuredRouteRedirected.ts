import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";
import { PartialObject } from "../../core/helpers/lambdas";

export class AppSecuredRouteRedirected extends Functor {
	name = "AppSecuredRouteRedirected";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: string }>) =>
				!!obj[Aspect.HttpRouted]?.startsWith("/security/"),
		},
		{
			aspect: Aspect.Secured,
			lambda: (obj: PartialObject<Aspect.Secured, { [Aspect.Secured]?: boolean }>) =>
				obj[Aspect.Secured] === false,
		},
	];
	to = [Aspect.LocationHeader, Aspect.ResponseCode];

	move(obj: { [Aspect.HttpRouted]: string }): {} {
		return {
			...obj,
			[Aspect.LocationHeader]: `https://${obj[Aspect.HttpRouted]}`,
			[Aspect.ResponseCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
