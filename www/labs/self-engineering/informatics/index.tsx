import { createLab } from "@/labs/contracts";

export const Route = "self-engineering/informatics";
export const Caption = "Informatics";
export const Description = "Наука о красоте";

export const Props = {
    Route,
    Caption,
    Description
}

export const Lab = createLab(Props, {})

export default Lab;