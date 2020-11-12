import { appAxios, nonExisting, nonSecureAdminRoute, secureAdminRoute } from "../common";

it("should return 401 for non-existing admin secure route for non-admin user", async () => {
	const res = await appAxios.get(secureAdminRoute(nonExisting) + "").catch((err) => err.response);
	expect(res.status).toEqual(401);
});

it("should return 401 for non-existing admin non-secure route for non-admin user", async () => {
	const res = await appAxios
		.get(nonSecureAdminRoute(nonExisting) + "")
		.catch((err) => err.response);
	expect(res.status).toEqual(401);
});
