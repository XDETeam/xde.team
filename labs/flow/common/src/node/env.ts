export const isProduction = () => process.env.NODE_ENV === "production";
export const isTesting = () => process.env.NODE_ENV === "testing";
