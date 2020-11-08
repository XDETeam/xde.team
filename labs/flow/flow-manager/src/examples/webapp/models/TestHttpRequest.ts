export const TestHttpRequest = "TestHttpRequest" as const;

export type TTestHttpRequest = {
	[TestHttpRequest]: {
		authCookie?: string;
		host: string;
		path: string;
		isTLS: boolean;
	};
};
