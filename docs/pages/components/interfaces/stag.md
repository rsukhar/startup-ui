# STag

Тег (может также использоваться как отображение статуса).

## Базовый пример

<div class="docs-container">
<STag>Новый</STag>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Различные цвета

Атрибутом `color` можно передать значение цвета из палитры цветов:

<div class="docs-container">
<STag color="gray">gray</STag>&nbsp;
<STag color="primary">primary</STag>&nbsp;
<STag color="primary-dark">primary-dark</STag>&nbsp;
<STag color="primary-darkest">primary-darkest</STag>&nbsp;
<STag color="primary-light">primary-light</STag>&nbsp;
<STag color="primary-lightest">primary-lightest</STag>&nbsp;

<STag color="red">red</STag>&nbsp;
<STag color="red-dark">red-dark</STag>&nbsp;
<STag color="red-light">red-light</STag>&nbsp;
<STag color="red-lightest">red-lightest</STag>&nbsp;

<STag color="yellow">yellow</STag>&nbsp;
<STag color="yellow-dark">yellow-dark</STag>&nbsp;
<STag color="yellow-light">yellow-light</STag>&nbsp;
<STag color="yellow-lightest">yellow-lightest</STag>&nbsp;

<STag color="green">green</STag>&nbsp;
<STag color="green-dark">green-dark</STag>&nbsp;
<STag color="green-light">green-light</STag>&nbsp;
<STag color="green-lightest">green-lightest</STag>&nbsp;
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

<script setup>
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
