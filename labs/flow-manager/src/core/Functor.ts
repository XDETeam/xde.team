import { Debugger } from "debug";

import { appDebug } from "./helpers/debug";
import { Aspect, AspectsState, AspectState, IObject } from "./models";
import { ObjectFlow } from "./ObjectFlow";

const debug = appDebug.extend("Functor");

export type IFunctorRequiresExt =
	| { aspect: Aspect; lambda: (aspect?: any) => boolean }
	| { aspect: Aspect; is: AspectState }
	| { aspects: Aspect[]; are: AspectsState };

// 2 типа функторов - композитный и примитивный. по умолчанию - композитный
export interface IFunctor {
	requires: Array<Aspect | IFunctorRequiresExt>;
	produces: Aspect[];

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

		// TODO: Validate with produces - if not - throw!
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
		// TODO: validate requires and produces non-zero length
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
