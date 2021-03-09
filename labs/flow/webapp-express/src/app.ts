import "./presets";

import express from "express";
import { NodejsExpressRequest, NodejsExpressResponse } from "@xde.labs/aspects";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";

import { root } from "./functors/app";
import { APP_HTTP_PORT, APP_TLS_PORT } from "./config";

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	root.map({
		[NodejsExpressRequest]: req,
		[NodejsExpressResponse]: res,
	});
});

http.createServer(app).listen(APP_HTTP_PORT, () => {
	console.log(`Insecure server is running at http://localhost:${APP_HTTP_PORT}`);
});
https
	.createServer(
		{
			key: fs.readFileSync(path.join(__dirname, "./../dev/localhost.key")),
			cert: fs.readFileSync(path.join(__dirname, "./../dev/localhost.crt")),
		},
		app
	)
	.listen(APP_TLS_PORT, () => {
		console.log(`Secure server is running at https://localhost:${APP_TLS_PORT}`);
	});
