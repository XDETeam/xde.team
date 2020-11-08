import { diff } from "deep-object-diff";
import { IDictionary, replaceCircular } from "@xde/common";

import { AspectType } from "../models";
import { IFunctor, LambdaAspect, LambdaPrimitiveAspect, LambdaDeepAspect } from "./Functor";
import { appDebug } from "../helpers/debug";
import { AnyFunctor } from "./models";
import { ICompositeFunctor } from "./CompositeFunctor";
import distinctionManagerInstance from "./DistinctionManager";

const debug = appDebug.extend("CompositionFlow");
const debugVerbose = debug.extend("verbose");
const debugShort = debug.extend("short");
const debugShortFunctor = debugShort.extend("functor");
const debugShortObject = debugShort.extend("object");

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
			debugVerbose("Object before iteration", replaceCircular(this.object));

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
			debugShortFunctor(
				`[${functors
					.map((functor) =>
						"children" in functor
							? `--- [${functor.children.map((f) => f.name).join(", ")}] ---`
							: functor.name
					)
					.join(", ")}]`
			);
			debugShortObject(diff(replaceCircular(prevObject), replaceCircular(this.object)));
			prevObject = { ...this.object };
			debugVerbose("Object after iteration", replaceCircular(this.object));
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

		return ret;
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
