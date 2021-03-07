import { Titled, TTitled, HtmlMainTagged, THtmlMainTagged } from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

export class HtmlMainTagger extends PrimitiveFunctor<TTitled, THtmlMainTagged> {
	name = "HtmlMainTagger";
	from = [Titled];
	to = [HtmlMainTagged];

	distinct(obj: TTitled) {
		return {
			[HtmlMainTagged]: `<main><h1>${obj[Titled]}</h1></main>`,
		};
	}
}

const htmlMainTaggerInstance = new HtmlMainTagger();
export default htmlMainTaggerInstance;
