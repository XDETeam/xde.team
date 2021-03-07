/**
 * https://www.iana.org/assignments/character-sets/character-sets.xhtml
 */
export const CharSetted = "CharSetted" as const;

export type TCharSetted = {
	[CharSetted]: boolean;
};
