import {
	AccessGranted,
	HasPermissions,
	HttpEnded,
	NodejsExpressRequest,
	NodejsExpressResponse,
	HttpSecured,
	HttpRoute,
	HttpStatusCode,
} from "@xde.labs/aspects";

export interface IAspectState {
	aspects: string[];
}
export const initialState: IAspectState = {
	aspects: [
		AccessGranted,
		HasPermissions,
		HttpEnded,
		HttpRoute,
		HttpSecured,
		HttpStatusCode,
		NodejsExpressRequest,
		NodejsExpressResponse,
	],
};

export function reducer(state: IAspectState, action: any): IAspectState {
	return state;
}
