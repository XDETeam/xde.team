import { nonSecureBaseRoute, secureBaseRoute, nonExisting, appAxios } from "./common";

it("should return 404 on non-existing secure route", async () => {
	const res = await appAxios.get(secureBaseRoute(nonExisting) + "").catch((err) => err.response);
	expect(res.status).toEqual(404);
});

it("should return 404 on non-existing non-secure route", async () => {
	const res = await appAxios
		.get(nonSecureBaseRoute(nonExisting) + "")
		.catch((err) => err.response);
	expect(res.status).toEqual(404);
});
