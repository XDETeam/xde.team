import { IObject } from "../models";
import { IFunctor, IHookFunctor } from "../functor/Functor";
import { ObjectFlow } from "./ObjectFlow";
import { Aspects } from "../aspects";
import { appDebug } from "../helpers/debug";

const debug = appDebug.extend("FlowManager");

export interface IFlowManager {
	/**
	 * тут можно передать объект
	 */
	notify(object: IObject): void;

	/**
	 * добавляем функтор
	 */
	register(functor: IFunctor | IHookFunctor | Array<IFunctor | IHookFunctor>): void;

	isPossible(from: Aspects, receive: Aspects): boolean;
}

// Пока есть плагин, который может работать с аспектом или набором аспектов - выполняем. Как только плагины заканчиваются - освобождаем объект
// Мысленно все разруливается с конца - Вы можете перенести пользователя в добавленные. добавленный пользователь требует x, x требует y и т.д.
export class FlowManager implements IFlowManager {
	functors: IFunctor[] = [];
	beforeObjectReleaseFunctors: IFunctor[] = [];

	notify(obj: IObject): void {
		const moved = new ObjectFlow(obj);
		moved.move(this.functors);

		if (this.beforeObjectReleaseFunctors.length) {
			moved.move(this.beforeObjectReleaseFunctors);
			moved.move(this.functors);
		}
	}

	register(functor: IFunctor | IHookFunctor | Array<IFunctor | IHookFunctor>): void {
		if (Array.isArray(functor)) {
			functor.forEach((f) => this.registerFunctor(f));
		} else {
			this.registerFunctor(functor);
		}
	}

	isPossible(from: Aspects, receive: Aspects): boolean {
		const moved = new ObjectFlow({ [from]: true });
		moved.movePass(this.functors);

		if (this.beforeObjectReleaseFunctors.length) {
			moved.movePass(this.beforeObjectReleaseFunctors);
			moved.movePass(this.functors);
		}

		return moved.object[receive] !== undefined;
	}

	private registerFunctor(functor: IFunctor | IHookFunctor): void {
		// TODO: validate requires and produces non-zero length
		if ("isHook" in functor) {
			debug(`Registering hook functor ${functor.constructor.name}`);
			if (this.beforeObjectReleaseFunctors.indexOf(functor) !== -1) {
				throw new Error(
					`Can't register duplicate hook functor ${functor.constructor.name}`
				);
			}
			this.beforeObjectReleaseFunctors.push(functor);
		} else {
			debug(`Registering functor ${functor.constructor.name}`);
			if (this.functors.indexOf(functor) !== -1) {
				throw new Error(`Can't register duplicate functor ${functor.constructor.name}`);
			}
			this.functors.push(functor);
		}
	}
}

const flowManagerInstance = new FlowManager();
export default flowManagerInstance;
