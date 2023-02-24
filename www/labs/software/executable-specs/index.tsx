import { ILab, LabLink } from "@/labs/contracts";

export const Route = "executable-specs";
export const Caption = "Executable Specifications/Specs";

export const Link = () => <LabLink href={ Route }>{ Caption }</LabLink>

export const Lab: ILab = {
    Route,
    Caption,
    Link
}

export default Lab;