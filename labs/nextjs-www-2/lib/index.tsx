import { mkdir, writeFile, existsSync } from "fs";
import { dirname } from "path";
import globby from "globby";
import { FunctionComponent, ReactElement } from "react";

export const MESH_ROOT = process.env.MESH_ROOT || "mesh";
export const MESH_DB_JSON = process.env.MESH_DB_JSON || ".data/mesh.json";

export interface ISpec {
    path: string;
    uri: string
}

export interface ISpecModule {
    Uri: string;
    default: FunctionComponent
}

export interface ISpecStorage {
    clear();
    add(path: string, module: any): ISpec;
    flush();
}

class SimpleStorage implements ISpecStorage {
    _path: string = MESH_DB_JSON;
    _items: { [uri: string]: ISpec } = {};

    clear () {
        Object
            .getOwnPropertyNames(this._items)
            .forEach(name => delete this._items[name])
        ;
    }

    add(path: string, module: ISpecModule) {
        const result = this._items[module.Uri] =  {
            path,
            uri: module.Uri
        }

        return result;
    }

    flush() {
        if (!existsSync(this._path)) {
            const folder = dirname(this._path);

            mkdir(folder, { recursive: true }, e => {
                if (e) throw e;
            })
        }

        writeFile(this._path, JSON.stringify(this._items, null, 2), e => {
            if (e) throw e;
        })
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

    storage.flush();
}
