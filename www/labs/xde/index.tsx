import Team from "./team";
import Academy from "./academy";
import App from "./app";
import { createLab } from "../contracts";

export const Route = "xde";
export const Caption = "xde";

export const Props = {
    Route,
    Caption
}

export const Labs = {
    Team,
    Academy,
    App
}

export const Lab = createLab(Props, Labs)

export default Lab;