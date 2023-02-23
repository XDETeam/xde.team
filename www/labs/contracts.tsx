import Link from "next/link";
import { FC, PropsWithChildren } from "react";

export type LabLinkProps = {
    href: string;
}

export const LabLink: FC<PropsWithChildren<LabLinkProps>> = (props) =>
    <Link href={ `/labs/${props.href}` }>{ props.children }</Link>
;

export const LabsLink : FC<PropsWithChildren> = ({ children }) =>
    <Link href="/labs">{ children }</Link>
;

export interface ILab {
    Route: string;
    Caption: string;
    Link: () => JSX.Element;
}
