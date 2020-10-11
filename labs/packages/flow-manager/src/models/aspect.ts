export enum Aspect {
	HttpRequest = "HttpRequest",
	HasAuth = "HasAuth",
	GeneratedHtml = "GeneratedHtml",
	/**
	 * @default 200
	 */
	ResponseCode = "ResponseCode",
	LocationHeader = "LocationHeader",
	RenderedHtml = "RenderedHtml",
	Logged = "Logged",
	HttpRouted = "HttpRouted",
	Secured = "Secured",
	Redirected = "Redirected",

	// app
	AppAdminRouteAllowed = "AppAdminRouteAllowed",
}

export enum AspectType {
	Exists = "Exists",
	SpecificValue = "SpecificValue",
	Undefined = "Undefined",
	Some = "Some",
	Optional = "Optional",
}
