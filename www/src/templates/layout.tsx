import React, { FC, useEffect } from "react";
import shareThis from "share-this";
import * as emailSharer from "share-this/dist/sharers/email";
import * as facebookSharer from "share-this/dist/sharers/facebook";
import * as redditSharer from "share-this/dist/sharers/reddit";
import * as twitterSharer from "share-this/dist/sharers/twitter";

import "share-this/dist/share-this.css";
import styles from "./layout.module.css";
import DNA from "../../assets/noun_DNA_2335931.svg";
import Gears from "../../assets/noun_Gears_9428.svg";

export const Layout: FC = ({ children }) => {
	useEffect(() => {
		const selectionShare = shareThis({
			selector: "section",
			sharers: [twitterSharer, facebookSharer, redditSharer, emailSharer],
			transformer: (text: string) => `${text.trim()} #xDE #XdeTeam`,
		});
		selectionShare.init();
		// TODO: didMount hook
	}, []);

	return (
		<>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				2020 &copy; XDE Team | <a href="/credits">Credits</a>
			</footer>
			<aside className={styles.aside}>
				<a href="/">
					<DNA />
				</a>
				<a href="/labs">
					<Gears />
				</a>
			</aside>
		</>
	);
};
