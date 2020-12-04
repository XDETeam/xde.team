import {
	THttpRouted,
	THttpSecured,
	HttpSecured,
	HttpRouted,
	HttpHeaders,
	THttpHeaders,
	TLocationHeader,
	THttpStatusCode,
	HttpStatusCode,
} from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

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

	distinct(
		obj: THttpRouted & Partial<THttpHeaders>
	): THttpHeaders<TLocationHeader> & THttpStatusCode<301> {
		return {
			[HttpHeaders]: {
				...obj[HttpHeaders],
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
