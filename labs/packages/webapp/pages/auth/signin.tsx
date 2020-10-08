import React, { FC, useState, useEffect } from "react";
import { csrfToken as getCsrfToken } from "next-auth/client";
import { authApiRoutes } from "../../models/auth";
import { useRouter } from "next/router";

type SignInProps = {};

const SignIn: FC<SignInProps> = (props) => {
	const [csrfToken, setCsrfToken] = useState<string | undefined>();
	useEffect(() => {
		Promise.resolve(getCsrfToken()).then((token) => setCsrfToken(token ?? undefined));
	}, []);
	const router = useRouter();
	if (router.query.callbackUrl) {
		router.push(router.query.callbackUrl as string);
	}

	return (
		<React.Fragment>
			{router.query.error}
			<form method="post" action={authApiRoutes.signIn}>
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<label>
					Username
					<input name="username" type="text" />
				</label>
				<label>
					Password
					<input name="password" type="text" />
				</label>
				<button type="submit">Sign in</button>
			</form>
		</React.Fragment>
	);
};

export default SignIn;
