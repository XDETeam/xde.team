import { DraftAlert } from "\$alerts";

<DraftAlert />

# View-Models

## GraphQL

TODO:GraphQL vs ViewModels. Instead of developing a new query language, we will
slightly extend view-models to act as a declaration of the query, because it
naturally is.

Комбинируя аспекты должно быть не так сложно описать искомую модель. Некоторые из аспектов (например LoadingAspect внизу) могут выполнять и сервисные функции).

```tsx
export type SomeViewModel = LoadingAspect & {
	constProp1: "SomeConst";
	prop1: Aspect1 & { subProp1: string };
	prop2: {
		prop21: Aspect2;
	};
};
```
