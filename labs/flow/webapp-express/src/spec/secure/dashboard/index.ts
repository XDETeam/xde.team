import { nonSecureAdminRoute, secureAdminRoute } from "../../common";

export const nonSecureAdminDashboardRoute = nonSecureAdminRoute("dashboard");
export const secureAdminDashboardRoute = secureAdminRoute("dashboard");
