import { EndpointErrorCode } from "@xde/endpoint-error-codes";
import { secureApiRoute, nonExisting, appAxios } from "../common";

it("should return 404 on non-existing api secure route", async () => {
	const res = await appAxios.get(secureApiRoute(nonExisting) + "").catch((err) => err.response);
	expect(res.status).toEqual(404);
	expect(res.data).toEqual({ result: false, code: EndpointErrorCode.NotFound });
});
