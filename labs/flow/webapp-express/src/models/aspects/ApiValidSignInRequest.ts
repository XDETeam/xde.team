import { TSignInRequest } from "../user/SignInRequest";

export const ApiValidSignInRequest = "ApiValidSignInRequest" as const;
export type TApiValidSignInRequest = {
	[ApiValidSignInRequest]: TSignInRequest;
};
