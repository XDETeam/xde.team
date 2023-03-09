import Link from "next/link";
import { FC, PropsWithChildren, ReactNode } from "react";

export type LabLinkProps = {
    href: string;
}

export const LabLink: FC<PropsWithChildren<LabLinkProps>> = (props) =>
    <Link href={`/labs/${props.href}`}>{props.children}</Link>
    ;

export const LabsLink: FC<PropsWithChildren> = ({ children }) =>
    <Link href="/labs">{children}</Link>
    ;

export interface ILabProps {
    Caption: string;
    Route: string;
    Description?: ReactNode;
}

export interface ILab extends ILabProps {
    Link: () => JSX.Element;
    FullLink: () => JSX.Element;
}

export const createLab = (props: ILabProps): ILab => ({
    ...props,
    ...{
        Link: () => <Link href={`/labs/${props.Route}`}>{props.Caption}</Link>,
        FullLink: () => props.Description
            ? <>
                <Link href={`/labs/${props.Route}`}>{props.Caption}</Link> &ndash; { props.Description }
              </>
            : <Link href={`/labs/${props.Route}`}>{props.Caption}</Link>
    }
})
