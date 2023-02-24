import { ILab, LabLink } from "@/labs/contracts";

export const Route = "xde/team";
export const Caption = "XDE Team";

export const Link = () => <LabLink href={ Route }>{ Caption }</LabLink>

export const Lab: ILab = {
    Route,
    Caption,
    Link
}

export default Lab;