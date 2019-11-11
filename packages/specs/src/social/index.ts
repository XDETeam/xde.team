import { Person } from "./Person";

//TODO: Just to show props missing in Alice declaration below.
type PersonMissing = {
    eMail: string,
    password: string;
}

export const Alice: Person & PersonMissing = {
    eMail: "alice@domain.com",
    password: "!qa2Ws3eD",
    firstName: "Alice",
    lastName: "Smith"
};

Alice.toString = function () {
    return `${this.firstName} ${this.lastName}`;
};

export { Person } from "./Person";
