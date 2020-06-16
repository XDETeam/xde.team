## Prerequisites

```shell
cd ../ && git clone https://github.com/StanEgo/sde-typescript.git
```

## Docs

Based on [Next.js](https://nextjs.org/) (/docs folder).

```
	# Run docs in dev (watch) mode
	yarn docs:dev

	# Build docs for publishing
	yarn docs:publish
```

## Design

-   Gatsby. Conceptually design is interesting. Redux, GraphQL, clear separation between node sourcing/transforming and page generation. But how to export data from TSX elements which describes page?

    -   Experiment in a way like https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-javascript-frontmatter/src/gatsby-node.js

*   How will mesh looks like?
*   Investigation (/labs):
    -   GraphQL. Is it good for mesh?
    -   Apollo. Check Apollo possibilities in terms of storage/GraphQL queries.
    -   Webpack. Is is possible to make prebuild using webpack pipeline.
    -   https://github.com/vercel/next.js/tree/canary/examples/api-routes-graphql
