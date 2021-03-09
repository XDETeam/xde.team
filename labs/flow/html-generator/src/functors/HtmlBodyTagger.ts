import {
	THtmlAsideTagged,
	HtmlAsideTagged,
	THtmlBodyTagged,
	HtmlBodyTagged,
	THtmlFooterTagged,
	HtmlFooterTagged,
	THtmlHeaderTagged,
	HtmlHeaderTagged,
	THtmlMainTagged,
	HtmlMainTagged,
	THtmlNavTagged,
	HtmlNavTagged,
	THtmlBodyTagInjected,
	HtmlBodyTagInjected,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";

type THtmlBodyTaggerFrom = THtmlMainTagged &
	Partial<
		THtmlAsideTagged &
			THtmlFooterTagged &
			THtmlHeaderTagged &
			THtmlNavTagged &
			THtmlBodyTagInjected
	>;

export class HtmlBodyTagger extends PrimitiveFunctor<THtmlBodyTaggerFrom, THtmlBodyTagged> {
	name = "HtmlBodyTagger";
	from = [
		HtmlMainTagged,
		{ aspect: HtmlAsideTagged, lambda: Optional },
		{ aspect: HtmlFooterTagged, lambda: Optional },
		{ aspect: HtmlHeaderTagged, lambda: Optional },
		{ aspect: HtmlNavTagged, lambda: Optional },
		{ aspect: HtmlBodyTagInjected, lambda: Optional },
	];
	to = [HtmlBodyTagged];

	distinct(obj: THtmlBodyTaggerFrom) {
		/**
		 * <header/>
		 * <nav/>
		 * <aside/>
		 * <main/>
		 * <footer/>
		 */
		return {
			[HtmlBodyTagged]: `<body>${obj[HtmlHeaderTagged] ?? ""}${obj[HtmlNavTagged] ?? ""}${
				obj[HtmlAsideTagged] ?? ""
			}${obj[HtmlMainTagged]}${obj[HtmlFooterTagged] ?? ""}${
				obj[HtmlBodyTagInjected] ?? ""
			}</body>`,
		};
	}
}

const htmlBodyTaggerInstance = new HtmlBodyTagger();
export default htmlBodyTaggerInstance;
