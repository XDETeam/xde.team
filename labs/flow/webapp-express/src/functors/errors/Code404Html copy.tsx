import {
	THttpStatusCode,
	HttpStatusCode,
	TEndpointType,
	EndpointType,
	Endpoint,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
	TTitled,
	Titled,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Functor } from "@xde.labs/flow-manager";
import { rendererInstance, EsBuilder, Renderer, ICacheTTL } from "@xde/html-generator-react";
import Ooops from "./Ooops";
// import {  } from '../../../../flow-manager/src/functor/Functor';

export class Code404Html extends PrimitiveFunctor<
	THttpStatusCode<404> & TEndpointType,
	THtmlHtmlTagged
> {
	name = "Code404Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<404>) => obj[HttpStatusCode] === 404,
		},
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
	];
	to = [HtmlHtmlTagged];

	async distinct() {
		const mybuilder = new EsBuilder(__dirname, process.cwd());
		const renderer = new Renderer(mybuilder);
		// Functor.debugger.extend("Code404Html")(`${rendererInstance.forStatusCode(404)}`);
		return {
			// [HtmlHtmlTagged]: await rendererInstance.forStatusCode(404),
			[HtmlHtmlTagged]: await renderer.getHtml(
				`import React from "react"; import Ooops from "./Ooops"; ${EsBuilder.INSERT_REACT_ELEMENT}`,
				{
					element: <Ooops />,
					ttl: ICacheTTL.None,
				}
			),
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
