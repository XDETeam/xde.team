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

export abstract class RestApiEndpoint<TRequest, TResponse> {
	constructor(public url: string, public method: THttpMethod) {}
	abstract call(request: TRequest): Promise<TCommonApiResponse<TResponse>>;
	// abstract handle(request: TRequest): Promise<TResponse>;
}

// export class AxiosRestApiEndpoint<TRequest, TResponse> extends RestApiEndpoint<
// 	TRequest,
// 	TResponse
// > {
// 	// TODO: Change backend to work with different http methods
// 	constructor(
// 		url: string,
// 		method: THttpMethod = "POST",
// 		private headers?: AxiosRequestConfig["headers"]
// 	) {
// 		super(url, method);
// 	}

// 	call(request: TRequest): Promise<AxiosResponse<TResponse>> {
// 		return axios.post(
// 			this.url,
// 			request,
// 			this.headers
// 				? {
// 						headers: this.headers,
// 				  }
// 				: undefined
// 		);
// 	}
// }
