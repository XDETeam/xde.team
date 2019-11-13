import { FC, ReactNode } from "react";
import { Alice } from "@sde/team-specs";

export interface IEntity {}

export type Command<TRequest, TResponse> = {
	execute(request: TRequest): TResponse;
};

export type DeployCommand<TEntity extends IEntity> = Command<TEntity, void>;

export class PgDeployCommand<TEntity> implements DeployCommand<TEntity> {
	execute(request: TEntity): void {
		console.log("Deployed successfully");
	}
}

const exists = new PgDeployCommand();

export type SignInRequest = {
	eMail: string;
	password: string;
};

export type SignInResponse = {
	exists: boolean;
};

export class SignInCommand implements Command<SignInRequest, SignInResponse> {
	execute(request: SignInRequest): SignInResponse {
		console.log("SignInCommand call");

		return {
			exists: true
		};
	}
}

const signIn = new SignInCommand();

export type GivenSpecification = {};

function given<TRequest, TResponse>(
	literals: TemplateStringsArray,
	subject: TRequest,
	command: Command<Partial<TRequest>, TResponse>
): GivenSpecification {
	console.log("subject", subject);
	console.log("result", command.execute(subject));
	console.log("command", command);

	return {}; // TODO:
}

type Exception = {};

export type Specification<TRequest, TResponse> = {
	given: () => TRequest;
	when: (request: TRequest) => TResponse;
	then: (response: TResponse | Exception) => void;
};

const SignInSpecification: Specification<SignInRequest, SignInResponse> = {
	given: () => ({ eMail: "alice@domain.com", password: "!qa2Ws3eD" }),
	when: request => ({ exists: request.eMail == "alice@domain.com" }),
	then: response => {}
};

//export function Test<SignInSpecification>(Alice)

export const test1 = given`${Alice} ${exists}`;
export const test2 = given`${Alice} ${signIn}`;
export const tests = `
	- Я буду начинать с предиката или всё-таки нет?
		- Против предиката говорит то
			- По соглашениям он будет всё-таки с маленькой буквы.
			- Предикат может быть из нескольких слов
		- За предикат
			- Иногда может быть один предикат, без субъекта.
			- Вроде как предикаты впереди - это мощно
	- Tagged templates можно организовать на conditional types
		type BaseFunc = (a: string) => Promise<string>
		type BaseWithB  = BaseFunc extends (...a: infer U) => infer R ? (b: number, ...a:U) => R: never;	

	Given Exists Alice # Given Alice sample
	When SignIn Alice
	Then 

	When Sign in Alice
	And Favourite partner Shady
	And List favourite partners
	Then Partners contains:
		| Name  |
		| Shady |	
`;

export default () => (
	<div className="p-16 bg-red-200">TODO:Test {JSON.stringify([test1, test2])}</div>
);
