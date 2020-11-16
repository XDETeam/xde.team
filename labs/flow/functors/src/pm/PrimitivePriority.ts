import { TUndefined } from "@xde/common";
import { PrimitiveFunctor, Undefined } from "@xde/flow-manager";
import { TPriority, Priority } from "@xde/aspects";

export class PrioritizedInitially<T extends number> extends PrimitiveFunctor<
	TUndefined<TPriority>,
	TPriority<T>
> {
	name = "PrioritizedInitially";
	from = [{ aspect: Priority, lambda: Undefined }];
	to = [Priority];

	constructor(public priority: T) {
		super();
	}

	distinct() {
		return {
			[Priority]: this.priority,
		};
	}
}

export class RePrioritized<
	TToPriority extends number,
	TFromPriority extends number = number
> extends PrimitiveFunctor<TPriority<TFromPriority>, TPriority<TToPriority>> {
	name = "RePrioritized";
	from = [
		{
			aspect: Priority,
			lambda: (obj: TPriority<TFromPriority>) =>
				this.fromPriority
					? obj[Priority] === this.fromPriority
					: obj[Priority] !== undefined,
		},
	];
	to = [
		{
			aspect: Priority,
			lambda: (obj: TPriority<TToPriority>) => obj[Priority] === this.toPriority,
			force: true,
		},
	];

	constructor(public toPriority: TToPriority, public fromPriority?: TFromPriority) {
		super();
	}

	distinct() {
		return {
			[Priority]: this.toPriority,
		};
	}
}
