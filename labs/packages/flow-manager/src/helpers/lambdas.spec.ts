import { Some, Optional, Undefined, Exists } from "./lambdas";

it("should test some", () => {
	expect(Some({ A: undefined })).toEqual(false);
	expect(Some({ A: false })).toEqual(true);
	expect(Some({ A: undefined, B: 1 })).toEqual(true);
	expect(Some([{ A: undefined, B: undefined }, { C: undefined }])).toEqual(false);
	expect(Some([{ A: undefined, B: true }, { C: undefined }])).toEqual(false);
	expect(Some([{ A: true, B: true }, { C: undefined }])).toEqual(true);
});

it("should test optional", () => {
	expect(Optional({ A: undefined })).toEqual(true);
});

it("should test undefined", () => {
	expect(Undefined({ A: undefined })).toEqual(true);
	expect(Undefined({ A: undefined, B: true })).toEqual(false);
	expect(() => Undefined([{ A: undefined, B: true }, { C: undefined }])).toThrow(
		/array of aspects arrays/i
	);
});

it("should test exists", () => {
	expect(Exists({ A: undefined })).toEqual(false);
	expect(Exists({ A: undefined, B: true })).toEqual(false);
	expect(() => Exists([{ A: undefined, B: true }, { C: undefined }])).toThrow(
		/array of aspects arrays/i
	);
});
