import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import { TJson, Json, ReactInitialState, TReactInitialState } from "@xde.labs/aspects";

/**
 * Just intermediate to convert to json to be converted to serialized json.
 */
export class ReactInitialStateAsJson extends PrimitiveFunctor<TReactInitialState, TJson> {
	name = "ReactInitialStateAsJson";
	from = [ReactInitialState];
	to = [Json];

	async distinct(obj: TReactInitialState) {
		return {
			[Json]: obj[ReactInitialState],
		};
	}
}

const reactInitialStateAsJsonInstance = new ReactInitialStateAsJson();
export default reactInitialStateAsJsonInstance;
