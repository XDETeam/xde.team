import { RequestBase } from "@xde.labs/endpoint";

import { User } from "./User";
import { UserValidationGroup } from "../index";

export type TSignUpRequest = Pick<User, "name" | "password" | "email">;

export class SingUpRequest extends RequestBase<TSignUpRequest, User> {
	parentModel = User;
	allowedKeys: Array<keyof TSignUpRequest> = ["name", "password", "email"];
	validationGroups = [UserValidationGroup.SignUp];
	constructor(public request: TSignUpRequest) {
		super();
	}
}
