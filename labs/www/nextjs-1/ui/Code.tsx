import { FunctionComponent, ReactElement } from "react";

export interface ICodeProps {
    lang?: string;
    children: string;
}

export const Code: FunctionComponent<ICodeProps> = ({ children }) => (
    <section className="code">
        <pre>{children.trim()}</pre>
    </section>
);

export default Code;
