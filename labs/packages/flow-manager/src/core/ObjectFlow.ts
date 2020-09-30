import { diff } from "deep-object-diff";

import { IObject } from "./models";
import { IFunctor } from "./Functor";
import { appDebug } from "./helpers/debug";

const debug = appDebug.extend("ObjectFlow");
const debugVerbose = debug.extend("verbose");
const debugShort = debug.extend("short");
const debugShortFunctor = debugShort.extend("functor");
const debugShortObject = debugShort.extend("object");

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
				if (replacements && functor.name in replacements) {
					this.object = replacements[functor.name](this.object);
				} else {
					this.object = functor.move(this.object);
				}
				if (!this.validateProduces(this.object, functor)) {
					throw new Error(
						`Produces validation failed for functor ${
							functor.name
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
							? `--- [${functor.subFunctors.map((f) => f.name).join(", ")}] ---`
							: functor.name
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
				this.object = {
					...this.object,
					...functor.produces.reduce((a, b) => {
						if (typeof b === "object") {
							if ("undef" in b) {
								a[b.undef] = undefined;
							} else if ("aspect" in b) {
								a[b.aspect] = true;
							} else if ("some" in b) {
								b.some.forEach((x) => {
									if (Array.isArray(x)) {
										x.forEach((y) => (a[y] = true));
									} else {
										a[x] = true;
									}
								});
							} else if ("optional" in b) {
								a[b.optional] = true;
							}
						} else {
							a[b] = true;
						}
						return a;
					}, {} as any),
				};
			});

			debugVerbose("Object after iteration", this.object);
		}
	}

	private producesAllow(functorProduces: IFunctor["produces"], obj: IObject): boolean {
		return functorProduces.every((product) => {
			if (typeof product === "object") {
				if ("rewritable" in product) {
					if (product.rewritable) {
						return true;
					} else {
						if ("aspect" in product) {
							return obj[product.aspect] === undefined;
						}
					}
				} else if ("undef" in product) {
					// TODO: should we check if defined before?
					return true;
				} else if ("optional" in product) {
					return true;
				}
			} else {
				return obj[product] === undefined;
			}
		});
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
				} else if ("some" in req) {
					return req.some.some((aspect) => {
						if (Array.isArray(aspect)) {
							return aspect.every((a) => !!obj[a]);
						} else {
							return !!obj[aspect];
						}
					});
				} else if ("lambda" in req) {
					return (
						obj[req.aspect] !== undefined && (!!justPass || req.lambda(obj[req.aspect]))
					);
				} else if ("optional" in req) {
					return true;
				}
				return false;
			} else {
				return obj[req] !== undefined;
			}
		});
	}

	// TODO: Test coverage
	private validateProduces(obj: IObject, functor: IFunctor): boolean {
		return functor.produces.every((product) => {
			if (typeof product === "object") {
				if ("undef" in product) {
					if (obj[product.undef] !== undefined) {
						debug(
							`Produces validation failed for ${functor.name}: ${product.undef} should be undefined`,
							obj
						);
					}
					return obj[product.undef] === undefined;
				} else if ("some" in product) {
					const res = product.some.some((aspect) => {
						if (Array.isArray(aspect)) {
							return aspect.every((a) => !!obj[a]);
						} else {
							return !!obj[aspect];
						}
					});
					if (!res) {
						debug(
							`Produces validation failed for ${functor.name}: At least one of ${product.some} should be truthy`,
							obj
						);
					}

					return res;
				} else if ("aspect" in product) {
					// TODO: DRY
					if (!(product.aspect in obj)) {
						debug(
							`Produces validation failed for ${functor.name}: ${product.aspect} not found in resulting object`,
							obj
						);
					}
					return product.aspect in obj;
				} else if ("optional" in product) {
					return true;
				}
				return false;
			} else {
				if (!(product in obj)) {
					debug(
						`Produces validation failed for ${functor.name}: ${product} not found in resulting object`,
						obj
					);
				}
				return product in obj;
			}
		});
	}
}
