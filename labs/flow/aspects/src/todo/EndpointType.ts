export enum Endpoint {
	Html,
	Json,
	File,
	Redirect,
}

export const EndpointType = "EndpointType" as const;

export type TEndpointType<T extends Endpoint> = {
	[EndpointType]: T;
};
