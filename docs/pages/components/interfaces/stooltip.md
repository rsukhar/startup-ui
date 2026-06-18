# STooltip

Иконка вопроса со всплывающе/й подсказкой.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Текст подсказки в слоте, так что там можно размещать HTML-контент и ссылки на расширенную информацию.</li>
        <li>Событийная логика сделана так, что мышку можно перевести с иконки на текст подсказки и кликнуть по ссылке, которая в ней.</li>
    </ol>
</SToggle>

## Базовый пример


:::demo
```vue
<template>
    <p>
        Показы <STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
    </p>
</template>

<script setup>
import { STooltip } from 'startup-ui'
</script>
```
```vue
<p>
    Показы <STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
</p>
```
:::

## Фиксированное положение

По умолчанию положение подсказки выбирается исходя из того, где эта подсказка уместится на экране. Но если нужно указать положение явно, можно использовать атрибут `at`:

:::demo
```vue
<template>
    <div>Сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
    <div>Слева <STooltip at="left">Подсказка слева</STooltip></div>
</template>

<script setup>
import { STooltip } from 'startup-ui'
</script>
```
```vue
<div>Сверху <STooltip at="top">Подсказка сверху</STooltip></div>
<div>Справа <STooltip at="right">Подсказка справа</STooltip></div>
<div>Снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
<div>Слева <STooltip at="left">Подсказка слева</STooltip></div>
```
:::

## Кастомная иконка

Если нужна другая иконка, то её можно заменить атрибутом icon:

:::demo
```vue
<template>
    <div>Подсказка с другой иконкой <STooltip icon="circle-info">Используем иконку circle-info</STooltip></div>
</template>

<script setup>
import { STooltip } from 'startup-ui'
</script>
```
```vue
<div>Подсказка с другой иконкой <STooltip icon="circle-info">Используем иконку circle-info</STooltip></div>
```
:::

Если нужна совсем нестандартная иконка/область наведения, то можно использовать слот icon:

:::demo
```vue
<STooltip>
    <template #icon>❓</template>
    Используем в качестве иконки эмодзи
</STooltip>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| at | `'top'` \| `'bottom'` \| `'right'` \| `'left'` \| `null` | `null` | Принудительно задает положение подсказки. По умолчанию рассчитывается автоматически. |
| icon | string \| string[] | `'circle-question'` | Имя иконки FontAwesome для триггера подсказки. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое внутри пузыря подсказки. Поддерживает HTML. |
| icon | Переопределяет стандартную иконку FontAwesome. Позволяет разместить эмодзи, текст или кастомные элементы. |

<style lang="scss" scoped>
.s-tooltip {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}
</style>
