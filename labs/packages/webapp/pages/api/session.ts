import { getSession } from "next-auth/client";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	res.status(200).json(session ?? { status: false });
};
