import { diff } from "deep-object-diff";

import { Aspect, AspectType, IObject } from "../models";
import { IFunctor, LambdaAspect } from "./Functor";
import { appDebug } from "../helpers/debug";

const debug = appDebug.extend("ObjectFlow");
const debugVerbose = debug.extend("verbose");
const debugShort = debug.extend("short");
const debugShortFunctor = debugShort.extend("functor");
const debugShortObject = debugShort.extend("object");

export interface IObjectFlow<TAspect extends string = Aspect> {
	process(
		functorsPool: IFunctor<TAspect>[],
		mapReplacements?: IFunctor<TAspect>["mapReplacements"]
	): void;
}

export class ObjectFlow<TAspect extends string = Aspect> implements IObjectFlow<TAspect> {
	constructor(public object: IObject) {}

	// Пока есть плагин, который может работать с аспектом или набором аспектов - выполняем. Как только плагины заканчиваются - освобождаем объект
	// Мысленно все разруливается с конца - Вы можете перенести пользователя в добавленные. добавленный пользователь требует x, x требует y и т.д.
	process(
		functorsPool: IFunctor<TAspect>[],
		mapReplacements?: IFunctor<TAspect>["mapReplacements"]
	): void {
		let functors: IFunctor<TAspect>[];
		let prevObject = { ...this.object };
		let currentFunctorsPool = functorsPool.slice();
		while ((functors = this.findFunctors(currentFunctorsPool)) && functors.length) {
			debugVerbose("Found functors", functors);
			debugVerbose("Object before iteration", this.object);
			functors.forEach((functor) => {
				if (mapReplacements && functor.name in mapReplacements) {
					this.object = mapReplacements[functor.name](this.object);
				} else {
					this.object = functor.map(this.object);
				}
				if (!this.validateTo(this.object, functor)) {
					throw new Error(
						`To validation failed for functor ${functor.name} with to ${JSON.stringify(
							functor.to
						)} and resulting object ${JSON.stringify(this.object, null, 2)}`
					);
				}
			});
			currentFunctorsPool = currentFunctorsPool.filter((f) => !functors.includes(f));
			debugShortFunctor(
				`[${functors
					.map((functor) =>
						functor.children.length
							? `--- [${functor.children.map((f) => f.name).join(", ")}] ---`
							: functor.name
					)
					.join(", ")}]`
			);
			debugShortObject(diff(prevObject, this.object));
			prevObject = { ...this.object };
			debugVerbose("Object after iteration", this.object);
		}
	}

	findFunctors(functorsPool: IFunctor<TAspect>[]): IFunctor<TAspect>[] {
		const ret: IFunctor<TAspect>[] = [];

		// TODO: Приоритет выполнения функторов: 1) количество from 2) порядок добавления
		functorsPool.forEach((functor) => {
			if (
				this.toAllow(functor.to, this.object) &&
				this.fromAllow(functor.from, this.object)
			) {
				ret.push(functor);
			}
		});

		return ret;
	}

	private toAllow(functorTo: IFunctor<TAspect>["to"], obj: IObject): boolean {
		return functorTo.every((product) => {
			if (typeof product === "object") {
				if ("force" in product && product.force) {
					return true;
				} else {
					switch (product.lambda.type) {
						case AspectType.Undefined: {
							return this.everyAspectDefined(product, obj);
						}
						case AspectType.Some: {
							return this.someAspectUndefined(product, obj);
						}
						case AspectType.Exists:
						case AspectType.Optional:
						case AspectType.SpecificValue:
						default: {
							return this.everyAspectUndefined(product, obj);
						}
					}
				}
			} else {
				return obj[product] === undefined;
			}
		});
	}

	private fromAllow(functorFrom: IFunctor<TAspect>["from"], obj: IObject): boolean {
		return functorFrom.every((req) => {
			if (typeof req === "object") {
				return this.runLambda(req, obj);
			} else {
				return obj[req] !== undefined;
			}
		});
	}

	private validateTo(obj: IObject, functor: IFunctor<TAspect>): boolean {
		return functor.to.every((req, i) => {
			if (typeof req === "object") {
				return this.runLambda(req, obj);
			} else {
				return obj[req] !== undefined;
			}
		});
	}

	private runLambda(aspects: LambdaAspect<TAspect>, obj: IObject): boolean {
		const result: IObject[] = [];
		if (Array.isArray(aspects.aspect)) {
			if (aspects.aspect.some((x) => Array.isArray(x))) {
				aspects.aspect.forEach((a) => {
					const res: IObject = {};
					if (Array.isArray(a)) {
						a.forEach((x) => (res[x] = obj[x]));
					} else {
						res[a] = obj[a];
					}
					result.push(res);
				});
			} else {
				const res: IObject = {};
				aspects.aspect.forEach((a) => (res[a as TAspect] = obj[a as TAspect]));
				result.push(res);
			}
		} else {
			const res: IObject = {};
			res[aspects.aspect] = obj[aspects.aspect];
			result.push(res);
		}
		return aspects.lambda(result.length === 1 ? result[0] : result);
	}

	private someAspectUndefined(aspects: LambdaAspect<TAspect>, obj: IObject): boolean {
		if (Array.isArray(aspects)) {
			return aspects.some((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] === undefined);
				} else {
					return obj[x] !== undefined;
				}
			});
		} else {
			return obj[aspects.aspect as TAspect] === undefined;
		}
	}

	private everyAspectDefined(aspects: LambdaAspect<TAspect>, obj: IObject): boolean {
		if (Array.isArray(aspects)) {
			return aspects.every((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] !== undefined);
				} else {
					return obj[x] !== undefined;
				}
			});
		} else {
			return obj[aspects.aspect as TAspect] !== undefined;
		}
	}

	private everyAspectUndefined(aspects: LambdaAspect<TAspect>, obj: IObject): boolean {
		if (Array.isArray(aspects)) {
			return aspects.every((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] === undefined);
				} else {
					return obj[x] === undefined;
				}
			});
		} else {
			return obj[aspects.aspect as TAspect] === undefined;
		}
	}
}
