import { VisitorRole } from "@xde/aspects";
import { curryRoute } from "@xde/common";
import https from "https";
import fs from "fs";
import path from "path";
import axios from "axios";

import { APP_TLS_PORT, APP_HTTP_PORT } from "../config";
import { VisitorRoledCookie } from "../functors/security/HttpVisitorRoled";

export const secureBaseRoute = curryRoute(`https://localhost:${APP_TLS_PORT}`);
export const nonSecureBaseRoute = curryRoute(`http://localhost:${APP_HTTP_PORT}`);

export const secureRootRoute = secureBaseRoute("/");
export const nonSecureRootRoute = nonSecureBaseRoute("/");

export const secureApiRoute = secureBaseRoute("api");
export const nonSecureApiRoute = nonSecureBaseRoute("api");

export const secureAdminRoute = secureBaseRoute("security");
export const nonSecureAdminRoute = nonSecureBaseRoute("security");

export const nonExisting = "/non-existing/path";

export const getAdminHeaders = () => ({
	Cookie: `${VisitorRoledCookie}=${VisitorRole.Admin};`,
});

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
	cert: fs.readFileSync(path.join(__dirname, "./../../dev/localhost.crt")),
	key: fs.readFileSync(path.join(__dirname, "./../../dev/localhost.key")),
});

export const appAxios = axios.create({ httpsAgent });
