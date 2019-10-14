interface IEntity {

}

interface IPredicate<T> {
    (item: T): void;
}

interface IPerson {
    firstName: String,
    lastName: String
}

const alice = {
    firstName: "Alice",
    lastName: "Smith",
}

alice.toString = function() {
    return `${this.firstName} ${this.lastName}`
}

const exists = (item: IPerson) => {
    console.log(`Has call for ${item}`)
};

const signIn = (item: IPerson) => {
    console.log(`SignIn call for ${item}`)
};

function given<T extends IEntity>(literals: TemplateStringsArray, subject: T, predicate: IPredicate<T>) {
    console.log("literals", literals);
    console.log("predicate", predicate);
    console.log("entity", subject);

    predicate(subject);

    return literals.length;
}

function when<T extends IEntity>(literals: TemplateStringsArray, subject: T, predicate: IPredicate<T>) {
}

export default () => (
    <div className="p-16 bg-red-200">
        TODO:Test {[
            given`${alice} ${exists}`,
            when`${alice} ${signIn}`
        ]}
    </div>
)
