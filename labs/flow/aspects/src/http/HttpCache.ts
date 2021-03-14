import { TimePeriodSeconds } from "@xde.labs/common";

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

export interface IHttpCache {
	cacheAbility?: HttpCacheCacheAbility;
	maxAge?: TimePeriodSeconds;
	revalidation?: HttpCacheRevalidation;
}

export const HttpCache = "HttpCache" as const;

export type THttpCache = {
	[HttpCache]: IHttpCache;
};

// TODO: // csswizardry.com/2019/03/cache-control-for-civilians/
