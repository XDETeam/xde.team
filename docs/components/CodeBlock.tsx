import { FC } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

export interface ICodeBlockProps {
    language: Language;
    [name: string]: string;
}

export const CodeBlock: FC<ICodeBlockProps> = ({ className, children }) => {
    // TODO: How to cast string -> type union
    const language = className.replace("language-", "") as Language;

    // TODO:Is there a way to render children into string?
    if (typeof children != "string") {
        throw Error("Code is not a string");
    }

    return (
        <Highlight {...defaultProps} code={children.trim()} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style }}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
