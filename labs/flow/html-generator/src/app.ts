import { CompositeFunctor, Optional } from "@xde.labs/flow-manager";
import htmlBodyTaggerInstance from "./functors/HtmlBodyTagger";
import htmlHeadTaggerInstance from "./functors/HtmlHeadTagger";
import htmlHtmlTaggerInstance from "./functors/HtmlHtmlTagger";
import htmlMainTaggerInstance from "./functors/HtmlMainTagger";
import {
	Authored,
	CharSetted,
	Described,
	Endpoint,
	EndpointType,
	HtmlAsideTagged,
	HtmlBodyTagInjected,
	HtmlBodyTagged,
	HtmlFooterTagged,
	HtmlHeadTagInjected,
	HtmlHeadTagged,
	HtmlHeaderTagged,
	HtmlHtmlTagged,
	HtmlMainTagged,
	HtmlNavTagged,
	Languaged,
	ProjectNamed,
	TAuthored,
	TCharSetted,
	TDescribed,
	TEndpointType,
	THtmlAsideTagged,
	THtmlBodyTagInjected,
	THtmlBodyTagged,
	THtmlFooterTagged,
	THtmlHeadTagInjected,
	THtmlHeadTagged,
	THtmlHeaderTagged,
	THtmlHtmlTagged,
	THtmlMainTagged,
	THtmlNavTagged,
	TLanguaged,
	TProjectNamed,
	TTitled,
	Titled,
} from "@xde.labs/aspects";

export type THtmlGeneratorFrom = TEndpointType &
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
			TProjectNamed &
			THtmlHeadTagInjected &
			THtmlBodyTagInjected
	>;

export class HtmlGenerator extends CompositeFunctor<THtmlGeneratorFrom, THtmlHtmlTagged> {
	name = "HtmlGenerator";
	from = [
		Titled,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
		{ aspect: Authored, lambda: Optional },
		{ aspect: CharSetted, lambda: Optional },
		{ aspect: Described, lambda: Optional },
		{ aspect: HtmlAsideTagged, lambda: Optional },
		{ aspect: HtmlBodyTagInjected, lambda: Optional },
		{ aspect: HtmlBodyTagged, lambda: Optional },
		{ aspect: HtmlFooterTagged, lambda: Optional },
		{ aspect: HtmlHeadTagInjected, lambda: Optional },
		{ aspect: HtmlHeadTagged, lambda: Optional },
		{ aspect: HtmlHeaderTagged, lambda: Optional },
		{ aspect: HtmlMainTagged, lambda: Optional },
		{ aspect: HtmlNavTagged, lambda: Optional },
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
