import { Person, PersonMissing } from "./Person";

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

