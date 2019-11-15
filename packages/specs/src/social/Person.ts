import { Named } from "../common";

export type Person = Named & {
    firstName: String;
    lastName: String;
}

//TODO: Just to show props missing in Alice declaration below.
export type PersonMissing = {
    eMail: string,
    password: string;
}
