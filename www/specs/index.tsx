import { FunctionComponent } from "react";

export const specs: { [id: string]: FunctionComponent } = {
    "custom-spec": () => (
        <>
            <h1>Custom specification</h1>
        </>
    ),
};

export default specs;
