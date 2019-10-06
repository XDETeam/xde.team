const withPlugins = require('next-compose-plugins');

const css = require("@zeit/next-css")
const sass = require("@zeit/next-sass")

const images = require("remark-images")
const emoji = require("remark-emoji")
const math = require("remark-math")
const katex = require("rehype-katex")
const mdx = require("@next/mdx")({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: [ images, emoji, math ],
		rehypePlugins: [ katex ]
	}
})

const nextConfig = {
	distDir: ".build"
};

module.exports = withPlugins([
	[ css, {
		// This settings required to import CSS files from packages.
		// For example: import "katex/dist/katex.css"
		cssLoaderOptions: {
			url: false
		}
	}],

	sass,

	[ mdx, {
		pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
	}]
], nextConfig);
