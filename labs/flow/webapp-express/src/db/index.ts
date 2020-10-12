import { createConnection } from "typeorm";
import { User } from "../models/user/User";

export const connection = createConnection({
	type: "postgres",
	host: "localhost",
	port: +process.env.PG_PORT!,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	entities: [User],
	synchronize: true,
	logging: false,
}).catch((e) => {
	return {
		error: e,
	};
});
