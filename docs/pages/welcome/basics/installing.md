# Установка

Добавляем Startup UI в свой проект и подключаем первый компонент.

## Добавляем в проект

Startup UI доступен в репозитории npm.

```sh
# Если используете npm
npm install startup-ui

# Если используете yarn
yarn add startup-ui
```

## Подключаем стили

```js
// app.js
import 'startup-ui/dist/index.css';
```

## Добавляем первый компонент

Чтобы убедиться, что всё работает, добавляем любой компонент в SFC-шаблон:

<div v-pre>

```vue
// Index.vue
<template>
    <SButton>Все работает!</SButton>
</template>
<script setup>
import { SButton } from 'startup-ui';
</script>
```

</div>

Должна появиться кнопка:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SButton>Все работает!</SButton>
</div>

<script setup>
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
</script>
