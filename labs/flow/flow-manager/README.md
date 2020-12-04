# Approach

<!-- TODO: .distinct -->

# Debug

Uses `https://www.npmjs.com/package/debug`

Prefixes:

-   `@xde/fm:short` - debug info from flow manager itself
-   `@xde/fm:verbose` - debug info from flow manager itself
-   `@xde/fm:functor` - debug info from written functors.

## Defaults

-   shows `@xde/fm:functor` for each env.
-   shows `@xde/fm:short` for non-production env.

To change this - just set `DEBUG` environment variable (see https://www.npmjs.com/package/debug).
To allow expensive debugging (Object circularity detection and logging) - additionally set `XDE_FM_MANUAL_PRODUCTION_DEBUG` env variable.
