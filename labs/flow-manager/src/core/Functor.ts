import { Debugger } from "debug";

import { appDebug } from "./helpers/debug";
import { Aspect, IObject } from "./models";
import { ObjectFlow } from "./ObjectFlow";

const debug = appDebug.extend("Functor");

export type IFunctorRequires =
	| { aspect: Aspect; lambda: (aspect?: any) => boolean }
	| { undef: Aspect }
	| { someTruthy: Aspect[] };

export type IFunctorProduces = Aspect | { rewritable: Aspect };

// 2 типа функторов - композитный и примитивный. по умолчанию - композитный
export interface IFunctor {
	/**
	 * In case array item is:
	 * 	- simple Aspect - check that is not undefined
	 *  - object
	 * 		- aspect and lambda - check that lambda returns truthy
	 * 		- undef - check that aspect is undefined
	 * 		- someTruthy - check that some of aspects is truthy
	 */
	requires: Array<Aspect | IFunctorRequires>;

	/**
	 * In case is
	 * 	- an object
	 * 		- exactAspects - not allow to have additional aspects
	 *  - an array
	 * 		- simple Aspect - any defined value
	 * 		- object rewritable - allow to run functor even if Aspect is already defined
	 */
	produces: IFunctorProduces[] | { exactAspects: IFunctorProduces[] };

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

export abstract class Functor implements IFunctor {
	// Allows to debug some info when overriding "move" method
	public static debugger: Debugger = debug;

	abstract requires: IFunctor["requires"];
	abstract produces: IFunctor["produces"];

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

		this.replacements[existing.constructor.name] = newMove;
	}

	private addSubFunctor(functor: IFunctor): void {
		if (!functor.requires.length) {
			throw new Error("Empty requires: Functor will never be invoked.");
		}
		if (this.subFunctors.indexOf(functor) !== -1) {
			throw new Error(
				`Can't register duplicate functor ${functor.constructor.name} as a child for ${this.constructor.name}`
			);
		}
		this.subFunctors.push(functor);
		debug(`Functor ${functor.constructor.name} added as a child for ${this.constructor.name}`);
	}
}

export class CompositeFunctor extends Functor {
	constructor(public requires: Functor["requires"], public produces: Functor["produces"]) {
		super();
	}
}
