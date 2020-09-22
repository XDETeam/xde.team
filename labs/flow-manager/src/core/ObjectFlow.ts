import { diff } from "deep-object-diff";

import { IObject } from "./models";
import { IFunctor } from "./Functor";
import { Aspect } from "./models";
import { appDebug } from "./helpers/debug";

const debug = appDebug.extend("ObjectFlow");
const debugVerbose = debug.extend("verbose");
const debugShort = debug.extend("short");
const debugShortFunctor = debugShort.extend("functor");
const debugShortObject = debugShort.extend("object");

export enum AspectType {
	Exists = "Exists",
	SpecificValue = "SpecificValue",
}

export interface IExtendedAspect {
	type: AspectType;
	aspect: Aspect;
}

export interface IRequiredAspect {
	functorName: string;
	forAspect: IExtendedAspect;
	requires: IExtendedAspect[];
}

export interface IObjectFlow {
	move(functorsPool: IFunctor[], replacements?: IFunctor["replacements"]): void;
	movePass(functorsPool: IFunctor[]): void;
}

export class ObjectFlow implements IObjectFlow {
	constructor(public object: IObject) {}

	// Пока есть плагин, который может работать с аспектом или набором аспектов - выполняем. Как только плагины заканчиваются - освобождаем объект
	// Мысленно все разруливается с конца - Вы можете перенести пользователя в добавленные. добавленный пользователь требует x, x требует y и т.д.
	move(functorsPool: IFunctor[], replacements?: IFunctor["replacements"]): void {
		let functors: IFunctor[];
		let prevObject = { ...this.object };
		let currentFunctorsPool = functorsPool.slice();

		while ((functors = this.findFunctors(currentFunctorsPool)) && functors.length) {
			debugVerbose("Found functors", functors);
			debugVerbose("Object before iteration", this.object);
			functors.forEach((functor) => {
				if (replacements && functor.constructor.name in replacements) {
					this.object = replacements[functor.constructor.name](this.object);
				} else {
					this.object = functor.move(this.object);
				}
				if (!this.validateProduces(this.object, functor)) {
					throw new Error(
						`Produces validation failed for functor ${
							functor.constructor.name
						} with produces ${JSON.stringify(
							functor.produces
						)} and resulting object ${JSON.stringify(this.object, null, 2)}`
					);
				}
			});
			currentFunctorsPool = currentFunctorsPool.filter((f) => !functors.includes(f));
			debugShortFunctor(
				`[${functors
					.map((functor) =>
						functor.subFunctors.length
							? `--- [${functor.subFunctors
									.map((f) => f.constructor.name)
									.join(", ")}] ---`
							: functor.constructor.name
					)
					.join(", ")}]`
			);
			debugShortObject(diff(prevObject, this.object));
			prevObject = { ...this.object };
			debugVerbose("Object after iteration", this.object);
		}
	}

	findFunctors(functorsPool: IFunctor[], justPass?: boolean): IFunctor[] {
		const ret: IFunctor[] = [];

		functorsPool.forEach((functor) => {
			if (
				this.producesAllow(functor.produces, this.object) &&
				this.requiresAllow(functor.requires, this.object, justPass)
			) {
				ret.push(functor);
			}
		});

		return ret;
	}

	movePass(functorsPool: IFunctor[]): void {
		let functors;

		while ((functors = this.findFunctors(functorsPool, true)) && functors.length) {
			debugVerbose(`Found ${functors.length} functor(s)`, functors);
			debugVerbose("Object before iteration", this.object);
			functors.forEach((functor) => {
				if (Array.isArray(functor.produces)) {
					this.object = {
						...this.object,
						...functor.produces.reduce((a, b) => {
							typeof b === "object" ? (a[b.rewritable] = true) : (a[b] = true);
							return a;
						}, {} as any),
					};
				} else {
					// TODO: DRY?
					this.object = functor.produces.exactAspects.reduce((a, b) => {
						typeof b === "object" ? (a[b.rewritable] = true) : (a[b] = true);
						return a;
					}, {} as any);
				}
			});

			debugVerbose("Object after iteration", this.object);
		}
	}

	private producesAllow(functorProduces: IFunctor["produces"], obj: IObject): boolean {
		const produces = Array.isArray(functorProduces)
			? functorProduces
			: functorProduces.exactAspects;

		return produces.every((product) =>
			typeof product === "object" && "rewritable" in product
				? true
				: obj[product] === undefined
		);
	}

	private requiresAllow(
		functorRequires: IFunctor["requires"],
		obj: IObject,
		justPass?: boolean
	): boolean {
		return functorRequires.every((req) => {
			if (typeof req === "object") {
				if ("undef" in req) {
					return obj[req.undef] === undefined;
				} else if ("someTruthy" in req) {
					return req.someTruthy.some((aspect) => !!obj[aspect]);
				} else if ("lambda" in req) {
					return (
						obj[req.aspect] !== undefined && (!!justPass || req.lambda(obj[req.aspect]))
					);
				}
				return false;
			} else {
				return obj[req] !== undefined;
			}
		});
	}

	private validateProduces(obj: IObject, functor: IFunctor): boolean {
		if (Array.isArray(functor.produces)) {
			return functor.produces.every((product) => {
				if (typeof product !== "object") {
					if (!(product in obj)) {
						debug(
							`Produces validation failed for ${functor.constructor.name}: ${product} not found in resulting object`,
							obj
						);
					}
					return product in obj;
				}
				return false;
			});
		} else {
			const objKeys = Object.keys(obj);
			const prodKeys = Object.keys(functor.produces.exactAspects);

			if (
				objKeys.length === prodKeys.length &&
				prodKeys.every((prodKey) => objKeys.includes(prodKey))
			) {
				return true;
			} else {
				debug(
					`Produces validation failed for ${functor.constructor.name}: Object has keys: ${objKeys}. But expected to have only keys: ${prodKeys}`,
					obj
				);
				return false;
			}
		}
	}

	// private getRequiredAspects(extendedAspect: IExtendedAspect): IRequiredAspect[] {
	// 	const ret: IRequiredAspect[] = [];
	// 	const list = this.getFunctorsProducing(extendedAspect, this.functors);

	// 	if (list.length) {
	// 		list.forEach((functor) => {
	// 			const req: IRequiredAspect = {
	// 				functorName: functor.constructor.name,
	// 				forAspect: extendedAspect,
	// 				requires: [],
	// 			};

	// 			functor.requires.forEach((product) => {
	// 				req.requires.push(
	// 					typeof product === "object"
	// 						? {
	// 								aspect: product.aspect,
	// 								type: AspectType.SpecificValue,
	// 						  }
	// 						: { aspect: product, type: AspectType.Exists }
	// 				);
	// 			});

	// 			ret.push(req);
	// 		});
	// 	} else {
	// 		ret.push({
	// 			functorName: "NonExistingFunctor",
	// 			forAspect: extendedAspect,
	// 			requires: [],
	// 		});
	// 	}

	// 	return ret;
	// }
}
