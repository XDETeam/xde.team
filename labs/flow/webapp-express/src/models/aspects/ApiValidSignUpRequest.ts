import { TSignUpRequest } from "../user/SignUpRequest";

export const ApiValidSignUpRequest = "ApiValidSignUpRequest" as const;
export type TApiValidSignUpRequest = {
	[ApiValidSignUpRequest]: TSignUpRequest;
};
