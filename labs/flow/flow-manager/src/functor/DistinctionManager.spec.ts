import distinctionManagerInstance from "./DistinctionManager";

it("should merge distinctions", () => {
	expect(
		distinctionManagerInstance.merge([{ a: "some", b: undefined, c: { a: 1, b: 2 } }])
	).toStrictEqual({ a: "some", b: undefined, c: { a: 1, b: 2 } });

	expect(
		distinctionManagerInstance.merge([{ a: "some" }, { b: undefined }, { c: { a: 1, b: 2 } }])
	).toStrictEqual({ a: "some", b: undefined, c: { a: 1, b: 2 } });

	// TODO: throw error? Not to lose data.
	expect(
		distinctionManagerInstance.merge([
			{ a: "some" },
			{ a: undefined },
			{ c: { a: 1, b: 2 } },
			{ c: { a: 2 } },
		])
	).toStrictEqual({ a: undefined, c: { a: 2 } });
});

it("should concat arrays distinctions", () => {
	expect(distinctionManagerInstance.merge([{ a: [1, 2] }, { a: [2, 3] }])).toStrictEqual({
		a: [1, 2, 2, 3],
	});

	expect(
		distinctionManagerInstance.merge([
			{ a: [1, 2], b: [2, 2] },
			{ b: [0, 0], a: [2, 3], some: true },
		])
	).toStrictEqual({
		a: [1, 2, 2, 3],
		b: [2, 2, 0, 0],
		some: true,
	});
});

it("should throw in case exisitng to-merge array in not n array", () => {
	expect(() => distinctionManagerInstance.merge([{ a: "ss" }, { a: [2, 3] }])).toThrow(/array/);
});
