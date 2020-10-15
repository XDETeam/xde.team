export enum VisitorRole {
	Visitor,
	Regular,
	Admin,
}

export const VisitorRoled = "VisitorRoled" as const;

export type TVisitorRoled = {
	[VisitorRoled]: VisitorRole;
};
