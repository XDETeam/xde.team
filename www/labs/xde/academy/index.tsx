import { createLab } from "@/labs/contracts";

export const Route = "xde/academy";
export const Caption = "XDE Academy";
export const Description = "Лаборатория образовательных технологий";

const Props = {
    Route,
    Caption,
    Description
};

export const Lab = createLab(Props, {})

export default Lab;