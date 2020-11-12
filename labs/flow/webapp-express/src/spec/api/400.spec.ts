import { EndpointErrorCode } from "@xde/endpoint-error-codes";
import { nonSecureApiRoute, nonExisting, appAxios } from "../common";

it("should return 400 on non-secure api route", async () => {
	const res = await appAxios
		.get(nonSecureApiRoute(nonExisting) + "")
		.catch((err) => err.response);
	expect(res.status).toEqual(400);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.InsecureApiRequest,
	});
});
