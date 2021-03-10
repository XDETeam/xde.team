import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import {
	TypeScriptReactCode,
	TTypeScriptReactCode,
	ReactRootElement,
	TReactRootElement,
} from "@xde.labs/aspects";
import reactElementToJSXString from "react-element-to-jsx-string";

export const TypeScriptReactCodeWithReactElementPlaceholder = "TypeScriptReactCodeWithReactElementPlaceholder" as const;
export type TTypeScriptReactCodeWithReactElementPlaceholder = {
	[TypeScriptReactCodeWithReactElementPlaceholder]: string;
};

export class ReactElementInToTypeScriptCodeInserter extends PrimitiveFunctor<
	TTypeScriptReactCodeWithReactElementPlaceholder & TReactRootElement,
	TTypeScriptReactCode
> {
	static elementPlaceholder: string = "__REACT__ELEMENT__PLACEHOLDER__" as const;

	name = "ReactElementInToTypeScriptCodeInserter";
	from = [TypeScriptReactCodeWithReactElementPlaceholder, ReactRootElement];
	to = [TypeScriptReactCode];

	async distinct(obj: TTypeScriptReactCodeWithReactElementPlaceholder & TReactRootElement) {
		let res: string = obj[TypeScriptReactCodeWithReactElementPlaceholder].replace(
			ReactElementInToTypeScriptCodeInserter.elementPlaceholder,
			reactElementToJSXString(obj[ReactRootElement])
		);

		return {
			[TypeScriptReactCode]: res,
		};
	}
}

const reactElementInToTypeScriptCodeInserterInstance = new ReactElementInToTypeScriptCodeInserter();
export default reactElementInToTypeScriptCodeInserterInstance;
