# SCopyText

Копируемый текст.

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках элементов для Vue3 прямого аналога нет.</SToggle>

## Базовый пример


<div class="docs-container block">
<SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</div>

:::code-group
```vue [Пример]
<template>
    <SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</template>
```
```vue [Весь код]
<template>
    <SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</template>

<script setup>
import { SCopyText } from 'startup-ui';
</script>
```
:::

## Внутристрочный пример


<div class="docs-container" style="display:block;">
<SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</div>

:::code-group
```vue [Пример]
<template>
    <SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</template>
```
```vue [Весь код]
<template>
    <SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</template>

<script setup>
import SCopyText from 'startup-ui';
</script>
```
:::

## Копируем не то, что выводим


<div class="docs-container block">
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</div>

:::code-group
```vue [Пример]
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>
```
```vue [Весь код]
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>

<script setup>
import SCopyText from 'startup-ui';
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| layout | `'input'` \| `'inline'` | `'input'` | Вид компонента. `'input'` — блок с рамкой, `'inline'` — текст с пунктирным подчёркиванием. |
| copytext | string | undefined | Строка, которая будет скопирована в буфер. Если не указана, копируется текст из слота. |
| size | `'small'` \| `'normal'` \| `'large'` | `'normal'` | Размер компонента. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текстовое содержимое, отображаемое пользователю. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SCopyText from '../../../../packages/startup-ui/src/components/SCopyText.vue';
</script>

<style lang="scss">
.block .s-copytext {
    max-width: 450px;
}
</style>
