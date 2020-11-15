// In case with function enveloping - webpack will not throw out code depending on NODE_ENV value.
export const isProduction = () => process.env.NODE_ENV === "production";
export const isTesting = () => process.env.NODE_ENV === "testing";
