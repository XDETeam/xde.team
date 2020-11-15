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
import { getConnection } from "typeorm";

import { User } from "../../../../models/user/User";
import { ApiValidSignUpRequest, TApiValidSignUpRequest } from "../../../../models/aspects";

export class ApiProcessedSignUpRequested extends PrimitiveFunctor<
	TApiValidSignUpRequest & Partial<THttpHeaders>,
	TGeneratedApiBody & THttpStatusCode & Partial<THttpHeaders<TLocationHeader>>
> {
	name = "ApiProcessedSignUpRequested";
	from = [
		ApiValidSignUpRequest,
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

	async distinct(obj: TApiValidSignUpRequest & Partial<THttpHeaders<TLocationHeader>>) {
		let error: string | undefined = undefined;
		let createdId: number | undefined = undefined;

		const user = new User();
		user.name = obj[ApiValidSignUpRequest].name;
		user.email = obj[ApiValidSignUpRequest].email;
		user.password = Password.hash(obj[ApiValidSignUpRequest].password, process.env.SALT!);

		await getConnection()
			.manager.save(user)
			.then((user) => {
				createdId = user.id;
			})
			.catch((e) => {
				error = e;
			});

		if (createdId) {
			return {
				[HttpStatusCode]: 201,
				[HttpHeaders]: {
					...obj[HttpHeaders],
					Location: "/",
				},
				[GeneratedApiBody]: {
					result: true,
					data: { id: createdId },
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

const apiProcessedSignUpRequestedInstance = new ApiProcessedSignUpRequested();
export default apiProcessedSignUpRequestedInstance;
