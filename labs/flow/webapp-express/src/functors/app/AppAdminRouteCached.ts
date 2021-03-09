import {
	HttpCacheCacheAbility,
	HttpCached,
	HttpCacheRevalidation,
	THttpCached,
	HttpStatusCode,
	THttpStatusCode,
} from "@xde.labs/aspects";
import { TimePeriodSeconds } from "@xde.labs/common";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import { AppAdminRouteAllow, TAppAdminRouteAllowed } from "./AppAdminRouteAllowed";
import { TAppAdminRoute, AppAdminRoute } from "./AppAdminRouted";

export class AppAdminRouteCached extends PrimitiveFunctor<
	TAppAdminRoute & TAppAdminRouteAllowed & THttpStatusCode<200>,
	THttpCached
> {
	name = "AppAdminRouteCached";
	from = [
		AppAdminRoute,
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === true,
		},
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode) => obj[HttpStatusCode] === 200,
		},
	];
	to = [HttpCached];

	distinct() {
		return {
			[HttpCached]: {
				cacheAbility: HttpCacheCacheAbility.Private,
				revalidation: HttpCacheRevalidation.MustRevalidate,
				maxAge: TimePeriodSeconds.Minute * 20,
			},
		};
	}
}

const appAdminRouteCachedInstance = new AppAdminRouteCached();
export default appAdminRouteCachedInstance;

// Cache - route without params and params - current user id, current page etc.
