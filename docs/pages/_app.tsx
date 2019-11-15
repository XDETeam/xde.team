import React from "react";
import App from "next/app";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/Layout";
import { CodeBlock } from "../components/CodeBlock";
import { InlineCodeBlock } from "../components/InlineCodeBlock";

import "katex/dist/katex.css";
import "../styles/index.css";

const components = {
	code: CodeBlock,
	inlineCode: InlineCodeBlock
};

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<MDXProvider components={components}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MDXProvider>
		);
	}
}
