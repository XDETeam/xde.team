const withPlugins = require("next-compose-plugins");

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
        return config;
    }
};

module.exports = withPlugins(
    [
        [
            mdx,
            {
                pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
            }
        ]
    ],

    nextConfig
);
