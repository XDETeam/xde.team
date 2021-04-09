import React, { FC } from "react";

type NotFound404Props = {};

const NotFound404: FC<NotFound404Props> = (props) => {
	return (
		<div>
			<h2 style={{ fontSize: "5rem" }}>404</h2>
			<p onClick={() => alert("hi!")}>Not found</p>
		</div>
	);
};

export default NotFound404;
