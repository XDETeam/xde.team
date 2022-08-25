const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://xde.team';

/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
    //TODO: There are more interesting settings at https://github.com/iamvishnusankar/next-sitemap

    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    //TODO:Temporary, while site is small
    generateIndexSitemap: false,
    //TODO:Can be reused from next.config
    alternateRefs: [
        {
            href: SITE_URL,
            hreflang: "en",
        },
        {
            href: `${SITE_URL}/ru`,
            hreflang: "ru",
        },
        {
            href: `${SITE_URL}/bg`,
            hreflang: "bg",
        },
    ],
}

module.exports = nextSitemapConfig
