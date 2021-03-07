import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import {
	NodejsExpressRequest,
	TNodejsExpressRequest,
	HttpSecured as HttpSecuredAspect,
	THttpSecured,
} from "@xde.labs/aspects";

export class HttpSecured extends PrimitiveFunctor<TNodejsExpressRequest, THttpSecured> {
	name = "HttpSecured";
	from = [NodejsExpressRequest];
	to = [HttpSecuredAspect];

	distinct(obj: TNodejsExpressRequest) {
		return {
			[HttpSecuredAspect]: obj[NodejsExpressRequest].secure,
		};
	}
}

const httpSecuredInstance = new HttpSecured();
export default httpSecuredInstance;
