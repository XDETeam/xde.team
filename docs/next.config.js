const path = require("path");

const withPlugins = require("next-compose-plugins");

const css = require("@zeit/next-css");
const images = require("remark-images");
const emoji = require("remark-emoji");
const math = require("remark-math");
const katex = require("rehype-katex");
const mdx = require("@next/mdx")({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [images, emoji, math],
        rehypePlugins: [katex]
    }
});

const nextConfig = {
    distDir: ".build",

    webpack(config) {
        config.resolve.alias["$components"] = path.join(__dirname, "components");
        config.resolve.alias["$icons"] = path.join(__dirname, "components/icons");
        config.resolve.alias["$alerts"] = path.join(__dirname, "components/alerts");

        return config;
    }
};

module.exports = withPlugins(
    [
        [
            css,
            {
                // This settings required to import CSS files from packages.
                // For example: import "katex/dist/katex.css"
                cssLoaderOptions: {
                    url: false
                }
            }
        ],

        [
            mdx,
            {
                pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
            }
        ]
    ],
    nextConfig
);
