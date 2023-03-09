import { createLab } from "@/labs/contracts";

export const Route = "xde/team";
export const Caption = "XDE Team";
export const Description = "Рекурсивное исследование самих себя";

const Props = {
    Route,
    Caption,
    Description
};

export const Lab = createLab(Props, {})

export default Lab;