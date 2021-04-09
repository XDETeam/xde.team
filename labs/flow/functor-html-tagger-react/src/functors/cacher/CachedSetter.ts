import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import {
	CacheValid,
	TCacheValid,
	HtmlTagHtml,
	THtmlTagHtml,
	HttpCache,
	THttpCache,
} from "@xde.labs/aspects";

import { RequestHash, TRequestHash } from "../RequestHasher";
import { appCache } from "./node-cache";
import { TimePeriodSeconds } from "@xde.labs/common";

type TCachedSetterFrom = TRequestHash & THtmlTagHtml & TCacheValid<false> & Partial<THttpCache>;

export class CachedSetter extends PrimitiveFunctor<TCachedSetterFrom, TCacheValid<true>> {
	name = "CachedSetter";
	from = [
		RequestHash,
		HtmlTagHtml,
		{ aspect: HttpCache, lambda: Optional },
		{ aspect: CacheValid, lambda: (obj: TCacheValid<false>) => obj[CacheValid] === false },
	];
	to = [
		{
			aspect: CacheValid,
			lambda: (obj: TCacheValid<true>) => obj[CacheValid] === true,
			force: true,
		},
	];

	distinct(obj: TCachedSetterFrom) {
		// TODO:
		const ttl = obj[HttpCache]?.maxAge ?? TimePeriodSeconds.Minute * 10;

		const cached = appCache.set<string>(obj[RequestHash], obj[HtmlTagHtml], ttl);

		return {
			[CacheValid]: true as const,
		};
	}
}

const cachedSetterInstance = new CachedSetter();
export default cachedSetterInstance;
