import { Functor, Optional } from "@xde/flow-manager";
import { TCommonApiResponse, Password } from "@xde/common";

import { connection } from "../../../../db";
import { Aspect } from "../../../../models/aspects";
import { TSignInRequest } from "../../../../models/user/SignInRequest";
import { User } from "../../../../models/user/User";

export class ApiProcessedSignInRequested extends Functor<Aspect> {
	name = "ApiProcessedSignInRequested";
	from = [Aspect.ApiValidSignInRequest];
	to = [
		Aspect.GeneratedApiBody,
		Aspect.ResponseCode,
		{
			aspect: [Aspect.LocationHeader],
			lambda: Optional,
		},
	];

	async map(obj: { [Aspect.ApiValidSignInRequest]: TSignInRequest }): Promise<{}> {
		let error: string | undefined = undefined;
		const valid: boolean = await connection
			.then(async (connection) => {
				if ("error" in connection) {
					error = connection.error;
					return false;
				} else {
					const userRepository = connection.getRepository(User);

					const user = await userRepository.findOne({
						name: obj[Aspect.ApiValidSignInRequest].name,
					});

					if (user) {
						return Password.validate(
							obj[Aspect.ApiValidSignInRequest].password,
							process.env.SALT!,
							user.password
						);
					} else {
						return false;
					}
				}
			})
			.catch((e: string) => {
				error = e;
				return false;
			});

		if (valid) {
			const response: TCommonApiResponse = {
				result: true,
			};
			return {
				...obj,
				[Aspect.ResponseCode]: 200,
				[Aspect.LocationHeader]: "/",
				[Aspect.GeneratedApiBody]: response,
			};
		} else if (!error) {
			const response: TCommonApiResponse = {
				result: false,
				code: "WrongCredentials",
			};
			return {
				...obj,
				[Aspect.ResponseCode]: 401,
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

const apiProcessedSignInRequestedInstance = new ApiProcessedSignInRequested();
export default apiProcessedSignInRequestedInstance;
