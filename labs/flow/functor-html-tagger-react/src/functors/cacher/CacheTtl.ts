import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import {
	CacheValid,
	TCacheValid,
	HttpCache,
	THttpCache,
	CacheTtlSeconds,
	TCacheTtlSeconds,
} from "@xde.labs/aspects";

import { TimePeriodSeconds } from "@xde.labs/common";

type TCacheTtlFrom = TCacheValid<false> & Partial<THttpCache>;

export class CacheTtl extends PrimitiveFunctor<TCacheTtlFrom, TCacheTtlSeconds> {
	name = "CacheTtl";
	from = [
		{ aspect: CacheValid, lambda: (obj: TCacheValid<false>) => obj[CacheValid] === false },
		{ aspect: HttpCache, lambda: Optional },
	];
	to = [CacheTtlSeconds];

	distinct(obj: TCacheTtlFrom) {
		return {
			[CacheTtlSeconds]: obj[HttpCache]?.maxAge ?? TimePeriodSeconds.Minute * 5,
		};
	}
}

const cacheTtlInstance = new CacheTtl();
export default cacheTtlInstance;
