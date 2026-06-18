# SSwitch

Включатель-выключатель.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Сразу идет с кликабельным стандартизированным лейблом в качестве простого атрибута. Это унифицирует код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Базовый пример

:::demo
```vue
<template>
    <SSwitch v-model="checked">Значение: {{ checked }}</SSwitch>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
```
```vue
<SSwitch v-model="checked">Значение: {{ checked }}</SSwitch>
```
:::

Модель принимает значение true/false.

## Недоступное состояние

:::demo
```vue
<template>
    <SSwitch v-model="checked" disabled>Не работает</SSwitch>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
```
```vue
<SSwitch v-model="checked" disabled>Не работает</SSwitch>
```
:::

## Кастомные да/нет-значения

Для включенного/отключенного состояния можно задать кастомные значения:

:::demo
```vue
<template>
    <SSwitch v-model="value" true-value="yes" false-value="no">
        Значение: {{ value }}
    </SSwitch>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('no')
</script>
```
```vue
<SSwitch v-model="value" true-value="yes" false-value="no">
    Значение: {{ value }}
</SSwitch>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `any` | `null` | Состояние переключателя. |
| disabled | `boolean` | `false` | Отключает возможность переключения. |
| true-value | `any` | `true` | Значение для «включенного» состояния. |
| false-value | `any` | `false` | Значение для «выключенного» состояния. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текст лейбла (описания) рядом с переключателем. |
