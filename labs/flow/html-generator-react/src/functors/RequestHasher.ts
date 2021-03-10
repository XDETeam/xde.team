import { THttpRouted, HttpRouted } from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import { IDictionary, sha256 } from "@xde.labs/common";

export const RequestHash = "RequestHash" as const;
export type TRequestHash = {
	[RequestHash]: string;
};

/**
 * Additional params to get filename hash from (along with pathname). The smaller - the better.
 * Warning! It's JSON.stringified - should be small to have good perf.
 */
export const RequestHashAdditionalToRouteParameters = "RequestHashAdditionalToRouteParameters" as const;
export type TRequestHashAdditionalToRouteParameters = {
	[RequestHashAdditionalToRouteParameters]: IDictionary;
};

/**
 * To create request hash from provided string instead of path.
 * Useful to cache 404, 401, etc.
 */
export const RequestForceHash = "RequestForceHash" as const;
export type TRequestForceHash = {
	[RequestForceHash]: string;
};

type TRequestHasherFrom = THttpRouted &
	Partial<TRequestHashAdditionalToRouteParameters> &
	Partial<TRequestForceHash>;

export class RequestHasher extends PrimitiveFunctor<TRequestHasherFrom, TRequestHash> {
	name = "RequestHasher";
	from = [
		HttpRouted,
		{ aspect: RequestHashAdditionalToRouteParameters, lambda: Optional },
		{ aspect: RequestForceHash, lambda: Optional },
	];
	to = [RequestHash];

	distinct(obj: TRequestHasherFrom) {
		let hashMe: string = obj[HttpRouted].path;

		const forceHash = obj[RequestForceHash];
		if (forceHash !== undefined) {
			hashMe = forceHash;
		} else if (!!obj[RequestHashAdditionalToRouteParameters]) {
			// Perf!
			hashMe += JSON.stringify(obj[RequestHashAdditionalToRouteParameters]);
		}

		return {
			// TODO: Looks fast, but is there something faster?
			[RequestHash]: sha256(hashMe),
		};
	}
}

const requestHasherInstance = new RequestHasher();
export default requestHasherInstance;
