import { IObject } from "../models";
import { Aspects } from "../aspects";

export interface IFunctor {
	move(obj: IObject): IObject;
	// TODO: Can go from Aspects to just functor names?
	// requires или produces НЕ могут быть пустыми, даже если на конце цепочки
	requires: Array<Aspects | { aspect: Aspects; lambda: (aspect: any) => boolean }>;
	produces: Aspects[];
}

// Just not to get lost in the logic
export interface IHookFunctor extends IFunctor {
	isHook: true;
}
