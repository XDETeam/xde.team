import { FC, SFCElement, useState, ReactElement } from "react";

interface ITabProps {
    caption: string;
    children?: ReactElement;
}

interface ITabsProps {
    children?: SFCElement<ITabProps>[];
}

const Tabs: FC<ITabsProps> = ({ children }) => {
    const [index, setIndex] = useState(0);

    if (!children) {
        return null;
    }

    return (
        <nav className="tabs">
            <div className="header">
                {children.map((tab, i) => (
                    <div className={`tab${index === i ? " active" : ""}`}>
                        <button onClick={() => setIndex(i)}>{tab.props.caption}</button>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-800 text-white">{children[index].props.children}</div>
        </nav>
    );
};

export { Tabs };
