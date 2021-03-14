/**
 * https://www.iana.org/assignments/character-sets/character-sets.xhtml
 */
export const Charset = "Charset" as const;

export type TCharset = {
	[Charset]: string;
};
