import { createLab } from "@/labs/contracts";
import Informatics from "./informatics";
import Technology from "./technology";
import Bio from "./bio";

export const Route = "self-engineering";
export const Caption = "Self engineering";
export const Description = <>
    Прежде всего люди создают для людей, поэтому нет ничего важней формировать самих себя,
    с соответствующими потребностями и возможностями.
</>

export const Props = {
    Route,
    Caption,
    Description
}

export const Labs = {
    Informatics,
    Technology,
    Bio
}

export const Lab = createLab(Props, Labs)

export default Lab;