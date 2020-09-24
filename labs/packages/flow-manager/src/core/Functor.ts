import { Debugger } from "debug";

import { appDebug } from "./helpers/debug";
import { Aspect, IObject } from "./models";
import { ObjectFlow } from "./ObjectFlow";

const debug = appDebug.extend("Functor");

export type IFunctorRequires =
	| { aspect: Aspect; lambda: (aspect?: any) => boolean }
	// TODO: can be achieved just with lambda function
	| { undef: Aspect }
	| { some: Aspect[] };

export type IFunctorProduces =
	| { undef: Aspect }
	| { aspect: Aspect; rewritable: boolean }
	| { some: Aspect[]; rewritable: true };

// 2 типа функторов - композитный и примитивный. по умолчанию - композитный
export interface IFunctor {
	name: string;

	/**
	 * In case array item is:
	 * 	- simple Aspect - check that is not undefined
	 *  - object
	 * 		- aspect and lambda - check that lambda returns truthy
	 * 		- undef - check that aspect is undefined
	 * 		- some - check that some of aspects is truthy
	 */
	requires: Array<Aspect | IFunctorRequires>;

	/**
	 * In case is
	 * 	- simple Aspect - any defined value
	 *  - object
	 * 		- undef - removes aspect
	 *		- rewritable - allow to run functor even if Aspect is already defined
	 * 		- some - produces one of. Should be rewritable
	 */
	produces: Array<Aspect | IFunctorProduces>;

	subFunctors: IFunctor[];

	/**
	 * Rewrite me to make primitive functor
	 */
	move(obj: IObject): IObject;
	addSubFunctors(functor: IFunctor | IFunctor[]): void;
	isPossible(from: Aspect, receive: Aspect): boolean;

	/**
	 * Replaces move method of subfunctor
	 * @param existing Replace move method for this functor
	 * @param newMove Move function to replace with
	 */
	replace(existing: IFunctor, newMove: IFunctor["move"]): void;
	replacements: { [key: string]: IFunctor["move"] };
}

export enum AspectType {
	Exists = "Exists",
	SpecificValue = "SpecificValue",
	Undefined = "Undefined",
	Some = "Some",
}

export type AspectsTyped =
	| {
			aspect: Aspect;
			type: Exclude<AspectType, AspectType.Some>;
	  }
	| { aspects: Aspect[]; type: AspectType.Some };

export interface IFunctorExplained {
	functorName: string;
	from: AspectsTyped[];
	to: AspectsTyped[];
	children?: IFunctorExplained[];
}

export abstract class Functor implements IFunctor {
	// Allows to debug some info when overriding "move" method
	public static debugger: Debugger = debug;

	// TODO: Test coverage
	public static explain(functor: IFunctor): IFunctorExplained {
		const from: AspectsTyped[] = [];
		const to: AspectsTyped[] = [];

		functor.requires.forEach((req) => {
			if (typeof req === "object") {
				if ("undef" in req) {
					from.push({ aspect: req.undef, type: AspectType.Undefined });
				} else if ("some" in req) {
					from.push({ aspects: req.some, type: AspectType.Some });
				} else if ("lambda" in req) {
					from.push({ aspect: req.aspect, type: AspectType.SpecificValue });
				}
			} else {
				from.push({ aspect: req, type: AspectType.Exists });
			}
		});

		functor.produces.forEach((product) => {
			if (typeof product === "object") {
				if ("some" in product) {
					to.push({
						aspects: product.some,
						type: AspectType.Some,
					});
				} else if ("undef" in product) {
					to.push({
						aspect: product.undef,
						type: AspectType.Undefined,
					});
				} else if ("aspect" in product) {
					to.push({
						aspect: product.aspect,
						type: AspectType.Exists,
					});
				}
			} else {
				to.push({
					aspect: product,
					type: AspectType.Exists,
				});
			}
		});

		return {
			functorName: functor.name,
			from,
			to,
			children: functor.subFunctors.length
				? functor.subFunctors.map((f) => Functor.explain(f))
				: undefined,
		};
	}

	abstract requires: IFunctor["requires"];
	abstract produces: IFunctor["produces"];
	abstract name: string;

	subFunctors: IFunctor[] = [];
	replacements: IFunctor["replacements"] = {};

	move(obj: IObject): IObject {
		if (!this.subFunctors.length) {
			throw new Error(
				"You should either add subfunctors to the composite functor or make it primitive by overriding this method."
			);
		}

		const moved = new ObjectFlow(obj);
		moved.move(this.subFunctors, this.replacements);

		// TODO: Validate with produces - if not - throw! now handled by ObjectFlow
		return moved.object;
	}

	addSubFunctors(functor: IFunctor | IFunctor[]): void {
		if (Array.isArray(functor)) {
			functor.forEach((f) => this.addSubFunctor(f));
		} else {
			this.addSubFunctor(functor);
		}
	}

	isPossible(from: Aspect, receive: Aspect): boolean {
		const moved = new ObjectFlow({ [from]: true });
		moved.movePass(this.subFunctors);

		return moved.object[receive] !== undefined;
	}

	replace(existing: IFunctor, newMove: IFunctor["move"]): void {
		if (!this.subFunctors.includes(existing)) {
			throw new Error(
				"It is not possible to replace method of unregistered subfunctor. Add it first."
			);
		}

		this.replacements[existing.name] = newMove;
	}

	private addSubFunctor(functor: IFunctor): void {
		if (!functor.requires.length) {
			throw new Error("Empty requires: Functor will never be invoked.");
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

export class CompositeFunctor extends Functor {
	constructor(
		public name: Functor["name"],
		public requires: Functor["requires"],
		public produces: Functor["produces"]
	) {
		super();
	}
}
