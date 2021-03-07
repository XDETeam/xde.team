import {
	TNodejsExpressRequest,
	NodejsExpressRequest,
	TVisitorRoled,
	VisitorRoled,
	VisitorRole,
} from "@xde.labs/aspects";
import { Functor, PrimitiveFunctor } from "@xde.labs/flow-manager";

export const VisitorRoledCookie = "auth";

export class HttpVisitorRoled extends PrimitiveFunctor<TNodejsExpressRequest, TVisitorRoled> {
	name = "HttpVisitorRoled";
	from = [NodejsExpressRequest];
	to = [VisitorRoled];

	distinct(obj: TNodejsExpressRequest) {
		Functor.debugger.extend("HttpHasAuth")(
			`Set ${VisitorRoledCookie} to be one of VisitorRole`
		);

		return {
			[VisitorRoled]:
				obj[NodejsExpressRequest].cookies?.[VisitorRoledCookie] ?? VisitorRole.Visitor,
		};
	}
}

const httpVisitorRoledInstance = new HttpVisitorRoled();
export default httpVisitorRoledInstance;
