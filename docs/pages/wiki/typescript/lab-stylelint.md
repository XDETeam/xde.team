import { DraftAlert, ToDoAlert } from "\$alerts";

<DraftAlert />

# Stylelint

Linter for styles.

## Installation

```shell
yarn add stylelint stylelint-config-standard -D
```

## Configuration

### Basic

File `.stylelintrc.json`

```JSON
{
    "extends": "stylelint-config-standard"
}
```

To get advantage of `.stylelintrc.json` config in VS Code - install `stylelint` plugin.

<ToDoAlert>Create vscode extensions.json with reccomendation</ToDoAlert>

Workspace `settings.json`:

<ToDoAlert>Create vscode settings.json with settings</ToDoAlert>

```JSON
{
    "stylelint.enable": true
}
```

### Ordering

```shell
yarn add stylelint-order -D
```

File `.stylelintrc.json`

```JSON
{
    "plugins": ["stylelint-order"],
    "rules": {
        "order/order": ["custom-properties", "declarations"],
        "order/properties-alphabetical-order": true
    }
}
```

### SCSS

```shell
yarn add stylelint-scss -D
```

File `.stylelintrc.json`

```JSON
{
    "plugins": ["stylelint-scss"],
    "rules": {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true
    }
}
```

### Postcss

File `.stylelintrc.json`

```JSON
{
    "rules": {
        "at-rule-no-unknown": [
            true,
            {
                "ignoreAtRules": ["extends"]
                // In case using css framework like tailwind
                // "ignoreAtRules": ["extends", "tailwind"]
            }
        ],
        "block-no-empty": null
    }
}
```

To disable VS Code from validating CSS write this in workspace `settings.json`:

```JSON
{
    "css.validate": false
}
```

Also you may add `stylelint` to your `postcss.config.js` plugins list.

```javascript
module.exports = {
	plugins: [require("stylelint"), require("...plugins")]
};
```

## Usage

### Shell

```shell
npx stylelint "**/*.css"
```

### npm scripts

Example for `SCSS`:

```JSON
{
    "scripts": {
        "test:style": "stylelint \"src/**/*.scss\""
    }
}
```
