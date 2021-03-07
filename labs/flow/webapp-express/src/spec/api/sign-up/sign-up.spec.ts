import { EndpointErrorCode } from "@xde.labs/endpoint";
import helperUserDeletedInstance, {
	HelperUserDeletedAspect,
} from "../../../functors/_helpers/HelperUserDeleted";
import { appAxios } from "../../common";
import {
	nonSecureSignUpRoute,
	secureSignUpRoute,
	nonValidSignUpRequest,
	validSignUpRequest,
} from "./index";

it("should return 400 on non-secure api sign-up route", async () => {
	const res = await appAxios.post(nonSecureSignUpRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(400);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.InsecureApiRequest,
	});
});

it("should return 405 on secure api sign-up route with wrong method", async () => {
	const res = await appAxios.get(secureSignUpRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(405);
	expect(res.headers).toEqual(
		expect.objectContaining({
			allow: "POST",
		})
	);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.MethodNotAllowed,
	});
});

it("should return 422 on secure api sign-up route with wrong model", async () => {
	const res = await appAxios
		.post(secureSignUpRoute + "", { some: "value" })
		.catch((err) => err.response);
	expect(res.status).toEqual(422);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.UnprocessableEntity,
		details: [
			expect.objectContaining({ property: "name" }),
			expect.objectContaining({ property: "password" }),
			expect.objectContaining({ property: "email" }),
		],
	});

	const res2 = await appAxios
		.post(secureSignUpRoute + "", nonValidSignUpRequest)
		.catch((err) => err.response);
	expect(res2.status).toEqual(422);
	expect(res2.data).toEqual({
		result: false,
		code: EndpointErrorCode.UnprocessableEntity,
		details: [
			expect.objectContaining({ property: "name" }),
			expect.objectContaining({ property: "password" }),
			expect.objectContaining({ property: "email" }),
		],
	});
});

it("should sign up success with proper data", async () => {
	expect(
		await helperUserDeletedInstance.distinct({
			[HelperUserDeletedAspect]: validSignUpRequest,
		})
	).toEqual(expect.objectContaining({ Valid: true }));

	const res = await appAxios.post(secureSignUpRoute + "", validSignUpRequest);
	expect(res.status).toEqual(201);
	expect(res.data).toEqual({
		result: true,
		data: { id: expect.any(Number) },
	});
});
