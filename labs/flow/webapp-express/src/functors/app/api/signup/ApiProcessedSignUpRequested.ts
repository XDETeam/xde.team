import { TCommonApiResponse, Password } from "@xde/common";
import { Functor, Optional } from "@xde/flow-manager";

import { connection } from "../../../../db";
import { Aspect } from "../../../../models/aspects";
import { TSignUpRequest } from "../../../../models/user/SignUpRequest";
import { User } from "../../../../models/user/User";

export class ApiProcessedSignUpRequested extends Functor<Aspect> {
	name = "ApiProcessedSignUpRequested";
	from = [Aspect.ApiValidSignUpRequest];
	to = [
		Aspect.GeneratedApiBody,
		Aspect.ResponseCode,
		{
			aspect: [Aspect.LocationHeader],
			lambda: Optional,
		},
	];

	async map(obj: { [Aspect.ApiValidSignUpRequest]: TSignUpRequest }): Promise<{}> {
		let error: string | undefined = undefined;

		const createdId: number | undefined = await connection
			.then(async (connection) => {
				if ("error" in connection) {
					error = connection.error;
					return undefined;
				} else {
					const user = new User();
					user.name = obj[Aspect.ApiValidSignUpRequest].name;
					user.email = obj[Aspect.ApiValidSignUpRequest].email;
					user.password = Password.hash(
						obj[Aspect.ApiValidSignUpRequest].password,
						process.env.SALT!
					);

					return connection.manager.save(user).then((user) => user.id);
				}
			})
			.catch((e: string) => {
				error = e;
				return undefined;
			});

		if (createdId) {
			const response: TCommonApiResponse<{ id: User["id"] }> = {
				result: true,
				data: { id: createdId },
			};
			return {
				...obj,
				[Aspect.ResponseCode]: 201,
				[Aspect.LocationHeader]: "/",
				[Aspect.GeneratedApiBody]: response,
			};
		} else {
			const response: TCommonApiResponse = {
				result: false,
				code: "InternalServerError",
				message: error,
			};
			return {
				...obj,
				[Aspect.ResponseCode]: 500,
				[Aspect.GeneratedApiBody]: response,
			};
		}
	}
}

const apiProcessedSignUpRequestedInstance = new ApiProcessedSignUpRequested();
export default apiProcessedSignUpRequestedInstance;
