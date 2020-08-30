import React, { FC } from "react";

import styles from "./layout.module.css";
import DNA from "../../assets/noun_DNA_2335931.svg";
import Gears from "../../assets/noun_Gears_9428.svg";

export const Layout: FC = ({ children }) => (
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
