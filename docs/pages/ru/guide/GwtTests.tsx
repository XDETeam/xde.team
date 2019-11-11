import { Alice } from "@sde/team-specs";

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

export type Specification = {};

function given<TRequest, TResponse>(
	literals: TemplateStringsArray,
	subject: TRequest,
	command: ICommand<Partial<TRequest>, TResponse>
): Specification {
	console.log("subject", subject);
	console.log("result", command.execute(subject));
	console.log("command", command);

	return {}; // TODO:
}

export const test1 = given`${Alice} ${exists}`;
export const test2 = given`${Alice} ${signIn}`;

export default () => (
	<div className="p-16 bg-red-200">TODO:Test {JSON.stringify([test1, test2])}</div>
);
