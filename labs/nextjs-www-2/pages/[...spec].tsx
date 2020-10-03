import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic"
import { buildSpecs, getSpec, ISpec } from "../lib";

export const Page = ({ uri, path, module }: ISpec) => {
    //TODO:
    const DynamicComponent = dynamic(() => import(`../${module}`))
    //const DynamicComponent = dynamic(() => import(`../mesh/cooking/Melon`))

    return (
        <>
            <h1>TODO:Component for {uri} {path} {module}</h1>

            <main>
                <DynamicComponent />
            </main>
        </>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    // TODO:Not happy with this implementation
    var specs = [];
    for await (var spec of buildSpecs()) {
        specs.push(spec.uri);
    }

    return {
        paths: specs,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { spec: slug } = params;
    const id = `/${Array.isArray(slug) ? slug.join('/') : slug}`;
    const spec = getSpec(id);

    console.log("TODO:Spec", id, spec );

    return {
        props: {
            ...spec
        }
    };
}
