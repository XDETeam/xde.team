import { DraftAlert } from "$alerts";

<DraftAlert />

# Номинальная система типов

Typescript является языком с номинальной системой типов (TODO:ссылка), но есть возможность данное ограничение частично обойти. Часто подобный метод упоминается в контексте "branded", "opaque", "tagged" типов. Концепция достаточно простая, к типу добавляется дополнительное поле, которое содержит информацию об этом типе (номинальные идентификатор).

```tsx
export declare const Nomen: unique symbol;

export type Nominal<T, TNomen> = T & {
    readonly [Nomen]: TNomen;
};

export type USD = Nominal<number, "USD">;
export type EUR = Nominal<number, "EUR">;
```

## Проблемы

Номинация даёт контроль, когда типы приводятся через равенство. Но при этом другие операции могут безболезненно проходить.

```tsx
let amount = 100 as USD;
let debet = 40 as EUR;

amount = 90 as EUR;
// Type 'Nominal<number, "EUR">' is not assignable to type '{ readonly [Nomen]: "USD"; }'

let outcome = amount + debet;
// 60
```

## Области применения

-   Единицы измерения

## Links

-   https://github.com/microsoft/TypeScript/issues/202
