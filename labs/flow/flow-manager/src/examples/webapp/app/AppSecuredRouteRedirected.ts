import {
	THttpRouted,
	THttpSecured,
	HttpSecured,
	HttpRouted,
	HttpHeaders,
	THttpHeaders,
	THttpStatusCode,
	HttpStatusCode,
} from "@xde/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class AppSecuredRouteRedirected extends PrimitiveFunctor<
	THttpRouted & THttpSecured,
	THttpHeaders & THttpStatusCode
> {
	name = "AppSecuredRouteRedirected";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/security/"),
		},
		{
			aspect: HttpSecured,
			lambda: (obj: THttpSecured) => obj[HttpSecured] === false,
		},
	];
	to = [HttpHeaders, HttpStatusCode];

	distinct(obj: THttpRouted): THttpHeaders & THttpStatusCode {
		return {
			[HttpHeaders]: {
				Location: `https://${obj[HttpRouted].hostname}${
					obj[HttpRouted].nonStandardPort ? `:${obj[HttpRouted].nonStandardPort}` : ""
				}${obj[HttpRouted].originalUrl}`,
			},
			[HttpStatusCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
