import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSession } from "next-auth/client";
import Copyright from "../src/Copyright";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import SignOut from "../src/auth/signout";

export default function Home() {
	const [session, loading] = useSession();

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js example
				</Typography>
				{!session && (
					<Link href="/auth/signin" color="secondary">
						Sign In
					</Link>
				)}
				{session && (
					<>
						{session.user.image && (
							<img style={{ width: "100px" }} src={session.user.image} alt="" />
						)}
						<p>
							<small>Signed in as</small>{" "}
							<strong>{session.user.email || session.user.name}</strong>
						</p>
					</>
				)}
				{session && <SignOut />}

				<ProTip />
				<Copyright />
			</Box>
		</Container>
	);
}
