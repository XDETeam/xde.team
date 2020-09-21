import { diff } from "deep-object-diff";

import { IObject } from "./models";
import { IFunctor } from "./Functor";
import { Aspect, AspectState, AspectsState } from "./models";
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
			});
			currentFunctorsPool = currentFunctorsPool.filter((f) => !functors.includes(f));
			debugShortFunctor(
				`${
					functors.length > 1
						? `[${functors.map((functor) => functor.constructor.name).join(", ")}]`
						: functors[0].constructor.name
				}`
			);
			debugShortObject(diff(prevObject, this.object));
			prevObject = { ...this.object };
			// debugShortObject(
			// 	`[${Object.keys(this.object)
			// 		.map((key) => `${key}: ${this.object[key]}`)
			// 		.join(", ")}]`
			// );
			debugVerbose("Object after iteration", this.object);
		}
	}

	findFunctors(functorsPool: IFunctor[]): IFunctor[] {
		const ret: IFunctor[] = [];

		functorsPool.forEach((functor) => {
			if (
				// TODO: Do we need this line?
				functor.produces.every((produce) => this.object[produce] === undefined) &&
				functor.requires.every((req) => {
					if (typeof req === "object") {
						if ("is" in req) {
							switch (req.is) {
								case AspectState.Undefined: {
									return this.object[req.aspect] === undefined;
								}
							}
						} else if ("are" in req) {
							switch (req.are) {
								case AspectsState.SomeTruthy: {
									return req.aspects.some((aspect) => !!this.object[aspect]);
								}
							}
						} else {
							return (
								this.object[req.aspect] !== undefined &&
								req.lambda(this.object[req.aspect])
							);
						}
					} else {
						return this.object[req] !== undefined;
					}
				})
			) {
				ret.push(functor);
			}
		});

		return ret;
	}

	movePass(functorsPool: IFunctor[]): void {
		let functors;

		while ((functors = this.findFunctorsPass(functorsPool)) && functors.length) {
			debugVerbose(`Found ${functors.length} functor(s)`, functors);
			debugVerbose("Object before iteration", this.object);
			functors.forEach(
				(functor) =>
					(this.object = {
						...this.object,
						...functor.produces.reduce((a, b) => {
							a[b] = true;
							return a;
						}, {} as any),
					})
			);

			debugVerbose("Object after iteration", this.object);
		}
	}

	findFunctorsPass(functorsPool: IFunctor[]): IFunctor[] {
		const ret: IFunctor[] = [];

		functorsPool.forEach((functor) => {
			if (
				functor.produces.every((produce) => this.object[produce] === undefined) &&
				functor.requires.every((req) => {
					if (typeof req === "object") {
						if ("is" in req) {
							switch (req.is) {
								case AspectState.Undefined: {
									return this.object[req.aspect] === undefined;
								}
							}
						} else if ("are" in req) {
							switch (req.are) {
								case AspectsState.SomeTruthy: {
									return req.aspects.some((aspect) => !!this.object[aspect]);
								}
							}
						} else {
							return this.object[req.aspect] !== undefined;
						}
					} else {
						return this.object[req] !== undefined;
					}
				})
			) {
				ret.push(functor);
			}
		});

		return ret;
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
