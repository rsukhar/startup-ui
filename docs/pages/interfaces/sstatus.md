# SStatus

Текстовый статус (как правило с иконкой).

## Базовый пример

<div class="docs-container">
<div class="row">
    <SStatus color="green" icon="check">Работает</SStatus>
</div>
<div class="row">
    <SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
</div>
<div class="row">
    <SStatus color="text-light" icon="pause">Не запущен</SStatus>
</div>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Различные цвета

Помимо иконок можно кастомизировать цвет статуса по стандартной палитре цветов:

<div class="docs-container">
    <div class="row">
        <SStatus color="text" icon="check">text</SStatus>
        <SStatus color="text-light" icon="check">text-light</SStatus>
    </div>
    <div class="row">
        <SStatus color="primary" icon="check">primary</SStatus>
        <SStatus color="primary-dark" icon="check">primary-dark</SStatus>
        <SStatus color="primary-darkest" icon="check">primary-darkest</SStatus>
    </div>
    <div class="row">
        <SStatus color="red" icon="check">red</SStatus>
        <SStatus color="red-dark" icon="check">red-dark</SStatus>
    </div>
    <div class="row">
        <SStatus color="yellow" icon="check">yellow</SStatus>
        <SStatus color="yellow-dark" icon="check">yellow-dark</SStatus>
    </div>
    <div class="row">
        <SStatus color="green" icon="check">green</SStatus>
        <SStatus color="green-dark" icon="check">green-dark</SStatus>
    </div>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

<script setup>
import SStatus from '../../../packages/startup-ui/src/components/SStatus.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const code1 = `
<SStatus color="green" icon="check">Работает</SStatus>
<SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
<SStatus color="text-light" icon="pause">Не запущен</SStatus>
`;
const fullCode1 = `
<template>
<div class="row">
    <SStatus color="green" icon="check">Работает</SStatus>
</div>
<div class="row">
    <SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
</div>
<div class="row">
    <SStatus color="text-light" icon="pause">Не запущен</SStatus>
</div>
</template>
<script setup>
import { SStatus } from 'startup-ui';
<\/script>
`;

const code2 = `
<SStatus color="text" icon="check">text</SStatus>
<SStatus color="text-light" icon="check">text-light</SStatus>
<SStatus color="primary" icon="check">primary</SStatus>
<SStatus color="primary-dark" icon="check">primary-dark</SStatus>
<SStatus color="primary-darkest" icon="check">primary-darkest</SStatus>
<SStatus color="red" icon="check">red</SStatus>
<SStatus color="red-dark" icon="check">red-dark</SStatus>
<SStatus color="yellow" icon="check">yellow</SStatus>
<SStatus color="yellow-dark" icon="check">yellow-dark</SStatus>
<SStatus color="green" icon="check">green</SStatus>
<SStatus color="green-dark" icon="check">green-dark</SStatus>
`;
const fullCode2 = `
<template>
<div class="row">
    <SStatus color="text" icon="check">text</SStatus>
    <SStatus color="text-light" icon="check">text-light</SStatus>
</div>
<div class="row">
    <SStatus color="primary" icon="check">primary</SStatus>
    <SStatus color="primary-dark" icon="check">primary-dark</SStatus>
    <SStatus color="primary-darkest" icon="check">primary-darkest</SStatus>
</div>
<div class="row">
    <SStatus color="red" icon="check">red</SStatus>
    <SStatus color="red-dark" icon="check">red-dark</SStatus>
</div>
<div class="row">
    <SStatus color="yellow" icon="check">yellow</SStatus>
    <SStatus color="yellow-dark" icon="check">yellow-dark</SStatus>
</div>
<div class="row">
    <SStatus color="green" icon="check">green</SStatus>
    <SStatus color="green-dark" icon="check">green-dark</SStatus>
</div>
</template>
<script setup>
import { SStatus } from 'startup-ui';
<\/script>
`;
</script>
<style lang="scss">
.row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .s-status {
        flex-basis: 150px;
    }
}
</style>