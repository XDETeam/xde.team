import {
	THttpRoute,
	THttpSecured,
	HttpSecured,
	HttpRoute,
	HttpHeaders,
	THttpHeaders,
	TLocationHeader,
	THttpStatusCode,
	HttpStatusCode,
	TcpHttpsPort,
	TTcpHttpsPort,
} from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { Optional } from "../../../helpers/lambdas";

type TAppSecuredRouteRedirected = THttpRoute & THttpSecured & Partial<THttpHeaders & TTcpHttpsPort>;

export class AppSecuredRouteRedirected extends PrimitiveFunctor<
	TAppSecuredRouteRedirected,
	THttpHeaders<TLocationHeader> & THttpStatusCode<301>
> {
	name = "AppSecuredRouteRedirected";
	from = [
		{
			aspect: HttpRoute,
			lambda: (obj: THttpRoute) => !!obj[HttpRoute]?.path.startsWith("/security/"),
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
		{
			aspect: TcpHttpsPort,
			lambda: Optional,
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

	distinct(obj: TAppSecuredRouteRedirected) {
		return {
			[HttpHeaders]: {
				...obj[HttpHeaders],
				Location: `https://${obj[HttpRoute].hostname}${
					obj[TcpHttpsPort] ? `:${obj[TcpHttpsPort]}` : ""
				}${obj[HttpRoute].originalUrl}`,
			},
			[HttpStatusCode]: 301 as const,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
