import React from "react";
import App from "next/app";
import Layout from "../components/Layout";

import "katex/dist/katex.css";
import "../styles/index.css";

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}
