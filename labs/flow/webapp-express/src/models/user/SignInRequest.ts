import { RequestBase } from "@xde.labs/endpoint";

import { User } from "./User";
import { UserValidationGroup } from "../index";

export type TSignInRequest = Pick<User, "name" | "password">;

export class SingInRequest extends RequestBase<TSignInRequest, User> {
	parentModel = User;
	allowedKeys: Array<keyof TSignInRequest> = ["name", "password"];
	validationGroups = [UserValidationGroup.SingIn];
	constructor(public request: TSignInRequest) {
		super();
	}
}
