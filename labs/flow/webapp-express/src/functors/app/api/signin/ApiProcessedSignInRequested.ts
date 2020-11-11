import { PrimitiveFunctor, Optional } from "@xde/flow-manager";
import { Password } from "@xde/common";
import {
	GeneratedApiBody,
	HttpStatusCode,
	HttpHeaders,
	TLocationHeader,
	TGeneratedApiBody,
	THttpStatusCode,
	THttpHeaders,
} from "@xde/aspects";
import { EndpointErrorCode } from "@xde/endpoint-error-codes";

import { connection } from "../../../../db";
import { User } from "../../../../models/user/User";
import { ApiValidSignInRequest, TApiValidSignInRequest } from "../../../../models/aspects";

export class ApiProcessedSignInRequested extends PrimitiveFunctor<
	TApiValidSignInRequest & Partial<THttpHeaders>,
	TGeneratedApiBody & THttpStatusCode & Partial<THttpHeaders<TLocationHeader>>
> {
	name = "ApiProcessedSignInRequested";
	from = [
		ApiValidSignInRequest,
		{
			aspect: [HttpHeaders],
			lambda: Optional,
		},
	];
	to = [
		GeneratedApiBody,
		HttpStatusCode,
		{
			aspect: [HttpHeaders],
			lambda: Optional,
			force: true,
		},
	];

	async distinct(obj: TApiValidSignInRequest & Partial<THttpHeaders>) {
		let error: string | undefined = undefined;

		const valid: boolean = await connection
			.then(async (connection) => {
				if ("error" in connection) {
					error = connection.error;
					return false;
				} else {
					const userRepository = connection.getRepository(User);

					const user = await userRepository.findOne({
						name: obj[ApiValidSignInRequest].name,
					});

					if (user) {
						return Password.validate(
							obj[ApiValidSignInRequest].password,
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
			return {
				[HttpStatusCode]: 200,
				[HttpHeaders]: {
					...obj[HttpHeaders],
					Location: "/",
				},
				[GeneratedApiBody]: {
					result: true,
				},
			};
		} else if (!error) {
			return {
				[HttpStatusCode]: 401,
				[GeneratedApiBody]: {
					result: false,
					code: EndpointErrorCode.WrongCredentials,
				},
			};
		} else {
			return {
				[HttpStatusCode]: 500,
				[GeneratedApiBody]: {
					result: false,
					code: EndpointErrorCode.InternalServerError,
					message: error,
				},
			};
		}
	}
}

const apiProcessedSignInRequestedInstance = new ApiProcessedSignInRequested();
export default apiProcessedSignInRequestedInstance;
