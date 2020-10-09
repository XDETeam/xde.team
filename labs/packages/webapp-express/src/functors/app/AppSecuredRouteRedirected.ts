import { Functor, PartialObject } from "@xde/flow-manager";

import { APP_TLS_PORT } from "../../config";
import { Aspect } from "../../models/aspects";
import { IHttpRouted } from "../http/HttpRouted";

export class AppSecuredRouteRedirected extends Functor<Aspect> {
	name = "AppSecuredRouteRedirected";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/security/"),
		},
		{
			aspect: Aspect.Secured,
			lambda: (obj: PartialObject<Aspect.Secured, { [Aspect.Secured]?: boolean }>) =>
				obj[Aspect.Secured] === false,
		},
	];
	to = [Aspect.LocationHeader, Aspect.ResponseCode];

	map(obj: { [Aspect.HttpRouted]: IHttpRouted }): {} {
		return {
			...obj,
			[Aspect.LocationHeader]: `https://${obj[Aspect.HttpRouted].hostname}${
				obj[Aspect.HttpRouted].nonStandardPort ? `:${APP_TLS_PORT}` : ""
			}${obj[Aspect.HttpRouted].originalUrl}`,
			[Aspect.ResponseCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
