import { string } from "prop-types";

export interface IEntity {}

export interface ICommand<TRequest, TResponse> {
    execute(request: TRequest): TResponse;
}

export interface IDeployCommand<TEntity extends IEntity> extends ICommand<TEntity, void> {}

export class DeployCommand<TEntity> implements IDeployCommand<TEntity> {
    execute(request: TEntity): void {
        console.log("Deployed successfully");
    }
}

interface IPerson extends IEntity {
    firstName: String;
    lastName: String;
}

const Alice = {
    eMail: "alice@domain.com",
    password: "!qa2Ws3eD",
    firstName: "Alice",
    lastName: "Smith"
};

Alice.toString = function() {
    return `${this.firstName} ${this.lastName}`;
};

const exists = new DeployCommand();

export type SignInRequest = {
    eMail: string;
    password: string;
};

export type SignInResponse = {
    exists: boolean;
};

export class SignInCommand implements ICommand<SignInRequest, SignInResponse> {
    execute(request: SignInRequest): SignInResponse {
        console.log("SignInCommand call");

        return {
            exists: true
        };
    }
}

const signIn = new SignInCommand();

function given<TRequest, TResponse>(
    literals: TemplateStringsArray,
    subject: TRequest,
    command: ICommand<Partial<TRequest>, TResponse>
) {
    console.log("subject", subject);
    console.log("result", command.execute(subject));
    console.log("command", command);

    return literals.length;
}

export default () => (
    <div className="p-16 bg-red-200">
        TODO:Test {[given`${Alice} ${exists}`, given`${Alice} ${signIn}`]}
    </div>
);
