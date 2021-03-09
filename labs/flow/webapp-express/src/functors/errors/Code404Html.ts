import {
	THttpStatusCode,
	HttpStatusCode,
	TEndpointType,
	EndpointType,
	Endpoint,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
	Languaged,
	TLanguaged,
	TProjectNamed,
	ProjectNamed,
	TAuthored,
	Authored,
	TDescribed,
	Described,
	TTitled,
	Titled,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Functor } from "@xde.labs/flow-manager";
import { rendererInstance, EsBuilder, Renderer, ICacheTTL } from "@xde/html-generator-react";

// import {  } from '../../../../flow-manager/src/functor/Functor';

export class Code404Html extends PrimitiveFunctor<
	THttpStatusCode<404> & TEndpointType,
	TTitled & TDescribed & TAuthored & TProjectNamed & TLanguaged
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
	to = [Titled, Described, Authored, ProjectNamed, Languaged];

	distinct() {
		return {
			[Titled]: "My page",
			[Described]: "some description",
			[Authored]: "author name",
			[ProjectNamed]: "Project name",
			[Languaged]: "en-US",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
