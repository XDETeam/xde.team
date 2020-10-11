import jwt from "next-auth/jwt";
import { SECRET } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await jwt.getToken({ req, secret: SECRET });
	res.status(200).json(token ?? { status: false });
};
