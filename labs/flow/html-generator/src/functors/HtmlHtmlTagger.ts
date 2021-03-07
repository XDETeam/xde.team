import {
	THtmlBodyTagged,
	HtmlBodyTagged,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
	THtmlHeadTagged,
	HtmlHeadTagged,
	TLanguaged,
	Languaged,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";

type THtmlHtmlTaggerFrom = THtmlHeadTagged & THtmlBodyTagged & Partial<TLanguaged>;

export class HtmlHtmlTagger extends PrimitiveFunctor<THtmlHtmlTaggerFrom, THtmlHtmlTagged> {
	name = "HtmlHtmlTagger";
	from = [HtmlHeadTagged, HtmlBodyTagged, { aspect: Languaged, lambda: Optional }];
	to = [HtmlHtmlTagged];

	distinct(obj: THtmlHtmlTaggerFrom) {
		return {
			[HtmlHtmlTagged]: `<!doctype html><html${
				!!obj[Languaged] ? ` lang="${obj[Languaged]}"` : ""
			}>${obj[HtmlHeadTagged]}${obj[HtmlBodyTagged]}</html>`,
		};
	}
}

const htmlHtmlTaggerInstance = new HtmlHtmlTagger();
export default htmlHtmlTaggerInstance;
