import { createLab } from "@/labs/contracts";

export const Route = "self-engineering";
export const Caption = "Self engineering";
export const Description = <>
    Прежде всего люди создают для людей, поэтому нет ничего важней формировать
    самих себя, с соответствующими потребностями и возможностями.
</>

export const Lab = createLab({
    Route,
    Caption,
    Description
})

export default Lab;