import { mkdir, existsSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
import globby from "globby";
import { FunctionComponent, ReactElement } from "react";
import { ISpec } from "./ISpec";

export const MESH_ROOT = process.env.MESH_ROOT || "mesh";
export const MESH_DB_JSON = process.env.MESH_DB_JSON || ".data/mesh.json";

export interface ISpecModule {
    Uri: string;
    default: FunctionComponent
}

export interface ISpecStorage {
    clear();
    add(path: string, module: any): ISpec;
    load();
    save();
    get(spec: string): ISpec;
}

class SimpleStorage implements ISpecStorage {
    _path: string = MESH_DB_JSON;
    _items: { [uri: string]: ISpec } = {};
    _loaded: boolean = false;

    clear () {
        Object
            .getOwnPropertyNames(this._items)
            .forEach(name => delete this._items[name])
        ;
    }

    add(path: string, module: ISpecModule) {
        const result = this._items[module.Uri] =  {
            path,
            module: path.replace(/\.[^/.]+$/, ""),
            uri: module.Uri
        }

        return result;
    }

    load() {
        const data = readFileSync(this._path, { encoding: 'utf8' });
        this._items = JSON.parse(data);

        this._loaded = true;
    }

    save() {
        if (!existsSync(this._path)) {
            const folder = dirname(this._path);

            mkdir(folder, { recursive: true }, e => {
                if (e) throw e;
            })
        }

        writeFileSync(this._path, JSON.stringify(this._items, null, 2));
    }

    get = (spec: string): ISpec => {
        if (!this._loaded) {
            this.load();
        }

        return this._items[spec];
    }
}

const storage: ISpecStorage = new SimpleStorage();

export async function* buildSpecs() {
    storage.clear();

    const roots = MESH_ROOT
        .split(";")
        .map(root => `${root}/**/*.tsx`)
    ;

    const files = await globby(roots);

    for await (var file of files) {
        const module = await import(`../${file}`) as ISpecModule;

        if (module.Uri) {
            yield storage.add(file, module);
        }
    }

    storage.save();
}

export const getSpec = (spec: string) => storage.get(spec);