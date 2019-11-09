import { FunctionComponent } from "react";

import "./InlineCodeBlock.css";

export interface IInlineCodeBlockProps {}

export const InlineCodeBlock: FunctionComponent<IInlineCodeBlockProps> = ({ children }) => {
    if (typeof children != "string") {
        throw Error("Code is not a string");
    }

    return <span className="inline-code-block">{children}</span>;
};
