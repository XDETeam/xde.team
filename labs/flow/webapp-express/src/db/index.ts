import { createConnection } from "typeorm";
import { isProduction } from "@xde.labs/common";

import { User } from "../models/user/User";

// TODO: after 100 connection per second - perf drops significantly
// why? pool max is 10 clients simultaneously
// https://node-postgres.com/api/pool
// "extra": {
//	"max": 5
// 100
//}

export const connection = () =>
	createConnection({
		type: "postgres",
		host: "localhost",
		port: +process.env.PG_PORT!,
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		entities: [User],
		// TODO: Be careful with this option and don't use this in production - otherwise you can lose production data
		synchronize: !isProduction(),
		logging: false,
	});
