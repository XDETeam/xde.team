export enum Aspect {
	HttpRequest = "HttpRequest",
	HttpResponse = "HttpResponse",

	UserRoled = "UserRoled",
	GeneratedHtml = "GeneratedHtml",
	GeneratedApiBody = "GeneratedApiBody",

	EndpointType = "EndpointType",

	ResponseCode = "ResponseCode",
	LocationHeader = "LocationHeader",
	AdditionalHeaders = "AdditionalHeaders",
	SentHtml = "SentHtml",
	SentApiResponse = "SentApiResponse",
	// Logged = "Logged",
	HttpRouted = "HttpRouted",
	Secured = "Secured",
	Redirected = "Redirected",
	Ended = "Ended",

	// app
	AppAdminRouteAllowed = "AppAdminRouteAllowed",

	// api
	ApiRawSignInRequest = "ApiRawSignInRequest",
	ApiValidSignInRequest = "ApiValidSignInRequest",

	ApiRawSignUpRequest = "ApiRawSignUpRequest",
	ApiValidSignUpRequest = "ApiValidSignUpRequest",
}
