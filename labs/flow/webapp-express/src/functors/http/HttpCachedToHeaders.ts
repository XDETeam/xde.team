import { PrimitiveFunctor, Exists, Optional } from "@xde.labs/flow-manager";
import { THttpCached, HttpCached, THttpHeaders, HttpHeaders } from "@xde.labs/aspects";

export class HttpCachedToHeaders extends PrimitiveFunctor<
	THttpCached & Partial<THttpHeaders>,
	THttpHeaders
> {
	name = "HttpCachedToHeaders";
	from = [HttpCached, { aspect: HttpHeaders, lambda: Optional }];
	to = [{ aspect: HttpHeaders, lambda: Exists, force: true }];

	distinct(obj: THttpCached & Partial<THttpHeaders>) {
		const cacheControl: Array<string | undefined> = [
			obj[HttpCached].cacheAbility,
			obj[HttpCached].maxAge !== undefined ? `max-age=${obj[HttpCached].maxAge}` : undefined,
			obj[HttpCached].revalidation,
		];
		return {
			[HttpHeaders]: {
				...obj[HttpHeaders],
				"Cache-Control": cacheControl.filter((x) => x !== undefined).join(", "),
			},
		};
	}
}

const httpCachedToHeadersInstance = new HttpCachedToHeaders();
export default httpCachedToHeadersInstance;
