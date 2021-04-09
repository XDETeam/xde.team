import { Title, TTitle, HtmlTagMain, THtmlTagMain } from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

export class HtmlMainTagger extends PrimitiveFunctor<TTitle, THtmlTagMain> {
	name = "HtmlMainTagger";
	from = [Title];
	to = [HtmlTagMain];

	distinct(obj: TTitle) {
		return {
			[HtmlTagMain]: `<main><h1>${obj[Title]}</h1></main>`,
		};
	}
}

const htmlMainTaggerInstance = new HtmlMainTagger();
export default htmlMainTaggerInstance;
