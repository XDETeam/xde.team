import { PrimitiveFunctor, Functor } from "@xde.labs/flow-manager";
import {
	THttpStatusCode,
	HttpStatusCode,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	THttpHeaders,
	TLocationHeader,
	HttpHeaders,
	THttpRedirected,
	HttpRedirected,
} from "@xde.labs/aspects";

export class Code301Redirected extends PrimitiveFunctor<
	TNodejsExpressResponse & THttpStatusCode<301> & THttpHeaders<TLocationHeader>,
	THttpRedirected
> {
	name = "Code301Redirected";
	from = [
		NodejsExpressResponse,
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<301>) => obj[HttpStatusCode] === 301,
		},
		{
			aspect: HttpHeaders,
			lambda: (obj: THttpHeaders<TLocationHeader>) => !!obj[HttpHeaders].Location,
		},
	];
	to = [HttpRedirected];

	distinct(obj: TNodejsExpressResponse & THttpStatusCode<301> & THttpHeaders<TLocationHeader>) {
		obj[NodejsExpressResponse].redirect(obj[HttpStatusCode], obj[HttpHeaders].Location);
		Functor.debugger.extend("Code301Redirected")(`Redirected to ${obj[HttpHeaders].Location}`);
		return {
			[HttpRedirected]: true,
		};
	}
}

const code301RedirectedInstance = new Code301Redirected();
export default code301RedirectedInstance;
