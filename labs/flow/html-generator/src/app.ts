import { CompositeFunctor, Optional } from "@xde.labs/flow-manager";
import {
	Endpoint,
	EndpointType,
	TEndpointType,
	THtmlAsideTagged,
	HtmlAsideTagged,
	THtmlBodyTagged,
	HtmlBodyTagged,
	THtmlFooterTagged,
	HtmlFooterTagged,
	THtmlHeaderTagged,
	HtmlHeaderTagged,
	THtmlHeadTagged,
	HtmlHeadTagged,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
	THtmlMainTagged,
	HtmlMainTagged,
	THtmlNavTagged,
	HtmlNavTagged,
	TAuthored,
	Authored,
	TDescribed,
	Described,
	TTitled,
	Titled,
	TCharSetted,
	CharSetted,
	TLanguaged,
	Languaged,
	TProjectNamed,
	ProjectNamed,
} from "@xde.labs/aspects";
import htmlBodyTaggerInstance from "./functors/HtmlBodyTagger";
import htmlHeadTaggerInstance from "./functors/HtmlHeadTagger";
import htmlHtmlTaggerInstance from "./functors/HtmlHtmlTagger";
import htmlMainTaggerInstance from "./functors/HtmlMainTagger";

export class HtmlGenerator extends CompositeFunctor<
	TEndpointType &
		TTitled &
		Partial<
			THtmlAsideTagged &
				THtmlBodyTagged &
				THtmlFooterTagged &
				THtmlHeaderTagged &
				THtmlHeadTagged &
				THtmlMainTagged &
				THtmlNavTagged &
				TAuthored &
				TDescribed &
				TCharSetted &
				TLanguaged &
				TProjectNamed
		>,
	THtmlHtmlTagged
> {
	name = "HtmlGenerator";
	from = [
		Titled,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
		{ aspect: HtmlAsideTagged, lambda: Optional },
		{ aspect: HtmlBodyTagged, lambda: Optional },
		{ aspect: HtmlFooterTagged, lambda: Optional },
		{ aspect: HtmlHeaderTagged, lambda: Optional },
		{ aspect: HtmlHeadTagged, lambda: Optional },
		{ aspect: HtmlMainTagged, lambda: Optional },
		{ aspect: HtmlNavTagged, lambda: Optional },
		{ aspect: Authored, lambda: Optional },
		{ aspect: Described, lambda: Optional },
		{ aspect: CharSetted, lambda: Optional },
		{ aspect: Languaged, lambda: Optional },
		{ aspect: ProjectNamed, lambda: Optional },
	];
	to = [HtmlHtmlTagged];
}
export const htmlGenerator = new HtmlGenerator();
htmlGenerator.addChildren([
	htmlBodyTaggerInstance,
	htmlHeadTaggerInstance,
	htmlHtmlTaggerInstance,
	htmlMainTaggerInstance,
]);
