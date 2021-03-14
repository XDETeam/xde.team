/**
 * Exist to be able to respond with simple number.
 * And client will verbose/translate/etc. this number.
 *
 * Soft referencing http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
export enum ApiResponseErrorCode {
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	UnprocessableEntity = 422,
	InternalServerError = 500,

	InsecureApiRequest = 452,
	WrongCredentials = 453,
}

export type TCommonApiResponse<TSuccessData = {}, TFailDetail = any> =
	| {
			result: true;
			data?: TSuccessData;
	  }
	| {
			result: false;
			code: ApiResponseErrorCode;
			// TODO: To error codes only
			message?: string;
			details?: TFailDetail[];
	  };

export const ApiResponse = "ApiResponse" as const;

export type TApiResponse = {
	[ApiResponse]: TCommonApiResponse;
};
