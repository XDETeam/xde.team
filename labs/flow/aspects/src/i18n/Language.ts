/**
 * https://www.ietf.org/rfc/bcp/bcp47.txt
 */
export const Language = "Language" as const;

export type TLanguage = {
	[Language]: string;
};
