import { ToDoAlert, DraftAlert } from "\$alerts";

<DraftAlert />

# React + TypeScript

## Использовать Type alias для свойств

Преимущества описаны в [соответствующем разделе](/ru/wiki/typescript/types). Возможно, для эффективной работы будет полезен автоматический вывод типов из начального состояния (initialState) или defaultProps:

```tsx
const initialState = { counter: 0 }
type GoodState = typeof initialState; // OK
interface BadState extends typeof initialState {} // ERROR: Expression expected
```

## Использование FunctionComponent

Props лучше аннотировать непосредственно в аргументах, не используя FC/FunctionComponent.

```tsx
const BadComponent: FC<SomeProps> = props => <></>;
const GoodComponent = (props: SomeProps) => <></>;
```

1. Более натуральный и очевидный синтаксис, без лишней магии и зависимостей.
2. Есть аргумент, что FC определяет свойство "children" как опциональное и это якобы ухудшает контроль (описано ниже в секции Children). Но пока подтверждений получить не удалось.
3. Есть мнение, что FC нарушает работу defaultProps. Но и это пока подтвердить не удалось. Точнее - пока никаким способом не удалось увидеть работу defaultProps.
4. Не надо будет включать лишний импорт.
5. Можно создавать обобщённые функциональные компоненты

```tsx
type Props<T extends object> = {

};

const GenericComponent = <T extends object>(props: Props<T>) => <></>;
const BadComponent: FC<Props<T extends object>> = (props) => <></>;
```

## Явное определение children

Может иметь смысл описывать в "props" свойство children. Так можно явно указывать на его необходимость или отсутствие.

```tsx
type PropsWithChildren = {
	children: ReactNode;
};

type PropsWithString = {
	children: string;
};

type PropsWithoutChildren = {
	children?: never;
};

const ComponentWithChildren = (props: PropsWithChildren) => <></>;
const ComponentWithString = (props: PropsWithString) => <></>;
const ComponentWithoutChildren = (props: PropsWithoutChildren) => <></>;

const FailingItemsComponent = () => (
	<>
		<ComponentWithChildren />
		<ComponentWithString />
		<ComponentWithString>
			<div />
		</ComponentWithString>
		<ComponentWithoutChildren>Fails</ComponentWithoutChildren>
	</>
);

const SuccessfullItemsComponent = () => (
	<>
		<ComponentWithChildren>
			<div />
		</ComponentWithChildren>
		<ComponentWithString>OK</ComponentWithString>
		<ComponentWithoutChildren />
	</>
);
```
