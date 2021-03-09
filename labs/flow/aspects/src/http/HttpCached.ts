import { TimePeriodSeconds } from "@xde.labs/common";
export const HttpCached = "HttpCached" as const;

export enum HttpCacheCacheAbility {
	Public = "public",
	Private = "private",
	NoCache = "no-cache",
	NoStore = "no-store",
}

export enum HttpCacheRevalidation {
	MustRevalidate = "must-revalidate",
	ProxyRevalidate = "proxy-revalidate",
	Immutable = "immutable",
}

export interface IHttpCached {
	cacheAbility?: HttpCacheCacheAbility;
	maxAge?: TimePeriodSeconds;
	revalidation?: HttpCacheRevalidation;
}

export type THttpCached = {
	[HttpCached]: IHttpCached;
};

// TODO: // csswizardry.com/2019/03/cache-control-for-civilians/
