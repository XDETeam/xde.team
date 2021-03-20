import { Constructable } from "@xde.labs/common";
import { validate, ValidationError } from "class-validator";

export interface IRequestBase<TRequest, TParentModel> {
	allowedKeys: Array<keyof TRequest>;
	request: TRequest;
	parentModel: Constructable<TParentModel>;
	validate: () => Promise<ValidationError[] | TRequest>;
	validationGroups: string[];
}

export abstract class RequestBase<TRequest extends {}, TParentModel extends {}>
	implements IRequestBase<TRequest, TParentModel> {
	abstract allowedKeys: IRequestBase<TRequest, TParentModel>["allowedKeys"];
	abstract request: IRequestBase<TRequest, TParentModel>["request"];
	abstract parentModel: IRequestBase<TRequest, TParentModel>["parentModel"];
	abstract validationGroups: IRequestBase<TRequest, TParentModel>["validationGroups"];

	async validate() {
		const model = new this.parentModel();
		const obj: TRequest = {} as TRequest;
		this.allowedKeys.forEach((key) => {
			obj[key] = (this.request as any)[key];
		});
		Object.keys(obj).forEach((key) => {
			(model as any)[key] = (this.request as any)[key];
		});

		const errors = await validate(model, {
			groups: this.validationGroups,
			validationError: { target: false, value: false },
		});
		return errors.length ? errors : obj;
	}
}
