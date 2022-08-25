//TODO: There are more interesting settings at https://github.com/iamvishnusankar/next-sitemap

/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
    siteUrl: process.env.SITE_URL || 'https://xde.team',
    //TODO:This option is good till the site is small
    generateIndexSitemap: false,
    generateRobotsTxt: true
}

module.exports = nextSitemapConfig
