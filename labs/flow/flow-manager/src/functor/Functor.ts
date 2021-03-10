import { IDictionary, TKeysOf } from "@xde.labs/common";
import { Debugger } from "debug";

import { appDebug } from "../helpers/debug";
import { ILambdaPrimitive, ILambdaDeep } from "../helpers/lambdas";
import { AspectType } from "../models";
import { AnyFunctor } from "./models";

const debug = appDebug.extend("functor");

export type LambdaPrimitiveAspect<TPartial extends IDictionary> = {
	aspect: TKeysOf<TPartial> | Array<TKeysOf<TPartial>>;
	// TODO: Existential type from aspect?
	lambda: ILambdaPrimitive<TPartial>;
};

export type LambdaDeepAspect<TPartial extends IDictionary> = {
	aspect: Array<Array<TKeysOf<TPartial>>>;
	// TODO: Existential type from aspect?
	lambda: ILambdaDeep<TPartial>;
};

export type LambdaAspect<TPartial extends IDictionary> =
	| LambdaPrimitiveAspect<TPartial>
	| LambdaDeepAspect<TPartial>;

export type IFunctorFrom<TFrom extends IDictionary> = TKeysOf<TFrom> | LambdaAspect<TFrom>;

export type IFunctorTo<TTo extends IDictionary> =
	| TKeysOf<TTo>
	| (LambdaAspect<TTo> & {
			/**
			 * Run despite it's look like aspects producing already exists in the object
			 */
			force?: boolean;
			/**
			 * Allow functors composition that sets current aspect simultaneously
			 * Supported way now - aspect should be an array. All array items will be concatenated after functors iteration for you by distinction manager.
			 * Also you should not depend on items ordering in the array
			 */
			allowSimultaneous?: boolean;
	  });

export interface IFunctor<TFrom extends IDictionary, TTo extends IDictionary> {
	name: string;

	/**
	 * Category to map from
	 */
	from: Array<IFunctorFrom<TFrom>>;

	/**
	 * Category maps to
	 */
	to: Array<IFunctorTo<TTo>>;
}

export type AspectsTyped<TPartial extends IDictionary> = {
	aspect: LambdaAspect<TPartial>["aspect"];
	type: AspectType;
};
export interface IFunctorExplained<TFrom extends IDictionary, TTo extends IDictionary> {
	functorName: string;
	from: AspectsTyped<TFrom>[];
	to: AspectsTyped<TTo>[];
	children?: IFunctorExplained<any, any>[];
}

export abstract class Functor<TFrom extends IDictionary, TTo extends IDictionary>
	implements IFunctor<TFrom, TTo> {
	// Allows to debug some info when overriding "distinct" method
	public static debugger: Debugger = debug;

	abstract from: IFunctor<TFrom, TTo>["from"];
	abstract to: IFunctor<TFrom, TTo>["to"];
	abstract name: IFunctor<TFrom, TTo>["name"];

	// TODO: Test coverage
	public static explain<TFrom extends IDictionary, TTo extends IDictionary>(
		functor: AnyFunctor<TFrom, TTo>
	): IFunctorExplained<TFrom, TTo> {
		const from: AspectsTyped<TFrom>[] = [];
		const to: AspectsTyped<TTo>[] = [];

		const add = (
			description: Array<IFunctorFrom<TFrom>> | Array<IFunctorTo<TTo>>,
			arr: AspectsTyped<TFrom>[] | AspectsTyped<TTo>[]
		): void => {
			description.forEach((x: keyof TFrom | keyof TTo | LambdaAspect<any>) => {
				if (typeof x === "object") {
					if (x.lambda.type) {
						arr.push({ aspect: x.aspect as any, type: x.lambda.type });
					} else {
						arr.push({ aspect: x.aspect as any, type: AspectType.SpecificValue });
					}
				} else {
					arr.push({ aspect: x as any, type: AspectType.Exists });
				}
			});
		};

		add(functor.from, from);
		add(functor.to, to);

		return {
			functorName: functor.name,
			from,
			to,
			children:
				"children" in functor
					? functor.children.map((f) => Functor.explain<any, any>(f))
					: undefined,
		};
	}
}
