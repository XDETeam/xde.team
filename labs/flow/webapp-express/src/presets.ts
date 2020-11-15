require("dotenv").config();

import "reflect-metadata";
import { connection } from "./db";

(async () => {
	await connection();
})();
