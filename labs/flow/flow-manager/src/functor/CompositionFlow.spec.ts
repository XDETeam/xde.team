import { CompositionFlow } from "./CompositionFlow";
import { PrimitiveFunctor } from "./PrimitiveFunctor";

export class FirstToSecond extends PrimitiveFunctor<{ first: boolean }, { second: boolean }> {
	name = "FirstToSecond";
	from = ["first" as const];
	to = ["second" as const];

	distinct() {
		return {
			second: true,
		};
	}
}

export class SecondToThird extends PrimitiveFunctor<{ second: boolean }, { third: boolean }> {
	name = "SecondToThird";
	from = ["second" as const];
	to = ["third" as const];

	distinct() {
		return {
			third: true,
		};
	}
}

export class Value1ToResult extends PrimitiveFunctor<{ value: number }, { result: number }> {
	name = "Value1ToResult";
	from = [{ aspect: "value" as const, lambda: (obj: { value: number }) => obj.value === 1 }];
	to = ["result" as const];

	distinct(obj: { value: number }) {
		return {
			result: obj.value,
		};
	}
}

export class Value2ToResult extends PrimitiveFunctor<{ value: number }, { result: number }> {
	name = "Value2ToResult";
	from = [{ aspect: "value" as const, lambda: (obj: { value: number }) => obj.value === 2 }];
	to = ["result" as const];

	distinct(obj: { value: number }) {
		return {
			result: obj.value,
		};
	}
}

it("should handle simple flow", async () => {
	const flow = new CompositionFlow<any, any>({
		first: true,
	});
	await flow.process([new FirstToSecond(), new SecondToThird()]);
	expect(flow.object).toHaveProperty("first");
	expect(flow.object).toHaveProperty("second");
	expect(flow.object).toHaveProperty("third");
});

it("should handle lambda functions", async () => {
	const flow = new CompositionFlow<any, any>({
		value: 1,
	});
	await flow.process([new Value1ToResult() as any, new Value2ToResult() as any]);
	expect(flow.object).toStrictEqual({ value: 1, result: 1 });
});

it("should handle replacements of distinct functions", async () => {
	const flow = new CompositionFlow<any, any>({
		value: 2,
	});
	await flow.process([new Value1ToResult() as any, new Value2ToResult() as any], {
		[Value2ToResult.name]: () => ({ result: 3 }),
	});

	expect(flow.object).toStrictEqual({ value: 2, result: 3 });
});

it("should produce an error when resulting object does not have functor to", async () => {
	const flow = new CompositionFlow<any, any>({
		value: 2,
	});

	await expect(
		flow.process([new Value1ToResult() as any, new Value2ToResult() as any], {
			[Value2ToResult.name]: () => ({ nonexisting: 3 }),
		})
	).rejects.toThrow(/validation failed/i);
});
