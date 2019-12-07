import { ToDoAlert } from "\$alerts";

# Отладка в VS Code

## React и т.п.

### Установка расширения

`.vscode/extensions.json`

```JSON
{
    "recommendations": ["msjsdiag.debugger-for-chrome"]
}
```

### Добавление конфигурации отладки

`.vscode/launch.json`

```JSON
{
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src"
}
```

Остается запустить `npm start` и начать отладку.

## Node TypeScript

### Добавление конфигурации отладки

`.vscode/launch.json`

```JSON
{
    "name": "Attach to node",
    "type": "node",
    "request": "attach",
    "restart": true,
    "port": 9229
}
```

### Установка необходимых модулей

```shell
yarn add nodemon ts-node typescript -D
```

### Добавление конфигурации для nodemon

Создадим `nodemon.json` в корне проекта:

```JSON
{
  "verbose": true,
  "debug": false,
  "inspect": true,
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --inspect -r ts-node/register ./src/index.ts"
}
```

### Добавления скрипта

В `package.json`:

```JSON
"scripts": {
    "dev:debug": "nodemon"
}
```

Остается запустить скипт и начать отладку.

<ToDoAlert>https://code.visualstudio.com/docs/nodejs/debugging-recipes</ToDoAlert>
