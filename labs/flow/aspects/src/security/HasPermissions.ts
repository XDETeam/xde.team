/**
 * String to allow easier union
 */
export enum ApplicationPermission {
	AdminDashboard = "AdminDashboard",
	BillingDetails = "BillingDetails",
	BillingManagement = "BillingManagement",
	Api = "Api",
	AdminApi = "AdminApi",
	// ...
}

export const HasPermissions = "HasPermissions" as const;

export type THasPermissions<TPermission = ApplicationPermission> = {
	[HasPermissions]: TPermission[];
};
