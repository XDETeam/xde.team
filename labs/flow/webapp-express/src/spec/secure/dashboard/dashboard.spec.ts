import { appAxios, getAdminHeaders } from "../../common";
import { nonSecureAdminDashboardRoute, secureAdminDashboardRoute } from "./index";

it("should return 301 for dashboard admin non-secure route for admin user", async () => {
	const res = await appAxios
		.get(nonSecureAdminDashboardRoute + "", {
			headers: getAdminHeaders(),
		})
		.catch((err) => err.response);
	expect(res.status).toEqual(301);
	expect(res.headers).toBe({});
});

it("should return 301 for dashboard admin non-secure route for non-admin user", async () => {
	const res = await appAxios.get(secureAdminDashboardRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(301);
	expect(res.headers).toBe({});
});

it("should return 401 for dashboard admin secure route for non-admin user", async () => {
	const res = await appAxios.get(secureAdminDashboardRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(401);
});

it("should return 200 for dashboard admin secure route for admin user", async () => {
	const res = await appAxios
		.get(secureAdminDashboardRoute + "", {
			headers: getAdminHeaders(),
		})
		.catch((err) => err.response);
	expect(res.status).toEqual(200);
	expect(res.data).toMatch(/dashboard/);
});
