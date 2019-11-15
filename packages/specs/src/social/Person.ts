import { Named } from "../common";

export type Person = Named & {
    firstName: String;
    lastName: String;
}
