import { DraftAlert, NoteAlert, ToDoAlert } from "\$alerts";

<DraftAlert />

Создаем `Dockerfile`, где получаем стабильную версию `node` и устанавливаем рабочую директорию внутри контейнера:

```Dockerfile
FROM node:10

ARG WORKING_DIR
WORKDIR ${WORKING_DIR}
```

Директорию можно будет передать, к примеру, через файл `docker-compose.yml`:

```
build:
    args:
        - WORKING_DIR="/app"
```

Далее копируем файлы `package.json` и `package-lock.json` и устанавливаем npm модули, указанные в этих файлах.
Кстати, для подобных случаев существует `npm ci` (она шустрее и строже привычного `npm install`).

<NoteAlert>Необходимо убедиться, что присутствует файл `package-lock.json`. Если его нет - нужно запустить `npm install` или `yarn` и протестировать успешность работы приложения.</NoteAlert>

<NoteAlert>Необходимо помнить о разделении `dependencies` и `devDependencies` в файле `package.json`, чтобы не засорять продакшн ненужными модулями.</NoteAlert>

<ToDoAlert>Тут интересный момент со сборкой проекта внутри контейнера. Получается, что нужно либо всё, что необходимо для сборки добавлять в `dependencies`, либо устанавливать внутри контейнеров и `devDependencies` в том числе.</ToDoAlert>

```Dockerfile
COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; then \
    npm ci --only=production; \
  else \
    npm install; \
  fi
```

`NODE_ENV` можно передать так же, как передавалась `WORKING_DIR` выше.

<ToDoAlert>Кстати, если проект собирается бандлером типа `webpack`, то вся эта штука с установкой пакетов может не понадобится. Или можно будет удалить `node_modules` после сборки проекта внутри образа.</ToDoAlert>

# .dockerignore file

Можно добавить файл `.dockerignore` в корень текущего контекста сборки.

Используем этот файл, чтобы при сборке образа:

-   не копировать локально установленные `node_modules` и не перезаписать модули, установленные в образе в предыдущем шаге
-   не копировать файлы с чувствительной информацией (типа `.env`)
-   не копировать лишние файлы и директории (типа `.git`), чтобы не увеличивать размер образа
-   не монтировать ненужные директории, находящиеся в текущем контексте (лишнее монтирование может существенно замедлить сборку)

Пример файла `.dockerignore`:

```dockerignore
**/.DS_Store
**/.env
**/.git
**/node_modules
**/npm-debug.log

large-unused-folder-in-the-current-context
```

Следующим этапом в `Dockerfile` скопируем исходный код приложения в контейнер и определим команду, которая будет запускать наше приложение. Кстати, в этом случае лучше вызывать `node` напрямую, чем через `npm script`.

<ToDoAlert>Почему</ToDoAlert>

```Dockerfile
COPY . .

# Если не планируется использовать docker-compose, можно указать маппинг порта
# EXPOSE 8080

CMD [ "node", "dist/index.js" ]
```

# Безопасность

По умолчанию Docker запускает контейнер как root, что может быть потенциальной проблемой безопасности. Образы `node` имеют непривилегированного пользователя для этого случая.

```Dockerfile
USER node
```

# Память

При запуске контейнера можно передать параметры для ограничения используемой памяти.

```
-m "300M" --memory-swap "1G"
```

<ToDoAlert>То же описать для docker-compose</ToDoAlert>

# Размер образа

Также можно попытаться уменьшить размер образа, используя разные тэги образа `node` в `Dockerfile`:

```Dockerfile
FROM node:10-slim
```

# Final file

```Dockerfile
FROM node:10-slim

ARG WORKING_DIR
WORKDIR ${WORKING_DIR}

COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; then \
        npm ci --only=production; \
    else \
        npm install; \
    fi

COPY . .

CMD [ "node", "dist/index.js" ]

USER node
```

Также можно подключить [Tiny](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals).

# Код приложения

Скорее всего, контейнер с той же базой данных не будет полностью готов на момент обращения к нему из скрипта. Для этого случая приложение должно пересоздавать соединение к базе данных при неудаче. И делать это как при первичном запуске, так и при потере соединения.

Или можно воспользоваться утилитами типа `wait-for-it`, `dockerize`, `wait-for`.

# Использование переменных среды

Для примера, создадим простейший `express` сервер в `index.ts`:

```ts
import express from "express";

const app = express();
const { API_PORT } = process.env;

app.get("/", (req, res) => res.send(`NODE_ENV: ${process.env.NODE_ENV}`));
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}!`));
```

Переменные среды можно установить в `docker-compose.yml`:

```yml
image:
    environment:
        # API_PORT_DEV в этом случае установлен в .env файле
        - API_PORT=${API_PORT_DEV}
        - NODE_ENV=development
```

# Production

<ToDoAlert>Docker swarm, restart policy</ToDoAlert>

# Monorepo

Пример `Dockerfile` с `yarn workspaces`:

```Dockerfile
FROM node:10-slim

ARG WORKING_DIR
WORKDIR ${WORKING_DIR}

# Root
COPY package.json yarn.lock ./

# Main package "A" for the current image
COPY packages/A/package.json packages/A/

# Package "A" depends on:
# "B"
COPY packages/B/package.json packages/B/

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; then \
    yarn install --frozen-lockfile --non-interactive --production=true; \
  else \
    yarn; \
  fi

COPY packages/A/ packages/A/
COPY packages/B/ packages/B/

RUN cd packages/A && yarn run build

CMD [ "node", "packages/A/dist/index.js" ]

USER node

```

В `docker-compose.yml` установим контекст на корень monorepo:

```yml
build:
    context: ../..
    dockerfile: ./docker/A/Dockerfile
```

<ToDoAlert>То же описать для typescript project references</ToDoAlert>
