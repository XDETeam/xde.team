import { Optional, PrimitiveFunctor } from "@xde.labs/flow-manager";
import { CacheValid, TCacheValid, HtmlHtmlTagged, THtmlHtmlTagged } from "@xde.labs/aspects";

import { RequestHash, TRequestHash } from "../RequestHasher";
import { appCache } from "./node-cache";

export class CachedValid extends PrimitiveFunctor<
	TRequestHash,
	TCacheValid & Partial<THtmlHtmlTagged>
> {
	name = "CachedValid";
	from = [RequestHash];
	to = [CacheValid, { aspect: HtmlHtmlTagged, lambda: Optional }];

	async distinct(obj: TRequestHash) {
		const cached = appCache.get<string>(obj[RequestHash]);

		if (!!cached) {
			return {
				[CacheValid]: true,
				[HtmlHtmlTagged]: cached,
			};
		} else {
			return {
				[CacheValid]: false,
			};
		}
	}
}

const cachedValidInstance = new CachedValid();
export default cachedValidInstance;
