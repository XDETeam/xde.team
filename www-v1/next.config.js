/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	pageExtensions: ["mdx", "md", "page.jsx", "page.js", "page.tsx", "page.ts"],
	
	i18n: {
		locales: ["en", "ru", "bg"],
		defaultLocale: "en",
	},
}

module.exports = nextConfig
