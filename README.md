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

## ToDo

-   How will mesh looks like?
-   Investigation (/labs):
    -   GraphQL. Is it good for mesh?
    -   Apollo. Check Apollo possibilities in terms of storage/GraphQL queries.
    -   Gatsby. Conceptually design is interesting. Redux, GraphQL during compilation process. But implementation...
    -   Webpack. Is is possible to make prebuild using webpack pipeline.
    -   https://github.com/vercel/next.js/tree/canary/examples/api-routes-graphql
