import {
	THtmlTagBody,
	HtmlTagBody,
	THtmlTagHtml,
	HtmlTagHtml,
	THtmlTagHead,
	HtmlTagHead,
	TLanguage,
	Language,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";

type THtmlHtmlTaggerFrom = THtmlTagHead & THtmlTagBody & Partial<TLanguage>;

export class HtmlHtmlTagger extends PrimitiveFunctor<THtmlHtmlTaggerFrom, THtmlTagHtml> {
	name = "HtmlHtmlTagger";
	from = [HtmlTagHead, HtmlTagBody, { aspect: Language, lambda: Optional }];
	to = [HtmlTagHtml];

	distinct(obj: THtmlHtmlTaggerFrom) {
		return {
			[HtmlTagHtml]: `<!doctype html><html${
				!!obj[Language] ? ` lang="${obj[Language]}"` : ""
			}>${obj[HtmlTagHead]}${obj[HtmlTagBody]}</html>`,
		};
	}
}

const htmlHtmlTaggerInstance = new HtmlHtmlTagger();
export default htmlHtmlTaggerInstance;
