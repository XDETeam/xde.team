import React, { FC } from "react";
import quoteStyles from "./Quote.module.css";

type QuoteProps = { author: string; uri?: string } | { author?: string; uri: string };

const Quote: FC<QuoteProps> = (props) => {
	return (
		<figure className={quoteStyles.figure}>
			<blockquote cite={props.uri}>{props.children}</blockquote>
			{props.author && <figcaption>{props.author}</figcaption>}
		</figure>
	);
};

export default Quote;
