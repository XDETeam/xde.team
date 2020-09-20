import { IObject } from "../models";
import { Aspects, AspectsState, AspectState } from "../aspects";

export type IFunctorRequiresExt =
	| { aspect: Aspects; lambda: (aspect?: any) => boolean }
	| { aspect: Aspects; is: AspectState }
	| { aspects: Aspects[]; are: AspectsState };

export interface IFunctor {
	move(obj: IObject): IObject;
	// requires или produces НЕ могут быть пустыми, даже если на конце цепочки
	requires: Array<Aspects | IFunctorRequiresExt>;
	produces: Aspects[];
}

// Just not to get lost in the logic
export interface IHookFunctor extends IFunctor {
	isHook: true;
}
