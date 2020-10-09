import { Debugger } from "debug";

import { appDebug } from "../helpers/debug";
import { ILambda } from "../helpers/lambdas";
import { Aspect, AspectType, IObject } from "../models";
import { ObjectFlow } from "./ObjectFlow";

const debug = appDebug.extend("Functor");

export type LambdaAspect<TAspect extends string = Aspect> = {
	aspect: TAspect | Array<TAspect | TAspect[]>;
	lambda: ILambda<TAspect>;
};

export type IFunctorFrom<TAspect extends string = Aspect> = TAspect | LambdaAspect<TAspect>;

export type IFunctorTo<TAspect extends string = Aspect> =
	| TAspect
	| (LambdaAspect<TAspect> & {
			/**
			 * Run despite it's look like aspects producing already exists in the object
			 */
			force?: boolean;
	  });

// 2 типа функторов - композитный и примитивный. по умолчанию - композитный
export interface IFunctor<TAspect extends string = Aspect> {
	name: string;

	/**
	 * Category to map from
	 */
	from: Array<IFunctorFrom<TAspect>>;

	/**
	 * Category maps to
	 */
	to: Array<IFunctorTo<TAspect>>;

	children: IFunctor<TAspect>[];
	addChildren(functor: IFunctor<TAspect> | IFunctor<TAspect>[]): void;

	/**
	 * Maps from <from category> to <to category>.
	 * Rewrite me to make primitive functor.
	 */
	map(obj: IObject): IObject;

	/**
	 * Replaces map method for one of children
	 * @param existing Replace map method for this functor
	 * @param newMap Map function to replace with
	 */
	mapReplace(existing: IFunctor<TAspect>, newMap: IFunctor<TAspect>["map"]): void;
	mapReplacements: { [key: string]: IFunctor<TAspect>["map"] };
}

export type AspectsTyped<TAspect extends string = Aspect> = {
	aspect: LambdaAspect<TAspect>["aspect"];
	type: AspectType;
};
export interface IFunctorExplained<TAspect extends string = Aspect> {
	functorName: string;
	from: AspectsTyped<TAspect>[];
	to: AspectsTyped<TAspect>[];
	children?: IFunctorExplained<TAspect>[];
}

export abstract class Functor<TAspect extends string = Aspect> implements IFunctor<TAspect> {
	// Allows to debug some info when overriding "map" method
	public static debugger: Debugger = debug;

	// TODO: Test coverage
	public static explain<T extends string>(functor: IFunctor<T>): IFunctorExplained<T> {
		const from: AspectsTyped<T>[] = [];
		const to: AspectsTyped<T>[] = [];

		const add = (
			description: Array<IFunctorFrom<T>> | Array<IFunctorTo<T>>,
			arr: AspectsTyped<T>[]
		): void => {
			description.forEach((x) => {
				if (typeof x === "object") {
					if (x.lambda.type) {
						arr.push({ aspect: x.aspect, type: x.lambda.type });
					} else {
						arr.push({ aspect: x.aspect, type: AspectType.SpecificValue });
					}
				} else {
					arr.push({ aspect: x, type: AspectType.Exists });
				}
			});
		};

		add(functor.from, from);
		add(functor.to, to);

		return {
			functorName: functor.name,
			from,
			to,
			children: functor.children.length
				? functor.children.map((f) => Functor.explain<T>(f))
				: undefined,
		};
	}

	abstract from: IFunctor<TAspect>["from"];
	abstract to: IFunctor<TAspect>["to"];
	abstract name: string;

	children: IFunctor<TAspect>[] = [];
	mapReplacements: IFunctor<TAspect>["mapReplacements"] = {};

	map(obj: IObject): IObject {
		if (!this.children.length) {
			throw new Error(
				"You should either add children functors to the composite functor or make it primitive by overriding this method."
			);
		}

		const objectFlow = new ObjectFlow<TAspect>(obj);
		objectFlow.process(this.children, this.mapReplacements);

		// TODO: Validate with 'to' - if not - throw! now handled by ObjectFlow
		return objectFlow.object;
	}

	addChildren(functor: IFunctor<TAspect> | IFunctor<TAspect>[]): void {
		if (Array.isArray(functor)) {
			functor.forEach((f) => this.addChild(f));
		} else {
			this.addChild(functor);
		}
	}

	mapReplace(existing: IFunctor<TAspect>, newMap: IFunctor<TAspect>["map"]): void {
		if (!this.children.includes(existing)) {
			throw new Error(
				"It is not possible to replace method of unregistered child functor. Add it first."
			);
		}

		this.mapReplacements[existing.name] = newMap;
	}

	private addChild(functor: IFunctor<TAspect>): void {
		if (!functor.from.length) {
			throw new Error("Empty from: Functor will never be invoked.");
		}
		if (
			this.children.indexOf(functor) !== -1 ||
			this.children.findIndex((f) => f.name === functor.name) !== -1
		) {
			throw new Error(
				`Can't register duplicate functor ${functor.name} as a child for ${this.name}`
			);
		}
		this.children.push(functor);
		debug(`Functor ${functor.name} added as a child for ${this.name}`);
	}
}

export class CompositeFunctor<TAspect extends string = Aspect> extends Functor<TAspect> {
	constructor(
		public name: Functor<TAspect>["name"],
		public from: Functor<TAspect>["from"],
		public to: Functor<TAspect>["to"]
	) {
		super();
	}
}
