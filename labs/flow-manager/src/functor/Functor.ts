import { Debugger } from "debug";
import { IObject } from "../models";
import { Aspects, AspectsState, AspectState } from "../aspects";
import { appDebug } from "../helpers/debug";
import { ObjectFlow } from "../flow/ObjectFlow";

const debug = appDebug.extend("Functor");

export type IFunctorRequiresExt =
	| { aspect: Aspects; lambda: (aspect?: any) => boolean }
	| { aspect: Aspects; is: AspectState }
	| { aspects: Aspects[]; are: AspectsState };

// 2 типа функторов - композитный и примитивный. по умолчанию - композитный
// добавляем проверку - если объект в конце не имеет свойства из produces - ошибка
export interface IFunctor {
	subFunctors: IFunctor[];
	// move should become nofity
	// also move should support substitution of move function
	move(obj: IObject): IObject;
	// requires или produces НЕ могут быть пустыми, даже если на конце цепочки
	requires: Array<Aspects | IFunctorRequiresExt>;
	produces: Aspects[];

	addSubFunctors(functor: IFunctor | IFunctor[]): void;

	isPossible(from: Aspects, receive: Aspects): boolean;
}

export abstract class Functor implements IFunctor {
	// Allows to debug some info when overriding "move" method
	public static debugger: Debugger = debug;

	subFunctors: IFunctor[] = [];
	abstract requires: IFunctor["requires"];
	abstract produces: IFunctor["produces"];

	move(obj: IObject): IObject {
		if (!this.subFunctors.length) {
			throw new Error(
				"You should either add subfunctors to the composite functor or make it primitive by overriding this method."
			);
		}

		const moved = new ObjectFlow(obj);
		moved.move(this.subFunctors);

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

	isPossible(from: Aspects, receive: Aspects): boolean {
		const moved = new ObjectFlow({ [from]: true });
		moved.movePass(this.subFunctors);

		return moved.object[receive] !== undefined;
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
