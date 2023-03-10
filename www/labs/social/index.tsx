import { createLab } from "@/labs/contracts";
import Politics from "./politics";

export const Route = "social-engineering";
export const Caption = "Social engineering";

export const Props = {
    Route,
    Caption
}

export const Labs = {
    Politics
}

export const Lab = createLab(Props, Labs)

export default Lab;