import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { buildSpecs } from "../lib";

export const Page = () => {
    const router = useRouter();
    const { spec } = router.query;

    return (
        <>
            TODO:Component for {spec}
        </>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    // TODO:Not happy with this implementation
    var specs = [];
    for await (var spec of buildSpecs()) {
        specs.push(spec);
    }

    return {
        paths: specs,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return { props: params };
}
