# Types

## Mapped types

<ToDoAlert>https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types</ToDoAlert>

## Utility Types

<ToDoAlert>https://www.typescriptlang.org/docs/handbook/utility-types.html</ToDoAlert>
<ToDoAlert>https://github.com/piotrwitek/utility-types</ToDoAlert>

```tsx
export type NonUndefined<A> = A extends undefined ? never : A;
```

## Type alias vs Interface

<ToDoAlert>
	Пока информация о типах и интерфейсах дана в виде сравнения, но это может поменяться. А может
	наоборот, вся типология будет дана в сравнении, чтобы определиться именно с теми ситуациями,
	когда лучше использовать тот или иной инструмент. Возможно, даже удастся определиться с тем, что
	именно следует использовать.
</ToDoAlert>

<ToDoAlert>
	http://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases
	https://microsoft.github.io/TypeScript-New-Handbook/everything/#interface-vs-alias
</ToDoAlert>

Использование в качестве псевдонимов для примитивных типов.

```tsx
type Id = number;

interface IId extends number {}
// 'number' only refers to a type, but is being used as a value here
```

Использование в качестве кортежей/tuples

```tsx
type Tuple = [number, number];
[1, 2, 3] as Tuple;
// Conversion of type '[number, number, number]' to type '[number, number]' may be a mistake

interface ITuple {
	0: number;
	1: number;
}
[1, 2, 3] as ITuple;
// Ok
```

Интерфейс не может реализовать "Disjoint unions" и даже не может расширять подобные типы.

```tsx
type Valuable = { time: number } | { money: number };

interface IValuable extends Valuable {}
// interface can only extend an object type or intersection of object types with statically known members.
```

Несколько деклараций type alias с одним и тем же именем вызовут ошибку. Такая же ситуация с интерфейсами объединит их декларации.

```tsx
type Person = { firstName: string; lastName: string };
type Person = { age: number };
// SyntaxError: Identifier 'Person' has already been declared

interface IPerson {
	firstName: string;
	lastName: string;
}
interface IPerson {
	age: number;
}
```

Интерфейс не может использовать вычисляемые свойства и описывать, например, mapped types.

```tsx
type Flag = "option1" | "option2";
type Flags = { [K in Flag]: boolean };
interface IFlags { [K in Flag]: boolean; }
// A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

interface IReadonly<T> {
    readonly [P in keyof T]: T[P];
}
// Unexpected token, expected "]"
```

В качестве Utility types используются type aliases

```tsx
type Brand<T, U> = T & { __brand: U };
type NonUndefined<A> = A extends undefined ? never : A;
```

Интерфейсы используют отложенное вычисления типа и таким образом могут участвовать в циклических ссылках.

<ToDoAlert>В последних версиях были примеры рекурсивных ссылок, стоит посмотреть</ToDoAlert>

```tsx
type Dude = string | Pals;
interface Pals extends Array<Dude> {}
// Ok

type Dude = string | Pals;
type Pals = Dude[];
// Type alias 'Dude' circularly references itself.
```

<ToDoAlert>
	"One difference is, that interfaces create a new name that is used everywhere. Type aliases
	don’t create a new name — for instance, error messages won’t use the alias name." - Как я
	понимаю, этот недостаток уже не актуален.
</ToDoAlert>
