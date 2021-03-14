/**
 * String to allow easier union
 */
export enum VisitorRole {
	Visitor = "Visitor",
	Regular = "Regular",
	Administrator = "Administrator",
	// TODO: The same as admin or no?
	// Developer,
}

export const VisitorRoles = "VisitorRoles" as const;

export type TVisitorRoles<TRole = VisitorRole> = {
	[VisitorRoles]: TRole[];
};
