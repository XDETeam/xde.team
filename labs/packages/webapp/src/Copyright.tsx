import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

type CopyrightProps = {};

const Copyright: FC<CopyrightProps> = (props) => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<MuiLink color="inherit" href="https://material-ui.com/">
				Your Website
			</MuiLink>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
};

export default Copyright;
