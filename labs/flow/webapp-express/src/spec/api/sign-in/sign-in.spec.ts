import { HttpStatusCode } from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";
import apiProcessedSignUpRequestedInstance from "../../../functors/app/api/signup/ApiProcessedSignUpRequested";
import helperUserDeletedInstance, {
	HelperUserDeletedAspect,
} from "../../../functors/_helpers/HelperUserDeleted";
import { ApiValidSignUpRequest } from "../../../models/aspects";
import { appAxios } from "../../common";
import {
	nonSecureSignInRoute,
	secureSignInRoute,
	nonValidSignInRequest,
	validSignInRequest,
	signInSignUpRequest,
} from "./index";

it("should return 400 on non-secure api sign-in route", async () => {
	const res = await appAxios.post(nonSecureSignInRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(400);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.InsecureApiRequest,
	});
});

it("should return 405 on secure api sign-in route with wrong method", async () => {
	const res = await appAxios.get(secureSignInRoute + "").catch((err) => err.response);
	expect(res.status).toEqual(405);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.MethodNotAllowed,
	});
});

it("should return 422 on secure api sign-in route with wrong model", async () => {
	const res = await appAxios
		.post(secureSignInRoute + "", { some: "value" })
		.catch((err) => err.response);
	expect(res.status).toEqual(422);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.UnprocessableEntity,
	});

	const res2 = await appAxios
		.post(secureSignInRoute + "", nonValidSignInRequest)
		.catch((err) => err.response);
	expect(res2.status).toEqual(422);
	expect(res2.data).toEqual({
		result: false,
		code: EndpointErrorCode.UnprocessableEntity,
	});
});

it("should return 401 on secure api sign-in route with valid request but wrong credentials", async () => {
	const res = await appAxios
		.post(secureSignInRoute + "", validSignInRequest)
		.catch((err) => err.response);
	expect(res.status).toEqual(401);
	expect(res.data).toEqual({
		result: false,
		code: EndpointErrorCode.WrongCredentials,
	});
});

it("should sign in success with proper credentials", async () => {
	expect(
		await helperUserDeletedInstance.distinct({
			[HelperUserDeletedAspect]: signInSignUpRequest,
		})
	).toEqual(expect.objectContaining({ Valid: true }));

	expect(
		await apiProcessedSignUpRequestedInstance.distinct({
			[ApiValidSignUpRequest]: signInSignUpRequest,
		})
	).toEqual(expect.objectContaining({ [HttpStatusCode]: 201 }));

	const res = await appAxios.post(secureSignInRoute + "", signInSignUpRequest);
	expect(res.status).toEqual(200);
	expect(res.data).toEqual({
		result: true,
		code: EndpointErrorCode.MethodNotAllowed,
	});
});
