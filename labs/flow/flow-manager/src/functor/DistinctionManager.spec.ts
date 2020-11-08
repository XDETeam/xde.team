import distinctionManagerInstance from "./DistinctionManager";

it("should merge distinctions", () => {
	expect(
		distinctionManagerInstance.merge([{ a: "some", b: undefined, c: { a: 1, b: 2 } }])
	).toStrictEqual({ a: "some", b: undefined, c: { a: 1, b: 2 } });

	expect(
		distinctionManagerInstance.merge([{ a: "some" }, { b: undefined }, { c: { a: 1, b: 2 } }])
	).toStrictEqual({ a: "some", b: undefined, c: { a: 1, b: 2 } });

	expect(
		distinctionManagerInstance.merge([
			{ a: "some" },
			{ a: undefined },
			{ c: { a: 1, b: 2 } },
			{ c: { a: 2 } },
		])
	).toStrictEqual({ a: undefined, c: { a: 2 } });
});
