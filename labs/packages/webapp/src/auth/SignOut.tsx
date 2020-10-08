import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { signOut } from "next-auth/client";

type SignOutProps = {};

const SignOut: FC<SignOutProps> = (props) => {
	return (
		<Button variant="contained" onClick={async () => await signOut()}>
			Sign Out
		</Button>
	);
};

export default SignOut;
