import { Debugger } from "debug";

import { appDebug } from "./helpers/debug";
import { ILambda } from "./helpers/lambdas";
import { Aspect, AspectType, IObject } from "./models";
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

	from: Array<IFunctorFrom<TAspect>>;
	to: Array<IFunctorTo<TAspect>>;

	subFunctors: IFunctor<TAspect>[];

	/**
	 * Rewrite me to make primitive functor
	 */
	move(obj: IObject): IObject;
	addSubFunctors(functor: IFunctor<TAspect> | IFunctor<TAspect>[]): void;

	/**
	 * Replaces move method of subfunctor
	 * @param existing Replace move method for this functor
	 * @param newMove Move function to replace with
	 */
	replace(existing: IFunctor<TAspect>, newMove: IFunctor<TAspect>["move"]): void;
	replacements: { [key: string]: IFunctor<TAspect>["move"] };
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
	// Allows to debug some info when overriding "move" method
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
			children: functor.subFunctors.length
				? functor.subFunctors.map((f) => Functor.explain<T>(f))
				: undefined,
		};
	}

	abstract from: IFunctor<TAspect>["from"];
	abstract to: IFunctor<TAspect>["to"];
	abstract name: string;

	subFunctors: IFunctor<TAspect>[] = [];
	replacements: IFunctor<TAspect>["replacements"] = {};

	move(obj: IObject): IObject {
		if (!this.subFunctors.length) {
			throw new Error(
				"You should either add subfunctors to the composite functor or make it primitive by overriding this method."
			);
		}

		const moved = new ObjectFlow<TAspect>(obj);
		moved.move(this.subFunctors, this.replacements);

		// TODO: Validate with 'to' - if not - throw! now handled by ObjectFlow
		return moved.object;
	}

	addSubFunctors(functor: IFunctor<TAspect> | IFunctor<TAspect>[]): void {
		if (Array.isArray(functor)) {
			functor.forEach((f) => this.addSubFunctor(f));
		} else {
			this.addSubFunctor(functor);
		}
	}

	replace(existing: IFunctor<TAspect>, newMove: IFunctor<TAspect>["move"]): void {
		if (!this.subFunctors.includes(existing)) {
			throw new Error(
				"It is not possible to replace method of unregistered subfunctor. Add it first."
			);
		}

		this.replacements[existing.name] = newMove;
	}

	private addSubFunctor(functor: IFunctor<TAspect>): void {
		if (!functor.from.length) {
			throw new Error("Empty from: Functor will never be invoked.");
		}
		if (
			this.subFunctors.indexOf(functor) !== -1 ||
			this.subFunctors.findIndex((f) => f.name === functor.name) !== -1
		) {
			throw new Error(
				`Can't register duplicate functor ${functor.name} as a child for ${this.name}`
			);
		}
		this.subFunctors.push(functor);
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
