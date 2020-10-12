import { ValidationError } from "class-validator";

export type THttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export type TFail = {
	code?: string;
	// TODO: To error codes only
	message?: string;
	details?: ValidationError[];
};

export type TCommonApiResponse<TSuccess = {}> =
	| {
			result: true;
			data?: TSuccess;
	  }
	| ({
			result: false;
	  } & TFail);
