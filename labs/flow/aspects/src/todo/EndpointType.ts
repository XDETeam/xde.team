export enum Endpoint {
	Html,
	Json,
}

export const EndpointType = "EndpointType" as const;

export type TEndpointType = {
	[EndpointType]: Endpoint;
};
