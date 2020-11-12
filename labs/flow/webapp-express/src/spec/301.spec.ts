import { nonSecureBaseRoute, nonExisting, nonSecureRootRoute, appAxios } from "./common";

it("should return 301 on non-secure route", async () => {
	const res = await appAxios
		.get(nonSecureBaseRoute(nonExisting) + "")
		.catch((err) => err.response);
	expect(res.status).toEqual(301);
	expect(res.headers).toEqual({});

	const res2 = await appAxios.get(nonSecureRootRoute + "").catch((err) => err.response);
	expect(res2.status).toEqual(301);
	expect(res2.headers).toEqual({});
});
