import { IDictionary, TUndefined } from "@xde.labs/common";
import { CompositeFunctor, IFunctorTo, IFunctorFrom, IFunctor } from "@xde.labs/flow-manager";
import { TPriority, Priority } from "@xde.labs/aspects";

import { PrioritizedInitially, RePrioritized } from "./PrimitivePriority";

export class PriorityInitialWrapper<
	TFrom extends IDictionary,
	TTo extends IDictionary,
	TPriorityValue extends number
> extends CompositeFunctor<TFrom & TUndefined<TPriority>, TTo & TPriority<TPriorityValue>> {
	from = [] as Array<IFunctorFrom<TFrom>>;
	to = [Priority] as Array<IFunctorTo<TTo & TPriority<TPriorityValue>>>;

	constructor(
		public name: string,
		from: Array<IFunctorFrom<TFrom>>,
		to: Array<IFunctorTo<TTo>>,
		public priority: TPriorityValue
	) {
		super();
		this.from.push(...from);
		this.to.push(...to);
		this.addChildren(new PrioritizedInitially(priority));
	}
}

export class RePrioritizedWrapper<
	TFrom extends IDictionary,
	TTo extends IDictionary,
	TFromPriority extends number = number,
	TToPriority extends number = number
> extends CompositeFunctor<TFrom & TPriority<TFromPriority>, TTo & TPriority<TToPriority>> {
	from = ([
		{
			aspect: Priority,
			lambda: (obj: TPriority<TFromPriority>) =>
				this.fromPriority
					? obj[Priority] === this.fromPriority
					: obj[Priority] !== undefined,
		},
	] as unknown) as Array<IFunctorFrom<TFrom & TPriority<TFromPriority>>>;
	to = ([
		{
			aspect: Priority,
			lambda: (obj: TPriority<TToPriority>) => obj[Priority] === this.toPriority,
			force: true,
		},
	] as unknown) as Array<IFunctorTo<TTo & TPriority<TToPriority>>>;

	constructor(
		public name: string,
		from: Array<IFunctorFrom<TFrom>>,
		to: Array<IFunctorTo<TTo>>,
		public toPriority: TToPriority,
		public fromPriority?: TFromPriority
	) {
		super();
		this.from.push(...from);
		this.to.push(...to);
		this.addChildren(new RePrioritized<TToPriority, TFromPriority>(toPriority, fromPriority));
	}
}
