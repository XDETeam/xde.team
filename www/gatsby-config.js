module.exports = {
	siteMetadata: {
		title: `XDE Team`,
		description: `XDE Team.`,
		author: `XDE Team`,
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
		}
	],
}
