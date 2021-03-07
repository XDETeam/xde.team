import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import { Password } from "@xde.labs/common";
import {
	GeneratedApiBody,
	HttpStatusCode,
	HttpHeaders,
	TLocationHeader,
	TGeneratedApiBody,
	THttpStatusCode,
	THttpHeaders,
} from "@xde.labs/aspects";
import { EndpointErrorCode } from "@xde.labs/endpoint";
import { getRepository } from "typeorm";

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
		let valid: boolean;
		const userRepository = getRepository(User);

		const user = await userRepository
			.findOne({
				name: obj[ApiValidSignInRequest].name,
			})
			.catch((e) => {
				error = e;
			});

		if (user) {
			valid = Password.validate(
				obj[ApiValidSignInRequest].password,
				process.env.SALT!,
				user.password
			);
		} else {
			valid = false;
		}

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
