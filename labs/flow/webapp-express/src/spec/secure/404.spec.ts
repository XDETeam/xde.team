import { appAxios, getAdminHeaders, nonExisting, secureAdminRoute } from "../common";

it("should return 404 for non-existing admin secure route for admin user", async () => {
	const res = await appAxios
		.get(secureAdminRoute(nonExisting) + "", {
			headers: getAdminHeaders(),
		})
		.catch((err) => err.response);
	expect(res.status).toEqual(404);
	expect(res.data).toMatch(/not found/i);
});
