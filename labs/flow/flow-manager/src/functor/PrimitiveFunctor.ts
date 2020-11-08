import { IDictionary } from "@xde/common";

import { Functor, IFunctor } from "./Functor";

export interface IPrimitiveFunctor<TFrom extends IDictionary, TTo extends IDictionary>
	extends IFunctor<TFrom, TTo> {
	distinct(partial: TFrom): TTo | Promise<TTo>;
}

export abstract class PrimitiveFunctor<TFrom extends IDictionary, TTo extends IDictionary>
	extends Functor<TFrom, TTo>
	implements IPrimitiveFunctor<TFrom, TTo> {
	abstract distinct(partial: TFrom): TTo | Promise<TTo>;
}
