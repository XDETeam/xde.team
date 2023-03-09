import { createLab } from "@/labs/contracts";

export const Route = "executable-specs";
export const Caption = "Executable Specifications/Specs";

const Props = {
    Route,
    Caption
};

export const Lab = createLab(Props, {})

export default Lab;