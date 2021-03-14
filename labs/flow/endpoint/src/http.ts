import { TCommonApiResponse, THttpMethod } from "@xde.labs/aspects";

export abstract class RestApiEndpoint<TRequest, TResponse> {
	constructor(public url: string, public method: THttpMethod) {}
	abstract call(request: TRequest): Promise<TCommonApiResponse<TResponse>>;
	// abstract handle(request: TRequest): Promise<TResponse>;

	// 1. validation error
	// 2.
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
