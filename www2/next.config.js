/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  output: "standalone",

  i18n: {
    locales: ["en", "ru", "bg"],
    defaultLocale: "en"
  }
}

module.exports = nextConfig
