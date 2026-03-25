# SStatus

Текстовый статус (как правило с иконкой).

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Привязка к FontAwesome, который бесплатен и оптимально решает задачи иконок для стартапов.</li>
        <li>Привязка к <a href="/pages/welcome/basics/colors.html">стандартым цветам</a> проекта, упрощает семантику до минимальных настроек и унифицирует цвета.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container" style="flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center">
    <SStatus color="green" icon="check">Работает</SStatus>
    <SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
    <SStatus color="text-light" icon="pause">Не запущен</SStatus>
</div>

:::code-group
```vue [Пример]
<template>
    <SStatus color="green" icon="check">Работает</SStatus>
    <SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
    <SStatus color="text-light" icon="pause">Не запущен</SStatus>
</template>
```
```vue [Весь код]
<template>
    <SStatus color="green" icon="check">Работает</SStatus>
    <SStatus color="red-dark" icon="triangle-exclamation">Остановлен</SStatus>
    <SStatus color="text-light" icon="pause">Не запущен</SStatus>
</template>

<script setup>
import { SStatus } from 'startup-ui';
</script>
```
:::

## Различные цвета

Помимо иконок можно кастомизировать цвет статуса по стандартной палитре цветов:

<div class="docs-container" style="flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center">
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
</div>

:::code-group
```vue [Пример]
<template>
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
</template>
```
```vue [Весь код]
<template>
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
</template>

<script setup>
import { SStatus } from 'startup-ui';
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| color | string | undefined | Цвет текста и иконки из стандартной палитре: `text`, `text-light`, `primary`, `primary-dark`, `primary-darkest`, `red`, `red-dark`, `yellow`, `yellow-dark`, `green`, `green-dark` и др. |
| icon | string \| string[] | undefined | Имя иконки FontAwesome (например, `'check'`, `'triangle-exclamation'`). |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текстовое содержимое, отображаемое рядом с иконкой. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
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
