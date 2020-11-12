import { PrimitiveFunctor, Optional } from "@xde/flow-manager";

import { connection } from "../../db";
import { User } from "../../models/user/User";
import { TSignUpRequest } from "../../models/user/SignUpRequest";

export const HelperUserDeletedAspect = "HelperUserDeletedAspect" as const;
export type THelperUserDeletedAspect = {
	[HelperUserDeletedAspect]: Pick<TSignUpRequest, "name">;
};

export class HelperUserDeleted extends PrimitiveFunctor<
	THelperUserDeletedAspect,
	{ Error: string | undefined } & { Valid: boolean }
> {
	name = "HelperUserDeleted";
	from = [HelperUserDeletedAspect];
	to = ["Valid" as const, { aspect: "Error" as const, lambda: Optional }];

	async distinct(obj: THelperUserDeletedAspect) {
		let error: string | undefined = undefined;

		const valid: boolean = await connection
			.then(async (connection) => {
				if ("error" in connection) {
					error = connection.error;
					return false;
				} else {
					const userRepository = connection.getRepository(User);

					const user = await userRepository.delete({
						name: obj[HelperUserDeletedAspect].name,
					});

					if (user) {
						return true;
					} else {
						return false;
					}
				}
			})
			.catch((e: string) => {
				error = e;
				return false;
			});

		return {
			Valid: valid,
			Error: error,
		};
	}
}

const helperUserDeletedInstance = new HelperUserDeleted();
export default helperUserDeletedInstance;
