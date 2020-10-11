import Adapters, { TypeORMUserModel } from "next-auth/adapters";

// Extend the built-in models using class inheritance
export class User extends TypeORMUserModel {
	// You can extend the options in a model but you should not remove the base
	// properties or change the order of the built-in options on the constructor
	constructor(name, email, image, emailVerified) {
		super(name, email, image, emailVerified);
	}
}

export const UserSchema = {
	name: "User",
	target: User,
	columns: {
		...Adapters.TypeORM.Models.User.schema.columns,
		// Adds a phoneNumber to the User schema
		phoneNumber: {
			type: "varchar",
			nullable: true,
		},
	},
};

export default {
	User: {
		model: User,
		schema: UserSchema,
	},
};
