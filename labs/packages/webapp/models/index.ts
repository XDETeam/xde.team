import { SessionBase } from "next-auth/_utils";

export type TSession<T> = SessionBase & {
	user: T;
};
