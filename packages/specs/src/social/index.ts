import { Person } from "./Person";

//TODO: Just to show props missing in Alice declaration below.
type PersonMissing = {
    eMail: string,
    password: string;
}

export const Alice: Person & PersonMissing = {
    firstName: "Alice",
    lastName: "Smith",
    name: "TODO:",

    eMail: "alice@domain.com",
    password: "!qa2Ws3eD",
};

Alice.toString = function () {
    return `${this.firstName} ${this.lastName}`;
};

export { Person } from "./Person";
