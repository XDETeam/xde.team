import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import { ReactRootElementImport, TReactRootElementImport } from "@xde.labs/aspects";
import {
	ReactElementInToTypeScriptCodeInserter,
	TTypeScriptReactCodeWithReactElementPlaceholder,
	TypeScriptReactCodeWithReactElementPlaceholder,
} from "./ReactElementInToTypeScriptCodeInserter";

export class HydrateWithReactElementPlaceholder extends PrimitiveFunctor<
	TReactRootElementImport,
	TTypeScriptReactCodeWithReactElementPlaceholder
> {
	name = "HydrateWithReactElementPlaceholder";
	from = [ReactRootElementImport];
	to = [TypeScriptReactCodeWithReactElementPlaceholder];

	async distinct(obj: TReactRootElementImport) {
		return {
			[TypeScriptReactCodeWithReactElementPlaceholder]: `import React from "react";
import ReactDOM from "react-dom";
${obj[ReactRootElementImport]}
ReactDOM.hydrate(${ReactElementInToTypeScriptCodeInserter.elementPlaceholder}, document.getElementById("root"));
`,
		};
	}
}

const hydrateWithReactElementPlaceholderInstance = new HydrateWithReactElementPlaceholder();
export default hydrateWithReactElementPlaceholderInstance;
