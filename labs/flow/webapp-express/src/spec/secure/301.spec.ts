import { appAxios, getAdminHeaders, nonExisting, nonSecureAdminRoute } from "../common";

it("should return 301 for non-existing admin non-secure route for admin user", async () => {
	const res = await appAxios
		.get(nonSecureAdminRoute(nonExisting) + "", {
			headers: getAdminHeaders(),
		})
		.catch((err) => err.response);
	expect(res.status).toEqual(301);
	expect(res.headers).toBe({});
});
