import { CompositeFunctor, Optional } from "@xde.labs/flow-manager";
import htmlBodyTaggerInstance from "./functors/HtmlBodyTagger";
import htmlHeadTaggerInstance from "./functors/HtmlHeadTagger";
import htmlHtmlTaggerInstance from "./functors/HtmlHtmlTagger";
import htmlMainTaggerInstance from "./functors/HtmlMainTagger";
import {
	Author,
	Charset,
	Description,
	Endpoint,
	EndpointType,
	HtmlTagAside,
	HtmlTagInjectionBody,
	HtmlTagBody,
	HtmlTagFooter,
	HtmlTagInjectionHead,
	HtmlTagHead,
	HtmlTagHeader,
	HtmlTagHtml,
	HtmlTagMain,
	HtmlTagNav,
	Language,
	ProjectName,
	TAuthor,
	TCharset,
	TDescription,
	TEndpointType,
	THtmlTagAside,
	THtmlTagInjectionBody,
	THtmlTagBody,
	THtmlTagFooter,
	THtmlTagInjectionHead,
	THtmlTagHead,
	THtmlTagHeader,
	THtmlTagHtml,
	THtmlTagMain,
	THtmlTagNav,
	TLanguage,
	TProjectName,
	TTitle,
	Title,
} from "@xde.labs/aspects";

export type THtmlGeneratorFrom = TEndpointType<Endpoint.Html> &
	TTitle &
	Partial<
		THtmlTagAside &
			THtmlTagBody &
			THtmlTagFooter &
			THtmlTagHeader &
			THtmlTagHead &
			THtmlTagMain &
			THtmlTagNav &
			TAuthor &
			TDescription &
			TCharset &
			TLanguage &
			TProjectName &
			THtmlTagInjectionHead &
			THtmlTagInjectionBody
	>;

export class HtmlGenerator extends CompositeFunctor<THtmlGeneratorFrom, THtmlTagHtml> {
	name = "HtmlGenerator";
	from = [
		Title,
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType<Endpoint.Html>) => obj[EndpointType] === Endpoint.Html,
		},
		{ aspect: Author, lambda: Optional },
		{ aspect: Charset, lambda: Optional },
		{ aspect: Description, lambda: Optional },
		{ aspect: HtmlTagAside, lambda: Optional },
		{ aspect: HtmlTagInjectionBody, lambda: Optional },
		{ aspect: HtmlTagBody, lambda: Optional },
		{ aspect: HtmlTagFooter, lambda: Optional },
		{ aspect: HtmlTagInjectionHead, lambda: Optional },
		{ aspect: HtmlTagHead, lambda: Optional },
		{ aspect: HtmlTagHeader, lambda: Optional },
		{ aspect: HtmlTagMain, lambda: Optional },
		{ aspect: HtmlTagNav, lambda: Optional },
		{ aspect: Language, lambda: Optional },
		{ aspect: ProjectName, lambda: Optional },
	];
	to = [HtmlTagHtml];
}
export const htmlGenerator = new HtmlGenerator();
htmlGenerator.addChildren([
	htmlBodyTaggerInstance,
	htmlHeadTaggerInstance,
	htmlHtmlTaggerInstance,
	htmlMainTaggerInstance,
]);
