export enum Aspects {
	HttpRequest = "HttpRequest",
	HasAuth = "HasAuth",
	IsAdmin = "IsAdmin",
	GeneratedHtml = "GeneratedHtml",
	/**
	 * @default 200
	 */
	ResponseCode = "ResponseCode",
	LocationHeader = "LocationHeader",
	RenderedHtml = "RenderedHtml",
	Logged = "Logged",
	Routed = "Routed",
	RouteHandled = "RouteHandled",
	Secured = "Secured",
	Redirected = "Redirected",

	// app
	AppSecuredRouteAllowed = "AppSecuredRouteAllowed",
}
