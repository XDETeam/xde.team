module.exports = {
	siteMetadata: {
		title: `XDE.Team`,
		description: `XDE Team.`,
		author: `XDE Team`,
		siteUrl: `https://xde.team`
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `./mesh/`,
			},
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /assets/
				}
			}
		},
		`gatsby-plugin-sitemap`
	],
}
