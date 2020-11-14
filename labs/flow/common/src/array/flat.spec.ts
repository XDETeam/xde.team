import { flatDeep } from "./flat";

it("should flat array deep", () => {
	expect(flatDeep([1, 2])).toEqual([1, 2]);
	expect(flatDeep([[1], [2]])).toEqual([1, 2]);
	expect(flatDeep([["fdsfdsf"], ["2212112"]])).toEqual(["fdsfdsf", "2212112"]);
	expect(flatDeep([[1], [2, [3, [4], [5]]]])).toEqual([1, 2, 3, 4, 5]);
	expect(flatDeep([[null], [undefined, [false, [true]]]])).toEqual([
		null,
		undefined,
		false,
		true,
	]);
});
