import { lab as createLab } from "@/labs/contracts";

export const Route = "xde/team";
export const Caption = "XDE Team";
export const Description = "Рекурсивное исследование самих себя";

export const Lab = createLab({
    Route,
    Caption,
    Description
})

export default Lab;