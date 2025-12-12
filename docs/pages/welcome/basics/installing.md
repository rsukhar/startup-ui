# Установка

Добавляем Startup UI в свой проект и подключаем первый компонент.

## Добавляем в проект

Startup UI доступен в репозитории npm.

<CustomCodeBlock :code="{text: code, lang: 'sh'}" />

## Подключаем стили

<CustomCodeBlock :code="{text: code2, lang: 'js'}" />

## Добавляем первый компонент

Чтобы убедиться, что всё работает, добавляем любой компонент в SFC-шаблон:

<CustomCodeBlock :code="{text: code3, lang: 'js'}" />


<script setup>
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';

const code = `# Если используете npm
npm install startup-ui

# Если используете yarn
yarn add startup-ui`;

const code2 = `// app.js
import 'startup-ui/dist/index.css';`;

const code3 = `// Index.vue
<template>
    <SButton>Все работает!</SButton>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>`;
</script>

Должна появиться кнопка:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SButton>Все работает!</SButton>
</div>