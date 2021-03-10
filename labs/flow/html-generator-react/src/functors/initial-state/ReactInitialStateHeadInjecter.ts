import { PrimitiveFunctor, Undefined } from "@xde.labs/flow-manager";
import { TUndefined } from "@xde.labs/common";
import {
	ReactInitialState,
	TReactInitialState,
	THtmlHeadTagInjected,
	HtmlHeadTagInjected,
	SerializedJson,
	TSerializedJson,
	Json,
	TJson,
} from "@xde.labs/aspects";

export class ReactInitialStateHeadInjecter extends PrimitiveFunctor<
	TReactInitialState & TSerializedJson,
	THtmlHeadTagInjected & TUndefined<TJson> & TUndefined<TSerializedJson>
> {
	name = "ReactInitialStateHeadInjecter";
	from = [ReactInitialState, SerializedJson];
	to = [
		HtmlHeadTagInjected,
		{
			aspect: Json,
			lambda: Undefined,
		},
		{
			aspect: SerializedJson,
			lambda: Undefined,
		},
	];

	async distinct(obj: TSerializedJson) {
		return {
			[HtmlHeadTagInjected]: `<script>window.__INITIAL__DATA__ = ${obj[SerializedJson]}</script>`,
			[Json]: undefined,
			[SerializedJson]: undefined,
		};
	}
}

const reactInitialStateHeadInjecterInstance = new ReactInitialStateHeadInjecter();
export default reactInitialStateHeadInjecterInstance;
