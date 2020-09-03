import React, { FC, useEffect } from "react";
import shareThis from "share-this";
import * as emailSharer from "share-this/dist/sharers/email";
import * as facebookSharer from "share-this/dist/sharers/facebook";
import * as redditSharer from "share-this/dist/sharers/reddit";
import * as twitterSharer from "share-this/dist/sharers/twitter";

import "share-this/dist/share-this.css";
import styles from "./layout.module.css";
import DNA from "../../assets/noun_DNA_2335931.svg";
import Github from "../../assets/github.svg";
import Lab from "../../assets/flaskOutline.svg";
import { AdditionalLinks, Hashtags } from "../pages/labs/xde/brand";

export const Layout: FC = ({ children }) => {
	useEffect(() => {
		const selectionShare = shareThis({
			selector: "section",
			sharers: [twitterSharer, facebookSharer, redditSharer, emailSharer],
			transformer: (text: string) =>
				`${text.trim()}${Hashtags.map((tag) => ` #${tag}`).join(``)}`,
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
				<a href="/labs" className={styles.pushNextDown}>
					<Lab />
				</a>

				<a href={AdditionalLinks.github}>
					<Github />
				</a>
			</aside>
		</>
	);
};
