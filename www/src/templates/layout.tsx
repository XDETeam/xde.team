import React, { FC } from "react";
import styles from "./layout.module.css";

export const Layout: FC = ({ children }) => (
	<>
		<header></header>
		<main className={styles.main}>{children}</main>
		<footer></footer>
	</>
);
