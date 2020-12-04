import { IDictionary } from "@xde.labs/common";
import { ICompositeFunctor } from "./CompositeFunctor";
import { IPrimitiveFunctor } from "./PrimitiveFunctor";

export type AnyFunctor<TFrom extends IDictionary = any, TTo extends IDictionary = any> =
	| IPrimitiveFunctor<TFrom, TTo>
	| ICompositeFunctor<TFrom, TTo>;
