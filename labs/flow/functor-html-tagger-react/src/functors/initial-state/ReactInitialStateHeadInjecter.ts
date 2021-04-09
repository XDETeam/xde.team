import { PrimitiveFunctor, Undefined } from "@xde.labs/flow-manager";
import { TUndefined } from "@xde.labs/common";
import {
	ReactInitialState,
	TReactInitialState,
	THtmlTagInjectionHead,
	HtmlTagInjectionHead,
	SerializedJson,
	TSerializedJson,
	Json,
	TJson,
} from "@xde.labs/aspects";

export class ReactInitialStateHeadInjecter extends PrimitiveFunctor<
	TReactInitialState & TSerializedJson,
	THtmlTagInjectionHead & TUndefined<TJson> & TUndefined<TSerializedJson>
> {
	name = "ReactInitialStateHeadInjecter";
	from = [ReactInitialState, SerializedJson];
	to = [
		HtmlTagInjectionHead,
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
			[HtmlTagInjectionHead]: `<script>window.__INITIAL__DATA__ = ${obj[SerializedJson]}</script>`,
			[Json]: undefined,
			[SerializedJson]: undefined,
		};
	}
}

const reactInitialStateHeadInjecterInstance = new ReactInitialStateHeadInjecter();
export default reactInitialStateHeadInjecterInstance;
