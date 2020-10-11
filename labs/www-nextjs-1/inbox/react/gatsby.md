At a high level, what happens during the whole bootstrap and build process is:

-   Node objects are sourced from whatever sources you defined in gatsby-config.js with plugins as well as in your gatsby-node.js file
-   A schema is inferred from the Node objects
-   Pages are created based off JavaScript components in your site or in installed themes
-   GraphQL queries are extracted and run to provide data for all pages
-   Static files are created and bundled in the public directory

## Steps of the bootstrap phase

The steps of the bootstrap phase are shared between develop and build (with only one exception in the delete html and css files from previous builds step). This includes:

1. open and validate gatsby-configs
   The gatsby-config.js file for the site and any installed themes are opened, ensuring that a function or object is exported for each.

2. load plugins
   Plugins installed and included in the config of your site and your site’s themes are loaded. Gatsby uses Redux for state management internally and stores info like the version, name, and what APIs are used by each plugin.

3. onPreInit
   Runs the onPreInit node API if it has been implemented by your site or any installed plugins.

4. delete html and css files from previous builds
   The only different step between develop and build, the HTML and CSS from previous builds is deleted to prevent problems with styles and pages that no longer exist.

5. initialize cache
   Check if new dependencies have been installed in the package.json; if the versions of installed plugins have changed; or if the gatsby-config.js or the gatsby-node.js files have changed. Plugins can interact with the cache.

6. copy gatsby files
   Copies site files into the cache in the .cache folder.

7. onPreBootstrap
   Calls the onPreBootstrap node API in your site or plugins where it is implemented.

8. source and transform nodes
   Creates Node objects from your site and all plugins implementing the sourceNodes API, and warns about plugins that aren’t creating any nodes. Nodes created by source or transformer plugins are cached.

    Node objects created at this stage are considered top level nodes, meaning they don’t have a parent node that they are derived from.

9. Add explicit types
   Adds types to the GraphQL schema for nodes that you have defined explicitly with Gatsby’s schema optimization APIs.

10. Add inferred types
    All other nodes not already defined are inspected and have types inferred by Gatsby.

11. Processing types
    Composes 3rd party schema types, child fields, custom resolve functions, and sets fields in the GraphQL schema. It then prints information about type definitions.

12. building schema
    Imports the composed GraphQL schema and builds it.

13. createPages
    Calls the createPages API for your site and all plugins implementing it, like when you create pages programmatically in your gatsby-node.js.

    Plugins can handle the onCreatePage event at this point for use cases like manipulating the path of pages.

14. createPagesStatefully
    Similar to the createPages step, but for the createPagesStatefully API which is intended for plugins who want to manage creating and removing pages in response to changes in data not managed by Gatsby.

15. onPreExtractQueries
    Calls the onPreExtractQueries API for your site and all plugins implementing it.

16. update schema
    Rebuilds the GraphQL schema, this time with SitePage context — an internal piece of Gatsby that allows you to introspect all pages created for your site.

17. extract queries from components
    All JavaScript files in the site are loaded and Gatsby determines if there are any GraphQL queries exported from them. If there are problematic queries they can be reported back with warnings or errors. All these queries get queued up for execution in a later step.

18. write out requires
    An internal Gatsby utility adds the code that files need to load/require.

19. write out redirect data
    An internal Gatsby utility adds code for redirects, like implemented with createRedirect.

20. Build manifest and related icons - (from gatsby-plugin-manifest)
    This step is activated by gatsby-plugin-manifest in the gatsby-default-starter and is not a part of the built-in Gatsby functionality, demonstrating how plugins are able to tap into the lifecycle. The plugin adds a manifest.json file with the specified configurations and icons.

21. onPostBootstrap
    Calls the onPostBootstrap API for your site and all plugins implementing it.

## Steps of the build phase

1. run static queries
   Static queries in non-page components that were queued up earlier from query extraction are run to provide data to the components that need it.

2. Generating image thumbnails — 6/6 - (from gatsby-plugin-sharp)
   Another step that is not a part of the built-in Gatsby functionality, but is the result of installing gatsby-plugin-sharp, which taps into the lifecycle. Sharp runs processing on images to create image assets of different sizes.

3. Building production JavaScript and CSS bundles
   Compiles JavaScript and CSS using webpack.

4. Rewriting compilation hashes
   Compilation hashes are used by webpack for code splitting and keeping the cache up to date, and all files with page data need to be updated with the new hashes since they’ve been recompiled.

5. run page queries
   Page queries that were queued up earlier from query extraction are run so the data pages need can be provided to them.

6. Building static HTML for pages
   With everything ready for the HTML pages in place, HTML is compiled and written out to files so it can be served up statically. Since HTML is being produced in a Node.js server context, references to browser APIs like window can break the build and must be conditionally applied.

7. By default, Gatsby rebuilds static HTML for all pages on each build. There is an experimental feature flag GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES which enables conditional page builds.

## InBox

-   По умолчанию в Gatsby работает плагин https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-page-creator, который из файлов в папке pages создаёт узлы. Но это не точно.
-   Создание узлов SitePage упоминается во внутреннем плагине internal-data-bridge, он же выступал в качестве owner, если посмотреть создаваемые узлы в gatsby-node.js#onCreateNode. https://www.gatsbyjs.org/docs/internal-data-bridge/
