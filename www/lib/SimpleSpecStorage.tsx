import { IDictionary } from "./IDictionary";
import { ISpecElement } from "./ISpecElement";
import { ISpecStorage } from "./ISpecStorage";

export class SimpleSpecStorage implements ISpecStorage {
    private _items: IDictionary<ISpecElement> = {};

    get = (id: string): ISpecElement => this._items[id];

    set = (id: string, spec: ISpecElement) => this._items[id] = spec;

    select = (): IDictionary<ISpecElement> => this._items;
}
