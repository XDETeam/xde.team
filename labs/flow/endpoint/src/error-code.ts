/**
 * Exist to be able to respond with simple number.
 * And client will verbose/translate/etc. this number.
 */
export enum EndpointErrorCode {
	InsecureApiRequest,
	WrongCredentials,
	InternalServerError,
	MethodNotAllowed,
	UnprocessableEntity,
	NotFound,
}
