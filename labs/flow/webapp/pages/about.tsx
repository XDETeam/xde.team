import React, { FC } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Copyright from "../src/Copyright";
import ProTip from "../src/ProTip";
import Link from "../src/Link";

type aboutProps = {};

const about: FC<aboutProps> = (props) => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js example
				</Typography>
				<Button variant="contained" component={Link} naked href="/">
					Go to the main page
				</Button>
				<ProTip />
				<Copyright />
			</Box>
		</Container>
	);
};

export default about;
