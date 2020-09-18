export enum Aspects {
	HttpRequest = "HttpRequest",
	HasAuth = "HasAuth",
	IsAdmin = "IsAdmin",
	GeneratedHtml = "GeneratedHtml",
	/**
	 * @default 200
	 */
	ResponseCode = "ResponseCode",
	RenderedHtml = "RenderedHtml",
	Logged = "Logged",
	Routed = "Routed",
	RouteHandled = "RouteHandled",
	IsHttp = "IsHttp",
	TLSed = "TLSed",
}
