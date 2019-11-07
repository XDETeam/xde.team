export interface IEntity {}

export interface ICommand<TRequest, TResponse> {
    execute(request: TRequest): TResponse;
}

export interface IPredicate<TEntity extends IEntity> extends ICommand<TEntity, void> {}

export interface IDeployCommand<TEntity extends IEntity> extends IPredicate<TEntity> {}

export class DeployCommand<TEntity> implements IDeployCommand<TEntity> {
    execute(request: TEntity): void {
        throw new Error("Method not implemented.");
    }
}

interface IPerson {
    firstName: String;
    lastName: String;
}

const alice: IPerson = {
    firstName: "Alice",
    lastName: "Smith"
};

alice.toString = function() {
    return `${this.firstName} ${this.lastName}`;
};

const exists = DeployCommand;

function given<T extends IEntity>(
    literals: TemplateStringsArray,
    subject: T,
    predicate: IPredicate<T>
) {
    return literals.length;
}

/*
const exists = (item: IPerson) => {
    console.log(`Has call for ${item}`);
};

const signIn = (item: IPerson) => {
    console.log(`SignIn call for ${item}`);
};

function given<T extends IEntity>(
    literals: TemplateStringsArray,
    subject: T,
    predicate: IPredicate<T>
) {
    console.log("literals", literals);
    console.log("predicate", predicate);
    console.log("entity", subject);

    predicate(subject);

    return literals.length;
}

function when<T extends IEntity>(
    literals: TemplateStringsArray,
    subject: T,
    predicate: IPredicate<T>
) {}
*/

export default () => (
    <div className="p-16 bg-red-200">
        TODO:Test{" "}
        {[
            //given`${alice} ${exists}`
            //given`${alice} ${signIn}`
        ]}
    </div>
);
