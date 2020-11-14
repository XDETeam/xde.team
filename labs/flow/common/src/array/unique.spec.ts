import { unique } from "./unique";

it("should return unique array", () => {
	expect(unique([1, 1, 2, 1])).toEqual([1, 2]);
	expect(unique([[1], [2]])).toEqual([[1], [2]]);
	expect(unique(["sss", "sss", "1"])).toEqual(["sss", "1"]);
});
