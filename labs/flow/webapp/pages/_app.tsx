import React, { useEffect } from "react";
import { Provider } from "next-auth/client";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<React.Fragment>
			<Head>
				<title>My page</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Provider
					session={pageProps.session}
					options={{
						// Client Max Age controls how often the useSession in the client should
						// contact the server to sync the session state. Value in seconds.
						// e.g.
						// * 0  - Disabled (always use cache value)
						// * 60 - Sync session state with server if it's older than 60 seconds
						clientMaxAge: 60,
						// Keep Alive tells windows / tabs that are signed in to keep sending
						// a keep alive request (which extends the current session expiry) to
						// prevent sessions in open windows from expiring. Value in seconds.
						//
						// Note: If a session has expired when keep alive is triggered, all open
						// windows / tabs will be updated to reflect the user is signed out.
						keepAlive: 5 * 60,
					}}
				>
					<Component {...pageProps} />
				</Provider>
			</ThemeProvider>
		</React.Fragment>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
