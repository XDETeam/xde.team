import { THttpStatusCode, HttpStatusCode, HttpRouted, THttpRouted } from "@xde/aspects";
// import { TUndefined } from "@xde/common";
import { PrimitiveFunctor, Undefined } from "@xde/flow-manager";

// TODO: separate 404 json response?
export class App404 extends PrimitiveFunctor<THttpRouted, THttpStatusCode<404>> {
	name = "App404";
	from = [
		// {
		// 	aspect: [HttpStatusCode],
		// 	lambda: Undefined,
		// },
		// {
		// 	aspect: Aspect.EndpointType,
		// 	lambda: (
		// 		obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
		// 	) => obj[Aspect.EndpointType] === EndpointType.Html,
		// },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		HttpRouted,
	];
	to = [HttpStatusCode];

	distinct() {
		return {
			[HttpStatusCode]: 404 as const,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
