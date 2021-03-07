/**
 * https://www.ietf.org/rfc/bcp/bcp47.txt
 */
export const Languaged = "Languaged" as const;

export type TLanguaged = {
	[Languaged]: string;
};
