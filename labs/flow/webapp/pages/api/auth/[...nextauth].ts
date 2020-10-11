import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import Models from "../../../models/User";
// import Adapters from "next-auth/adapters";

export const SECRET = "TsW73uXOekBeQKaHIKWK";


const options = {
	// adapter: Adapters.TypeORM.Adapter(
	// 	// The first argument should be a database connection string or TypeORM config object
	// 	{},
	// 	// The second argument can be used to pass custom models and schemas
	// 	{
	// 		models: {
	// 			User: Models.User,
	// 		},
	// 	}
	// ),
	// Configure one or more authentication providers
	providers: [
		Providers.Credentials({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials: {
				csrfToken: string;
				username: string;
				password: string;
			}) => {
				// Add logic here to look up the user from the credentials supplied
				const user = {
					id: 1,
					name: "J Smith",
					email: "jsmith@example.com",
					image: "https://joeschmoe.io/api/v1/male/random",
					fdfds: "fsdfdf",
				};

				if (credentials.username === "admin") {
					// Any object returned will be saved in `user` property of the JWT
					return Promise.resolve(user);
				} else {
					// If you return null or false then the credentials will be rejected
					// return Promise.resolve(null);
					// You can also Reject this callback with an Error or with a URL:
					return Promise.reject(new Error("Invalid credentials")); // Redirect to error page
					// return Promise.reject('/path/to/redirect')        // Redirect to a URL
				}
			},
		}),
	],

	// A database is optional, but required to persist accounts in a database
	// database: process.env.DATABASE_URL,
	// secret: process.env.SECRET,
	secret: SECRET,
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		jwt: true,
		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days
		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},
	// JSON Web tokens are only used for sessions if the `jwt: true` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		// secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
		// Set to true to use encryption (default: false)
		// encryption: true,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},
	// You can define custom pages to override the built-in pages.
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		signIn: "/auth/signin", // Displays signin buttons
		signOut: "/auth/signout", // Displays form with sign out button
		error: "/auth/signin", // Error code passed in query string as ?error=
		// verifyRequest: '/api/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},
	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// signIn: async (user, account, profile) => { return Promise.resolve(true) },
		// redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
		// session: async (session, user) => { return Promise.resolve(session) },
		// jwt: async (token, user, account, profile, isNewUser) => { return Promise.resolve(token) }
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
