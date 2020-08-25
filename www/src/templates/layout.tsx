import React, { FC } from "react";
import styles from "./layout.module.css";

export const Layout: FC = ({ children }) => (
	<>
		<main className={styles.main}>{children}</main>
		<footer className={styles.footer}>
			<div>Footer 1</div>
			<div>Footer 2</div>
			<div>Footer 3</div>
		</footer>
		<aside className={styles.aside}>X</aside>
	</>
);
