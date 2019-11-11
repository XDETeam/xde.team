Ability to remove some part of code during transpilation depends on condition.
C/C++/C#/etc usage sample looks similar to

```
#if DEBUG
	...conditional code...
#endif
```

## Proposals

### Transformers
We widely consider usage of TypeScript transformers. Probably it would be easy
to implement conditional compilation with transformers. For example,

```
import { if as $if` } from "@sde/build";

$if(condition) { ... code block ... }
```

### Decorators

### Tree-shaking

## Related issues
* https://github.com/microsoft/TypeScript/issues/449
* https://github.com/microsoft/TypeScript/issues/3538

## Applications
* Specifications placed in the same file as STU.
* Production/Staging/Development environments.
* Conditional import for DI/IoC-like implementations.
* 