# SSlider

Ползунок для выбора числового значения из диапазона. Рядом с ползунком отображается текущее значение.

## Базовый пример

:::demo
```vue
<template>
    <SSlider v-model="value" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```
```vue
<SSlider v-model="value" />
```
:::

## Диапазон и шаг

Границы диапазона и шаг задаются свойствами `min`, `max` и `step`:

:::demo
```vue
<template>
    <SSlider v-model="limit" :min="5" :max="50" :step="5" />
</template>
<script setup>
import { ref } from 'vue'
const limit = ref(20)
</script>
```
```vue
<SSlider v-model="limit" :min="5" :max="50" :step="5" />
```
:::

## Единица измерения

Свойство `unit` добавляет суффикс к отображаемому значению:

:::demo
```vue
<template>
    <SSlider v-model="percent" :min="1" :max="50" unit="%" />
</template>
<script setup>
import { ref } from 'vue'
const percent = ref(10)
</script>
```
```vue
<SSlider v-model="percent" :min="1" :max="50" unit="%" />
```
:::

## Кастомное отображение значения

Через слот по умолчанию значение можно отформатировать произвольно. Слот получает текущее значение через параметр `value`:

:::demo
```vue
<template>
    <SSlider v-model="budget" :min="1000" :max="50000" :step="1000">
        <template #default="{ value }">{{ value.toLocaleString('ru-RU') }} ₽</template>
    </SSlider>
</template>
<script setup>
import { ref } from 'vue'
const budget = ref(10000)
</script>
```
```vue
<SSlider v-model="budget" :min="1000" :max="50000" :step="1000">
    <template #default="{ value }">{{ value.toLocaleString('ru-RU') }} ₽</template>
</SSlider>
```
:::

Если значение показывать не нужно, отключите его свойством `:show-value="false"`.

## Недоступное состояние

:::demo
```vue
<template>
    <SSlider v-model="value" disabled />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(30)
</script>
```
```vue
<SSlider v-model="value" disabled />
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `number` | `0` | Текущее значение. |
| min | `number` | `0` | Минимальное значение. |
| max | `number` | `100` | Максимальное значение. |
| step | `number` | `1` | Шаг изменения значения. |
| unit | `string` | `''` | Суффикс к отображаемому значению (например, `%`). |
| show-value | `boolean` | `true` | Показывать ли текущее значение рядом с ползунком. |
| disabled | `boolean` | `false` | Отключает возможность изменения. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Кастомное отображение значения. Получает параметр `value` — текущее значение. |
