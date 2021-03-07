import { PrimitiveFunctor, Some } from "@xde.labs/flow-manager";
import {
	NodejsExpressResponse,
	TNodejsExpressResponse,
	TSentHtml,
	SentHtml,
	SentApiResponse,
	TSentApiResponse,
	HttpEnded as HttpEndedAspect,
	THttpEnded,
} from "@xde.labs/aspects";

export class HttpEnded extends PrimitiveFunctor<
	TNodejsExpressResponse & (TSentHtml | TSentApiResponse),
	THttpEnded
> {
	name = "HttpEnded";
	from = [{ aspect: [SentHtml, SentApiResponse], lambda: Some }, NodejsExpressResponse];
	to = [HttpEndedAspect];

	distinct(obj: TNodejsExpressResponse) {
		obj[NodejsExpressResponse].end();

		return {
			[HttpEndedAspect]: true,
		};
	}
}

const httpEndedInstance = new HttpEnded();
export default httpEndedInstance;
