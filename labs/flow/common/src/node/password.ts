import { sha256 } from "./crypto";

// TODO: envelop in sha for node, move core out of here
const hashPassword = (password: string, salt: string): string => sha256(`${salt}${password}`);

const validatePassword = (password: string, salt: string, hash: string): boolean =>
	hashPassword(password, salt) === hash;

export const Password = {
	hash: hashPassword,
	validate: validatePassword,
};
