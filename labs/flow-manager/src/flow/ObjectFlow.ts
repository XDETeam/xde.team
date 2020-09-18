import { IObject } from "../models";
import { IFunctor } from "../functor/Functor";

export interface IObjectFlow {
	move(functorsPool: IFunctor[]): void;
}

export class ObjectFlow implements IObjectFlow {
	constructor(public object: IObject) {}

	move(functorsPool: IFunctor[]): void {
		let functors;

		while ((functors = this.findFunctors(functorsPool)) && functors.length) {
			console.log("Found functors", functors);
			console.log("Object before iteration", this.object);
			functors.forEach((functor) => (this.object = functor.move(this.object)));
			console.log("Object after iteration", this.object);
		}
	}

	findFunctors(functorsPool: IFunctor[]): IFunctor[] {
		const ret: IFunctor[] = [];

		functorsPool.forEach((functor) => {
			if (
				functor.produces.every((produce) => this.object[produce] === undefined) &&
				functor.requires.every((req) => {
					if (typeof req === "object") {
						return (
							this.object[req.aspect] !== undefined &&
							req.lambda(this.object[req.aspect])
						);
					} else {
						return !!this.object[req];
					}
				})
			) {
				ret.push(functor);
			}
		});

		return ret;
	}
}
