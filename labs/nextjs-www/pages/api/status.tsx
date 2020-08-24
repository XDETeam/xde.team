import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const Handler: RequestListener = (request, response) => {
	response.statusCode = 200;
	response.end(JSON.stringify({ status: "OK" }));
};

export default Handler;
