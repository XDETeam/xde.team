import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import specs from "../../specs";

export interface ISpecPageProps {
    id: string;
}

export const Page: FunctionComponent<ISpecPageProps> = () => {
    const router = useRouter();

    console.log("Router", router);
    console.log("Query", router.query);

    const { id } = (router.query as unknown) as ISpecPageProps;
    console.log("Id", id);

    const Component = specs[id] ?? (() => <></>);
    console.log("Component", Component);

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
