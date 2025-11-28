# SButton

Кнопка.

## Стандартный пример

Используйте `color`, `outlined`, `transparent`, `disabled`, `small`, `loading` и `fullwidth` чтобы задать стили кнопок.

### Основной цвет
<span></span>
<div class="docs-container">
<div class="components">
    <div class="row">
        <SButton>Основное действие</SButton>
        <SButton outlined>Дополнительное действие</SButton>
        <SButton transparent>Прозрачная кнопка</SButton>
        <SButton disabled>Заблокированная кнопка</SButton>
        <SButton small>Маленькая кнопка</SButton>
    </div>
</div>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

### Красная кнопка
<span></span>
<div class="docs-container">
    <div class="components">
        <div class="row">
            <SButton color="red">Основное действие</SButton>
            <SButton outlined color="red">Дополнительное действие</SButton>
            <SButton transparent color="red">Прозрачная кнопка</SButton>
            <SButton disabled color="red">Заблокированная кнопка</SButton>
            <SButton small color="red">Маленькая кнопка</SButton>
        </div>
    </div>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

### Зеленая кнопка
<span></span>
<div class="docs-container">
    <div class="row">
        <SButton color="green">Основное действие</SButton>
        <SButton outlined color="green">Дополнительное действие</SButton>
        <SButton transparent color="green">Прозрачная кнопка</SButton>
        <SButton disabled color="green">Заблокированная кнопка</SButton>
        <SButton small color="green">Маленькая кнопка</SButton>
    </div>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

### Жёлтая кнопка
<span></span>
<div class="docs-container">
    <div class="row">
        <SButton color="yellow">Основное действие</SButton>
        <SButton outlined color="yellow">Дополнительное действие</SButton>
        <SButton transparent color="yellow">Прозрачная кнопка</SButton>
        <SButton disabled color="yellow">Заблокированная кнопка</SButton>
        <SButton small color="yellow">Маленькая кнопка</SButton>
    </div>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

### Кнопка на всю ширину формы
<span></span>
<div class="docs-container">
    <SButton fullwidth>Основное действие</SButton>
    <SButton fullwidth color="red">Основное действие</SButton>
    <SButton fullwidth color="green">Основное действие</SButton>
    <SButton fullwidth color="yellow">Основное действие</SButton>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Действия по кнопке

### Отправка формы

Если кнопка внутри формы, то отправляет форму:

<CustomCodeBlock :code="{text: code6, lang: 'js'}" />

### Кастомное действие

<CustomCodeBlock :code="{text: code7, lang: 'vue'}" />

### Переход по ссылке

Если добавляем href, то кнопка по умолчанию становится семантически правильным анкором:

<CustomCodeBlock :code="{text: code8, lang: 'vue'}" />

### Переход по внутренней ссылке InertiaJs

Если нужно сделать кнопку внутренней InertjaJS-ссылкой, то используем атрибут “is”:

<CustomCodeBlock :code="{text: code9, lang: 'vue'}" />

<script setup>
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';
import { Link } from '@inertiajs/vue3'

const code1 = `<SButton>Основное действие</SButton>
<SButton outlined>Дополнительное действие</SButton>
<SButton transparent>Прозрачная кнопка</SButton>
<SButton disabled>Заблокированная кнопка</SButton>
<SButton small>Маленькая кнопка</SButton>
`;
const fullCode1 = `<template>
    <div class="row">
        <SButton>Основное действие</SButton>
        <SButton outlined>Дополнительное действие</SButton>
        <SButton transparent>Прозрачная кнопка</SButton>
        <SButton disabled>Заблокированная кнопка</SButton>
        <SButton small>Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>
<style lang="scss">
.row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
<\/style>
`;

const code2 = `<SButton color="red">Основное действие</SButton>
<SButton outlined color="red">Дополнительное действие</SButton>
<SButton transparent color="red">Прозрачная кнопка</SButton>
<SButton disabled color="red">Заблокированная кнопка</SButton>
<SButton small color="red">Маленькая кнопка</SButton>
`;
const fullCode2 = `<template>
    <div class="row">
        <SButton color="red">Основное действие</SButton>
        <SButton outlined color="red">Дополнительное действие</SButton>
        <SButton transparent color="red">Прозрачная кнопка</SButton>
        <SButton disabled color="red">Заблокированная кнопка</SButton>
        <SButton small color="red">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>
<style lang="scss">
.row {
    display: flex;
    gap: 6px;
}
<\/style>
`;

const code3 = `<SButton color="green">Основное действие</SButton>
<SButton outlined color="green">Дополнительное действие</SButton>
<SButton transparent color="green">Прозрачная кнопка</SButton>
<SButton disabled color="green">Заблокированная кнопка</SButton>
<SButton small color="green">Маленькая кнопка</SButton>
`;
const fullCode3 = `<template>
    <div class="row">
        <SButton color="green">Основное действие</SButton>
        <SButton outlined color="green">Дополнительное действие</SButton>
        <SButton transparent color="green">Прозрачная кнопка</SButton>
        <SButton disabled color="green">Заблокированная кнопка</SButton>
        <SButton small color="green">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>
<style lang="scss">
.row {
    display: flex;
    gap: 6px;
}
<\/style>
`;

const code4 = `<SButton color="yellow">Основное действие</SButton>
<SButton outlined color="yellow">Дополнительное действие</SButton>
<SButton transparent color="yellow">Прозрачная кнопка</SButton>
<SButton disabled color="yellow">Заблокированная кнопка</SButton>
<SButton small color="yellow">Маленькая кнопка</SButton>
`;
const fullCode4 = `<template>
    <div class="row">
        <SButton color="yellow">Основное действие</SButton>
        <SButton outlined color="yellow">Дополнительное действие</SButton>
        <SButton transparent color="yellow">Прозрачная кнопка</SButton>
        <SButton disabled color="yellow">Заблокированная кнопка</SButton>
        <SButton small color="yellow">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>
<style lang="scss">
.row {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}
<\/style>
`;

const code5 = `<SButton fullwidth>Основное действие</SButton>
<SButton fullwidth color="red">Основное действие</SButton>
<SButton fullwidth color="green">Основное действие</SButton>
<SButton fullwidth color="yellow">Основное действие</SButton>
`;
const fullCode5 = `<template>
<div class="row">
    <SButton fullwidth>Основное действие</SButton>
    <SButton fullwidth color="red">Основное действие</SButton>
    <SButton fullwidth color="green">Основное действие</SButton>
    <SButton fullwidth color="yellow">Основное действие</SButton>
</div>
</template>
<script setup>
import { SButton } from 'startup-ui';
<\/script>
<style lang="scss">
.row {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}
<\/style>
`;

const code6 = `<SForm method="post" action="/users/create">
  ...
  <SButton>Создать пользователя</SButton>
</SForm>
`;

const code7 = `<SButton @click="createUser">Создать пользователя</SButton>
`;

const code8 = `<SButton href="https://pfpult.ru/docs">Документация</SButton>
`;

const code9 = `<SButton :is="Link" href="/projects/create">Создать проект</SButton>
`;
</script>
<style scoped>
.docs-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
</style>