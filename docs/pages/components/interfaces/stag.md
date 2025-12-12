# STag

Тег (может также использоваться как отображение статуса).

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Привязка к <a href="/pages/welcome/basics/colors.html">стандартым цветам</a> проекта, упрощает семантику до минимальных настроек и унифицирует цвета.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
<STag>Новый</STag>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Различные цвета

Атрибутом `color` можно передать значение цвета из палитры цветов:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
<STag color="gray">gray</STag>
<STag color="primary">primary</STag>
<STag color="primary-dark">primary-dark</STag>
<STag color="primary-darkest">primary-darkest</STag>
<STag color="primary-light">primary-light</STag>
<STag color="primary-lightest">primary-lightest</STag>

<STag color="red">red</STag>
<STag color="red-dark">red-dark</STag>
<STag color="red-light">red-light</STag>
<STag color="red-lightest">red-lightest</STag>

<STag color="yellow">yellow</STag>
<STag color="yellow-dark">yellow-dark</STag>
<STag color="yellow-light">yellow-light</STag>
<STag color="yellow-lightest">yellow-lightest</STag>

<STag color="green">green</STag>
<STag color="green-dark">green-dark</STag>
<STag color="green-light">green-light</STag>
<STag color="green-lightest">green-lightest</STag>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STag from '../../../../packages/startup-ui/src/components/STag.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code1 = `<STag>Новый</STag>
`;
const fullCode1 = `<template>
<STag>Новый</STag>
</template>
<script setup>
import { STag } from 'startup-ui';
<\/script>
`;

const code2 = `<STag color="gray">gray</STag>
<STag color="primary">primary</STag>
<STag color="primary-dark">primary-dark</STag>
<STag color="primary-darkest">primary-darkest</STag>
<STag color="primary-light">primary-light</STag>
<STag color="primary-lightest">primary-lightest</STag>

<STag color="red">red</STag>
<STag color="red-dark">red-dark</STag>
<STag color="red-light">red-light</STag>
<STag color="red-lightest">red-lightest</STag>

<STag color="yellow">yellow</STag>
<STag color="yellow-dark">yellow-dark</STag>
<STag color="yellow-light">yellow-light</STag>
<STag color="yellow-lightest">yellow-lightest</STag>

<STag color="green">green</STag>
<STag color="green-dark">green-dark</STag>
<STag color="green-light">green-light</STag>
<STag color="green-lightest">green-lightest</STag>
`;
const fullCode2 = `<template>
<STag color="gray">gray</STag>
<STag color="primary">primary</STag>
<STag color="primary-dark">primary-dark</STag>
<STag color="primary-darkest">primary-darkest</STag>
<STag color="primary-light">primary-light</STag>
<STag color="primary-lightest">primary-lightest</STag>

<STag color="red">red</STag>
<STag color="red-dark">red-dark</STag>
<STag color="red-light">red-light</STag>
<STag color="red-lightest">red-lightest</STag>

<STag color="yellow">yellow</STag>
<STag color="yellow-dark">yellow-dark</STag>
<STag color="yellow-light">yellow-light</STag>
<STag color="yellow-lightest">yellow-lightest</STag>

<STag color="green">green</STag>
<STag color="green-dark">green-dark</STag>
<STag color="green-light">green-light</STag>
<STag color="green-lightest">green-lightest</STag>
</template>
<script setup>
import { STag } from 'startup-ui';
<\/script>
`;
</script>
