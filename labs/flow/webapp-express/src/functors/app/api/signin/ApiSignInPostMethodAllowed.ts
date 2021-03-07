import { PrimitiveFunctor, Exists } from "@xde.labs/flow-manager";
import { HttpRouted, THttpRouted } from "@xde.labs/aspects";

import { TApi405AllowHeaders, Api405AllowHeaders } from "../../../../models/aspects";

export class ApiSignInPostMethodAllowed extends PrimitiveFunctor<THttpRouted, TApi405AllowHeaders> {
	name = "ApiSignInPostMethodAllowed";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) =>
				!!obj[HttpRouted]?.path.startsWith("/api/sign-in") &&
				obj[HttpRouted].method !== "POST",
		},
	];
	to = [
		{
			aspect: Api405AllowHeaders,
			lambda: Exists,
			allowSimultaneous: true,
		},
	];

	distinct() {
		return {
			[Api405AllowHeaders]: ["POST"],
		};
	}
}

const apiSignInPostMethodAllowedInstance = new ApiSignInPostMethodAllowed();
export default apiSignInPostMethodAllowedInstance;
