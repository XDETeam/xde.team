import Link from "next/link";
import { FC, PropsWithChildren, ReactNode } from "react";

export type LabLinkProps = {
    href: string;
}

export const LabLink: FC<PropsWithChildren<LabLinkProps>> = (props) =>
    <Link href={`/labs/${props.href}`}>{props.children}</Link>

export const LabsLink: FC<PropsWithChildren> = ({ children }) =>
    <Link href="/labs">{children}</Link>

export interface ILabProps {
    Caption: string;
    Route: string;
    Description?: ReactNode;
}

export interface ILab extends ILabProps {
    Link: () => JSX.Element;
    FullLink: () => JSX.Element;
    Labs?: ILab[];
}

export type Labs = {
    [key: string]: ILab;
}

//TODO:Implement support of options/default labs param
export const createLab = <T extends Labs>(props: ILabProps, labs: T): ILab & T => ({
    ...props,
    ...{
        Link: () => <Link href={`/labs/${props.Route}`}>{props.Caption}</Link>,
        FullLink: () => props.Description
            ? <>
                <Link href={`/labs/${props.Route}`}>{props.Caption}</Link> &ndash; { props.Description }
              </>
            : <Link href={`/labs/${props.Route}`}>{props.Caption}</Link>
    },
    ...labs,
    ...{
        Labs: Object.values(labs)
    }
})
