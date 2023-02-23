import { ILab, LabLink } from "@/labs/contracts";

export const Route = "cx-language";
export const Caption = "Язык Cx";
export const Link = () => <LabLink href={ Route }>{ Caption }</LabLink>

export const Lab: ILab = {
    Route,
    Caption,
    Link
}

export default Lab;