import { nonSecureApiRoute, secureApiRoute } from "../../common";
import { TSignInRequest } from "../../../models/user/SignInRequest";
import { TSignUpRequest } from "../../../models/user/SignUpRequest";

export const nonSecureSignInRoute = nonSecureApiRoute("sign-in");
export const secureSignInRoute = secureApiRoute("sign-in");

export const nonValidSignInRequest: TSignInRequest = { name: "aa", password: "aa" };
export const validSignInRequest: TSignInRequest = {
	name: "namename",
	password: "some password password",
};
export const signInSignUpRequest: TSignUpRequest = {
	name: "testuser001",
	password: "testuser001password",
	email: "testuser001@testuser001.oops",
};
