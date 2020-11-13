import { TSignUpRequest } from "../../../models/user/SignUpRequest";
import { nonSecureApiRoute, secureApiRoute } from "../../common";

export const nonSecureSignUpRoute = nonSecureApiRoute("sign-up");
export const secureSignUpRoute = secureApiRoute("sign-up");

export const nonValidSignUpRequest: TSignUpRequest = { name: "aa", password: "aa", email: "aa" };
export const validSignUpRequest: TSignUpRequest = {
	name: "namename2",
	password: "some password password2",
	email: "namename@namename.oops",
};
