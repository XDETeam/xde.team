// TODO: I am candidate to be moved to some library
import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import { TJson, Json, TSerializedJson, SerializedJson } from "@xde.labs/aspects";
import serialize from "serialize-javascript";

/**
 * I can convert the js object to serialized (html-script tag ready) text.
 **/
export class JsonSerializer extends PrimitiveFunctor<TJson, TSerializedJson> {
	name = "JsonSerializer";
	from = [Json];
	to = [SerializedJson];

	async distinct(obj: TJson) {
		return {
			[SerializedJson]: serialize(obj[Json]),
		};
	}
}

const jsonSerializerInstance = new JsonSerializer();
export default jsonSerializerInstance;
