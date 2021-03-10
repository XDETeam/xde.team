export enum Endpoint {
	Html,
	Json,
}

// TODO: Generic
export const EndpointType = "EndpointType" as const;

export type TEndpointType = {
	[EndpointType]: Endpoint;
};
