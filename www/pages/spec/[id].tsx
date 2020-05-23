import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import specs from "../../specs";

export interface ISpecPageProps {
    id: string;
}

export const Page: FunctionComponent<ISpecPageProps> = () => {
    const router = useRouter();
    const { id } = (router.query as unknown) as ISpecPageProps;
    const Component = specs[id] ?? (() => <></>);

    return (
        <>
            <p>Spec: {id}</p>
            <main>
                <Component />
            </main>
        </>
    );
};

export default Page;

export async function getStaticPaths() {
    const paths = Object.getOwnPropertyNames(specs).map((id) => `/spec/${id}`);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return { props: params };
}
