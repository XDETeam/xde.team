import { duplicates } from "./duplicates";

it("should return duplicates array has", () => {
	expect(duplicates([1, 1, 2, 1])).toEqual([1]);
	expect(duplicates([1, false, 2, 1, false, 0])).toEqual([1, false]);
});
