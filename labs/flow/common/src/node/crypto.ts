import crypto from "crypto";

export const sha256 = (val: string): string => {
	const hash = crypto.createHash("sha256");
	hash.update(val);
	return hash.digest("hex");
};
