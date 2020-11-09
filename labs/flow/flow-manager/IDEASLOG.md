# [Rejected] 2020-11-09 - Aspect validation

When describing aspects - provide also validation function.
E.g., for percentage values - not more than 1.

Could be achieved with Functor ValidAspect when required.

# 2020-10-13 - Forbid same "to" functors

Сейчас для объекта `obj` среди доступных функторов отбираются те, для которых `fromAllow` и `toAllow` разрешают работу. Происходит это итерационно. Отобрался пул функторов, которые могут работать с текущим объектом - и они параллельно выполняются.
Сейчас есть возможность отобрать 2 функтора, оба из которых продуцируют тот же аспект. Это приводит к неожиданным результатам. Нужно на этапе отбора функторов для итерации сообщать о неподходящей композиции из функторов.

# [Rejected] 2020-10-11 - Lambda returns metainfo about errors

Есть роут `api/user`, который принимает `GET` и `POST`. `PUT` должен вернуть 405 с header `Allow: GET, POST`.

Вариант композиции для начала обработки GET и POST:

```
f_GET([routed: routed.path === api/user && routed.method === GET], [rawUserGetRequest])

f_POST([routed: routed.path === api/user && routed.method === POST], [rawUserPostRequest])
```

**Проблема: как из неотработавших функторов собрать информацию-советы о том, почему они не отработали и что им нужно, чтобы отработать?**

Предложение: из лямбд возвращать информацию об ошибках.
Она может быть своеобразной мета-информацией, цепляющейся к объекту.

Если достаточно долго спекулировать, то это сводится к тому, чтобы лямбда могла записывать в объект аспекты.

```
extend ILambda with {optionalTo?: TAspect;}

interface ILambdaError<TError, TAspect extends string> {aspect: TAspect; data: TError;}
```

```
f_GET([supportedMethods && routed: routed.path === api/user && (routed.method === GET || obj.supportedMethods.push(GET)], [rawUserGetRequest])

f_POST([supportedMethods && routed: routed.path === api/user && (routed.method === POST || obj.supportedMethods.push(POST)], [rawUserGetRequest])
```

И потом отдельный функтор, который уловит необработанный ответ

```
f_405([!handled, supportedMethods], [responseCode, headers])
```

Второе предложение - нагрузить первичный разбор методов для одного роута в промежуточный функтор.

Но все можно решить атомарно и с использованием функторного подхода:

```
f_GET([routed: routed.path === api/user && routed.method === GET], [rawUserGetRequest])

f_GET_SUPPORTED([routed: routed.path === api/user && routed.method !== GET, supportedMethods], [supportedMethods: force])


f_POST([routed: routed.path === api/user && routed.method === POST], [rawUserPostRequest])

f_GET_SUPPORTED([routed: routed.path === api/user && routed.method !== POST, supportedMethods], [supportedMethods: force])
```
