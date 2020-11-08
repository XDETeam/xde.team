import { IDictionary } from "@xde/common";

import { Functor } from "./Functor";
import { AnyFunctor } from "./models";
import { CompositionFlow } from "./CompositionFlow";
import { IPrimitiveFunctor, PrimitiveFunctor } from "./PrimitiveFunctor";

export interface ICompositeFunctor<TFrom extends IDictionary, TTo extends IDictionary>
	extends IPrimitiveFunctor<TFrom, TTo> {
	children: AnyFunctor[];
	addChildren(functor: AnyFunctor | AnyFunctor[]): void;

	/**
	 * Maps from [from category] to [to category].
	 */
	map(obj: TFrom & IDictionary): Promise<TTo & IDictionary>;

	/**
	 * Replaces distinct method for one of children
	 * @param existing Replace distinct method for this functor
	 * @param newDistinct Distinct function to replace with
	 */
	distinctReplace(
		existing: IPrimitiveFunctor<any, any>,
		newDistinct: typeof existing["distinct"]
	): void;
	distinctReplacements: IDictionary<IPrimitiveFunctor<any, any>["distinct"]>;
}

export abstract class CompositeFunctor<TFrom extends IDictionary, TTo extends IDictionary>
	extends PrimitiveFunctor<TFrom, TTo>
	implements ICompositeFunctor<TFrom, TTo> {
	children: AnyFunctor[] = [];
	distinctReplacements: IDictionary<IPrimitiveFunctor<any, any>["distinct"]> = {};

	distinct(obj: TFrom & IDictionary): Promise<TTo> {
		if (!this.children.length) {
			throw new Error(
				"You should add children functors to the composite functor to be able to use it."
			);
		}

		const compositionFlow = new CompositionFlow<TFrom, TTo>(obj);

		return compositionFlow.process(this.children, this.distinctReplacements);
	}

	async map(obj: TFrom & IDictionary): Promise<TTo & IDictionary> {
		return {
			...obj,
			...(await this.distinct(obj)),
		};
	}

	addChildren(functor: AnyFunctor | AnyFunctor[]): void {
		if (Array.isArray(functor)) {
			functor.forEach((f) => this.addChild(f));
		} else {
			this.addChild(functor);
		}
	}

	distinctReplace(
		existing: IPrimitiveFunctor<any, any>,
		newDistinct: typeof existing["distinct"]
	): void {
		if (!this.children.includes(existing)) {
			throw new Error(
				"It is not possible to replace method of unregistered child functor. Add it first."
			);
		}

		this.distinctReplacements[existing.name] = newDistinct;
	}

	private addChild(functor: AnyFunctor): void {
		if (!functor.from.length) {
			throw new Error("Empty from: Functor will never be invoked.");
		}
		if (
			this.children.indexOf(functor) !== -1 ||
			this.children.findIndex((f) => f.name === functor.name) !== -1
		) {
			throw new Error(
				`Can't register duplicate functor ${functor.name} as a child for ${this.name}`
			);
		}
		this.children.push(functor);
		Functor.debugger.extend("CompositeFunctor")(
			`Functor ${functor.name} added as a child for ${this.name}`
		);
	}
}
