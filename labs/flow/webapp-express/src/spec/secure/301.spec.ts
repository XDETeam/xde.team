import {
	appAxios,
	getAdminHeaders,
	nonExisting,
	nonSecureAdminRoute,
	secureAdminRoute,
} from "../common";

it("should return 301 for non-existing admin non-secure route for admin user", async () => {
	const res = await appAxios
		.get(nonSecureAdminRoute(nonExisting) + "", {
			headers: getAdminHeaders(),
			maxRedirects: 0,
		})
		.catch((err) => err.response);
	expect(res.status).toEqual(301);
	expect(res.headers).toEqual(
		expect.objectContaining({
			location: secureAdminRoute(nonExisting) + "",
		})
	);
});
