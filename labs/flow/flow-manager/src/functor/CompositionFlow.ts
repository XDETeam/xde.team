import { diff } from "deep-object-diff";
import {
	IDictionary,
	replaceCircular,
	arrayFlatDeep,
	arrayUnique,
	arrayDuplicates,
} from "@xde/common";

import { AspectType } from "../models";
import { IFunctor, LambdaAspect, LambdaPrimitiveAspect, LambdaDeepAspect } from "./Functor";
import { appDebug } from "../helpers/debug";
import { AnyFunctor } from "./models";
import { ICompositeFunctor } from "./CompositeFunctor";
import distinctionManagerInstance from "./DistinctionManager";

export const expensiveDebug =
	!(process.env.NODE_ENV === "production") ||
	(process.env["XDE_FM_MANUAL_PRODUCTION_DEBUG"] && process.env.DEBUG);

const debugVerbose = appDebug.extend("verbose");
const debugShort = appDebug.extend("short");

export interface ICompositionFlow<TTo extends IDictionary> {
	process(
		functorsPool: AnyFunctor[],
		distinctReplacements?: ICompositeFunctor<any, any>["distinctReplacements"]
	): Promise<TTo>;

	distinctions: TTo[];
}

export class CompositionFlow<TFrom extends IDictionary, TTo extends IDictionary>
	implements ICompositionFlow<TTo> {
	distinctions: TTo[] = [];

	constructor(public object: TFrom & IDictionary) {}

	// Пока есть плагин, который может работать с аспектом или набором аспектов - выполняем. Как только плагины заканчиваются - освобождаем объект
	// Мысленно все разруливается с конца - Вы можете перенести пользователя в добавленные. добавленный пользователь требует x, x требует y и т.д.
	async process(
		functorsPool: AnyFunctor[],
		distinctReplacements?: ICompositeFunctor<any, any>["distinctReplacements"]
	): Promise<TTo> {
		let functors: AnyFunctor[];
		let prevObject = { ...this.object };
		let currentFunctorsPool = functorsPool.slice();

		while ((functors = this.findFunctors(currentFunctorsPool)) && functors.length) {
			debugVerbose("Found functors", functors);
			expensiveDebug && debugVerbose("Object before iteration", replaceCircular(this.object));

			this.object = await Promise.all<TTo>(
				functors.map((functor) =>
					new Promise<TTo>((resolve, reject) => {
						if (distinctReplacements && functor.name in distinctReplacements) {
							resolve(distinctReplacements[functor.name](this.object));
						} else {
							resolve(functor.distinct(this.object) as TTo | Promise<TTo>);
						}
					}).then((x) => {
						if (!this.validateTo(x, functor)) {
							throw new Error(
								`To validation failed for functor ${
									functor.name
								} with to ${JSON.stringify(
									functor.to
								)} and resulting object ${JSON.stringify(
									// TODO: Production - leave or not? Useful info, should not be invoked by default.
									replaceCircular(x),
									null,
									2
								)}`
							);
						} else {
							return x;
						}
					})
				)
			)
				.then((distinctions) => distinctionManagerInstance.merge(distinctions))
				.then((mergedDistinctions) => {
					this.distinctions.push(mergedDistinctions);

					return {
						...this.object,
						...mergedDistinctions,
					};
				});

			currentFunctorsPool = currentFunctorsPool.filter((f) => !functors.includes(f));

			expensiveDebug &&
				debugShort(
					`[${functors
						.map((functor) =>
							"children" in functor
								? `--- [${functor.children.map((f) => f.name).join(", ")}] ---`
								: functor.name
						)
						.join(", ")}]`
				);
			expensiveDebug &&
				debugShort(diff(replaceCircular(prevObject), replaceCircular(this.object)));

			prevObject = { ...this.object };
			expensiveDebug && debugVerbose("Object after iteration", replaceCircular(this.object));
		}

		return distinctionManagerInstance.merge(this.distinctions);
	}

	findFunctors(functorsPool: AnyFunctor[]): AnyFunctor[] {
		const ret: AnyFunctor[] = [];

		// TODO: Приоритет выполнения функторов: 1) количество from 2) порядок добавления
		functorsPool.forEach((functor) => {
			if (
				this.toAllow(functor.to, this.object) &&
				this.fromAllow(functor.from, this.object)
			) {
				ret.push(functor);
			}
		});

		if (process.env.NODE_ENV !== "production") {
			const overlap = this.toOverlap(ret);
			if (!overlap.length) {
				return ret;
			} else {
				throw new Error(
					`Bad functors composition: to aspects ${JSON.stringify(
						overlap,
						null,
						2
					)} overlaps within functors composition ${JSON.stringify(
						ret.map((x) => x.name),
						null,
						2
					)}. Current object is ${JSON.stringify(replaceCircular(this.object), null, 2)}`
				);
			}
		} else {
			return ret;
		}
	}

	private toOverlap(functors: AnyFunctor[]): Array<string | number | symbol> {
		const aspects = functors.reduce((prev, curr) => {
			return prev.concat(
				arrayUnique(
					arrayFlatDeep(
						curr.to
							.filter((x) => !(typeof x === "object" && x.allowSimultaneous === true))
							.map((x) => {
								if (typeof x === "object") {
									return Array.isArray(x.aspect) ? x.aspect : [x.aspect];
								} else {
									return [x];
								}
							})
					)
				)
			);
		}, [] as Array<string | number | symbol>);

		return arrayDuplicates(aspects);
	}

	private toAllow(functorTo: IFunctor<any, any>["to"], obj: IDictionary): boolean {
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
				// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
				return obj[product as any] === undefined;
			}
		});
	}

	private fromAllow(functorFrom: IFunctor<any, any>["from"], obj: IDictionary): boolean {
		return functorFrom.every((req) => {
			if (typeof req === "object") {
				return this.runLambda(req, obj);
			} else {
				// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
				return obj[req as any] !== undefined;
			}
		});
	}

	private validateTo(obj: IDictionary, functor: IFunctor<any, any>): boolean {
		return functor.to.every((req, i) => {
			if (typeof req === "object") {
				return this.runLambda(req, obj);
			} else {
				// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
				return obj[req as any] !== undefined;
			}
		});
	}

	private runLambda(aspects: LambdaAspect<any>, obj: IDictionary): boolean {
		const result: IDictionary[] = [];

		// TODO: Refactor
		if (Array.isArray(aspects.aspect)) {
			// TODO: Every instead Array.isArray(aspect[0]) with some check?
			if (Array.isArray(aspects.aspect[0])) {
				(aspects as LambdaDeepAspect<any>).aspect.forEach((a) => {
					const res: IDictionary = {};

					// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
					a.forEach((x) => (res[x as any] = obj[x as any]));

					result.push(res);
				});

				return aspects.lambda(result);
			} else {
				const res: IDictionary = {};
				// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
				(aspects.aspect as any[]).forEach((a) => (res[a as any] = obj[a as any]));
				result.push(res);

				return (aspects as LambdaPrimitiveAspect<any>).lambda(result[0]);
			}
		} else {
			const res: IDictionary = {};
			// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
			res[aspects.aspect as any] = obj[aspects.aspect as any];
			result.push(res);

			return (aspects as LambdaPrimitiveAspect<any>).lambda(result[0]);
		}
	}

	private someAspectUndefined(aspects: LambdaAspect<any>, obj: IDictionary): boolean {
		if (Array.isArray(aspects)) {
			return aspects.some((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] === undefined);
				} else {
					return obj[x] !== undefined;
				}
			});
		} else {
			// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
			return obj[aspects.aspect as any] === undefined;
		}
	}

	private everyAspectDefined(aspects: LambdaAspect<any>, obj: IDictionary): boolean {
		if (Array.isArray(aspects)) {
			return aspects.every((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] !== undefined);
				} else {
					return obj[x] !== undefined;
				}
			});
		} else {
			// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
			return obj[aspects.aspect as any] !== undefined;
		}
	}

	private everyAspectUndefined(aspects: LambdaAspect<any>, obj: IDictionary): boolean {
		if (Array.isArray(aspects)) {
			return aspects.every((x) => {
				if (Array.isArray(x)) {
					return x.every((y) => obj[y] === undefined);
				} else {
					return obj[x] === undefined;
				}
			});
		} else {
			// TODO: watch https://github.com/microsoft/TypeScript/issues/1863
			return obj[aspects.aspect as any] === undefined;
		}
	}
}
