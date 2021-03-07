import { PrimitiveFunctor, Exists } from "@xde.labs/flow-manager";
import { HttpRouted, THttpRouted } from "@xde.labs/aspects";

import { TApi405AllowHeaders, Api405AllowHeaders } from "../../../../models/aspects";

export class ApiSignUpPostMethodAllowed extends PrimitiveFunctor<THttpRouted, TApi405AllowHeaders> {
	name = "ApiSignUpPostMethodAllowed";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) =>
				!!obj[HttpRouted]?.path.startsWith("/api/sign-up") &&
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

const apiSignUpPostMethodAllowedInstance = new ApiSignUpPostMethodAllowed();
export default apiSignUpPostMethodAllowedInstance;
