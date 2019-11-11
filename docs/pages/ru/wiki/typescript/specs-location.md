What is the best place to put specifications (tests)?

## Specific folder
Sources are placed in src/, while tests in something like specs/ folder.

### Cons
If directory structure is non-linear, it will be tricky to import SUT files from
tests. For example:

```
import sut from "../../src/
```

It will be fragile, because any relocation of SUT or test could break the build.

It can also add a couple of seconds to find the spec for specified SUT (the same
situation like import above, but from SUT-side).

## Specific filename
For example "spec" prefix added - sut.spec.ts.

## Inline
When SUT and specs is in the same code. But then we should have a possibility
to remove specs in production build. There are some options to do this:
* [Conditional compilation](conditional-compilation)
* Tree shaking. If production build does not import specs, they are not included
  into compilation at all.
* Using of construction that is automatically removed during transpilation or
  minification. For example - comments.
  