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
	Routed = "Routed",
	Secured = "Secured",
	Redirected = "Redirected",

	// app
	AppAdminRouteAllowed = "AppAdminRouteAllowed",
}

export enum AspectState {
	Undefined,
}

export enum AspectsState {
	SomeTruthy,
	// is default without object
	// EveryTruthy,
}
