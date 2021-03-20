import {
	THtmlTagAside,
	HtmlTagAside,
	THtmlTagBody,
	HtmlTagBody,
	THtmlTagFooter,
	HtmlTagFooter,
	THtmlTagHeader,
	HtmlTagHeader,
	THtmlTagMain,
	HtmlTagMain,
	THtmlTagNav,
	HtmlTagNav,
	THtmlTagInjectionBody,
	HtmlTagInjectionBody,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";

type THtmlBodyTaggerFrom = THtmlTagMain &
	Partial<THtmlTagAside & THtmlTagFooter & THtmlTagHeader & THtmlTagNav & THtmlTagInjectionBody>;

export class HtmlBodyTagger extends PrimitiveFunctor<THtmlBodyTaggerFrom, THtmlTagBody> {
	name = "HtmlBodyTagger";
	from = [
		HtmlTagMain,
		{ aspect: HtmlTagAside, lambda: Optional },
		{ aspect: HtmlTagFooter, lambda: Optional },
		{ aspect: HtmlTagHeader, lambda: Optional },
		{ aspect: HtmlTagNav, lambda: Optional },
		{ aspect: HtmlTagInjectionBody, lambda: Optional },
	];
	to = [HtmlTagBody];

	distinct(obj: THtmlBodyTaggerFrom) {
		/**
		 * <header/>
		 * <nav/>
		 * <aside/>
		 * <main/>
		 * <footer/>
		 */
		return {
			[HtmlTagBody]: `<body>${obj[HtmlTagHeader] ?? ""}${obj[HtmlTagNav] ?? ""}${
				obj[HtmlTagAside] ?? ""
			}${obj[HtmlTagMain]}${obj[HtmlTagFooter] ?? ""}${
				obj[HtmlTagInjectionBody] ?? ""
			}</body>`,
		};
	}
}

const htmlBodyTaggerInstance = new HtmlBodyTagger();
export default htmlBodyTaggerInstance;
