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
								b.some.forEach((x) => (a[x] = true));
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
					return true;
				} else if ("undef" in product) {
					// TODO: should we check if defined before?
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
					return req.some.some((aspect) => !!obj[aspect]);
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
					const res = product.some.some((aspect) => !!obj[aspect]);
					debug(
						`Produces validation failed for ${functor.name}: At least one of ${product.some} should be truthy`,
						obj
					);
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

	// TODO: Test coverage
	public static explainFunctor(
		functor: IFunctor,
		functorNameNamespace: string = ""
	): IFunctorExplained {
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
			functorName: `${functorNameNamespace ? `${functorNameNamespace}.` : ""}${functor.name}`,
			from,
			to,
			children: functor.subFunctors.length
				? functor.subFunctors.map((f) =>
						this.explainFunctor(
							f,
							`${functorNameNamespace ? `${functorNameNamespace}.` : ""}${
								functor.name
							}`
						)
				  )
				: undefined,
		};
	}
}
