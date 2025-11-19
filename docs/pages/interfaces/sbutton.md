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
        &nbsp;
        <SButton outlined>Дополнительное действие</SButton>
        &nbsp;
        <SButton transparent>Прозрачная кнопка</SButton>
        &nbsp;
        <SButton disabled>Заблокированная кнопка</SButton>
        &nbsp;
        <SButton small>Маленькая кнопка</SButton>
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="row">
        <SButton>Основное действие</SButton>
        <SButton outlined>Дополнительное действие</SButton>
        <SButton transparent>Прозрачная кнопка</SButton>
        <SButton disabled>Заблокированная кнопка</SButton>
        <SButton fullwidth>Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
</scrip>
<style lang="scss">
.row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
</style>
```
:::

</div>

### Красная кнопка
<span></span>
<div class="docs-container">
<div class="components">
    <div class="row">
        <SButton color="red">Основное действие</SButton>
        &nbsp;
        <SButton outlined color="red">Дополнительное действие</SButton>
        &nbsp;
        <SButton transparent color="red">Прозрачная кнопка</SButton>
        &nbsp;
        <SButton disabled color="red">Заблокированная кнопка</SButton>
        &nbsp;
        <SButton small color="red">Маленькая кнопка</SButton>
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="row">
        <SButton color="red">Основное действие</SButton>
        <SButton outlined color="red">Дополнительное действие</SButton>
        <SButton transparent color="red">Прозрачная кнопка</SButton>
        <SButton disabled color="red">Заблокированная кнопка</SButton>
        <SButton fullwidth color="red">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
</scrip>
<style lang="scss">
.row {
    display: flex;
    gap: 6px;
}
</style>
```
:::

</div>

### Зеленая кнопка
<span></span>
<div class="docs-container">
    <div class="row">
        <SButton color="green">Основное действие</SButton>
        &nbsp;
        <SButton outlined color="green">Дополнительное действие</SButton>
        &nbsp;
        <SButton transparent color="green">Прозрачная кнопка</SButton>
        &nbsp;
        <SButton disabled color="green">Заблокированная кнопка</SButton>
        &nbsp;
        <SButton small color="green">Маленькая кнопка</SButton>
    </div>

::: details Показать код
```js
<template>
    <div class="row">
        <SButton color="green">Основное действие</SButton>
        <SButton outlined color="green">Дополнительное действие</SButton>
        <SButton transparent color="green">Прозрачная кнопка</SButton>
        <SButton disabled color="green">Заблокированная кнопка</SButton>
        <SButton fullwidth color="green">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
</scrip>
<style lang="scss">
.row {
    display: flex;
    gap: 6px;
}
</style>
```
:::

</div>

### Жёлтая кнопка
<span></span>
<div class="docs-container">
    <div class="row">
        <SButton color="yellow">Основное действие</SButton>
        &nbsp;
        <SButton outlined color="yellow">Дополнительное действие</SButton>
        &nbsp;
        <SButton transparent color="yellow">Прозрачная кнопка</SButton>
        &nbsp;
        <SButton disabled color="yellow">Заблокированная кнопка</SButton>
        &nbsp;
        <SButton small color="yellow">Маленькая кнопка</SButton>
    </div>

::: details Показать код
```js
<template>
    <div class="row">
        <SButton color="yellow">Основное действие</SButton>
        <SButton outlined color="yellow">Дополнительное действие</SButton>
        <SButton transparent color="yellow">Прозрачная кнопка</SButton>
        <SButton disabled color="yellow">Заблокированная кнопка</SButton>
        <SButton fullwidth color="yellow">Маленькая кнопка</SButton>
    </div>
</template>
<script setup>
import { SButton } from 'startup-ui';
</scrip>
<style lang="scss">
.row {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}
</style>
```
:::

</div>

### Кнопка на всю ширину формы
<span></span>
<div class="docs-container">
    <SButton fullwidth>Основное действие</SButton>
    <SButton fullwidth color="red">Основное действие</SButton>
    <SButton fullwidth color="green">Основное действие</SButton>
    <SButton fullwidth color="yellow">Основное действие</SButton>
</div>

::: details Показать код
```js
<template>
<div class="row">
    <SButton fullwidth>Основное действие</SButton>
    <SButton fullwidth color="red">Основное действие</SButton>
    <SButton fullwidth color="green">Основное действие</SButton>
    <SButton fullwidth color="yellow">Основное действие</SButton>
</div>
</template>
<script setup>
import { SButton } from 'startup-ui';
</scrip>
<style lang="scss">
.row {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}
</style>
```
:::

## Действия по кнопке

### Отправка формы

Если кнопка внутри формы, то отправляет форму:

```js
<SForm method="post" action="/users/create">
  ...
  <SButton>Создать пользователя</SButton>
</SForm>
```

### Кастомное действие

```js
<SButton @click="createUser">Создать пользователя</SButton>
```

### Переход по ссылке

Если добавляем href, то кнопка по умолчанию становится семантически правильным анкором:

```js
<SButton href="https://pfpult.ru/docs">Документация</SButton>
```

### Переход по внутренней ссылке InertiaJs

Если нужно сделать кнопку внутренней InertjaJS-ссылкой, то используем атрибут “is”:

```js
import { Link } from '@inertiajs/vue3'

<SButton :is="Link" href="/projects/create">Создать проект</SButton>
```

<script setup>
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';
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