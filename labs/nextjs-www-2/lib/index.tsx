import globby from "globby";

export const DEFAULT_ROOT = "mesh";

export async function* buildSpecs() {
    const roots = (process.env.MESH_ROOT || DEFAULT_ROOT)
        .split(";")
        .map(root => `${root}/**/*.tsx`)
    ;

    const files = await globby(roots);

    console.log(files);

    yield "/spec3";
    yield "/spec4";
}
