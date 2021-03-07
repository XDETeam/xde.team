import {
	THttpRouted,
	HttpRouted,
	THttpSecured,
	HttpSecured,
	HttpHeaders,
	THttpHeaders,
	THttpStatusCode,
	HttpStatusCode,
	TLocationHeader,
} from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

import { APP_TLS_PORT } from "../../config";

export class AppSecuredRouteRedirected extends PrimitiveFunctor<
	THttpRouted & THttpSecured & Partial<THttpHeaders>,
	THttpHeaders<TLocationHeader> & THttpStatusCode<301>
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
		{
			aspect: HttpHeaders,
			lambda: (obj: Partial<THttpHeaders>) =>
				obj[HttpHeaders] === undefined || !("Location" in obj[HttpHeaders]!),
		},
	];
	to = [
		{
			aspect: HttpHeaders,
			lambda: (obj: THttpHeaders<TLocationHeader>) => !!obj[HttpHeaders].Location,
			force: true,
		},
		HttpStatusCode,
	];

	distinct(obj: THttpRouted & Partial<THttpHeaders>) {
		return {
			[HttpHeaders]: {
				...obj[HttpHeaders],
				Location: `https://${obj[HttpRouted].hostname}${
					obj[HttpRouted].nonStandardPort ? `:${APP_TLS_PORT}` : ""
				}${obj[HttpRouted].originalUrl}`,
			},
			[HttpStatusCode]: 301 as const,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
