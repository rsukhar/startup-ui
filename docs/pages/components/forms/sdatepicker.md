# SDatePicker

Выбиралка даты.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Сразу поддерживает на уровне атрибута <a href="#выбор-вариантов-кнопками">кнопки с готовыми наборами значений</a>, которые часто нужны в фильтрах по диапазону дат.</li>
            <li>Сразу из коробки по дефолту заточено под русскоязычную локализацию.</li>
            <li>В отличие от западных библиотек — позволяет выбирать диапазон дат, начиная с более поздней даты. Удобно, когда нужно выбрать несколько последних месяцев.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Стандартный пример

:::demo
```vue
<template>
    <SDatePicker v-model="value" />
    <p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(null)
</script>
```
```vue
<SDatePicker v-model="value" />
<p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
```
:::

Выбирает значение в формате `YYYY-MM-DD`.

## Минимальное и максимальное значения

:::demo
```vue
<template>
    <SDatePicker v-model="value" :min="minDate" :max="maxDate" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(null)
const minDate = '2026-06-01'
const maxDate = '2026-06-30'
</script>
```
```vue
<SDatePicker v-model="value" :min="minDate" :max="maxDate" />
```
:::

## Кастомный формат значения

:::demo
```vue
<template>
    <SDatePicker v-model="value" value-format="YYYYMMDD" />
    <p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
</script>
```
```vue
<SDatePicker v-model="value" value-format="YYYYMMDD" />
<p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
```
:::

Независимо от этого атрибуты min/max всегда идут в своём стандартном формате `YYYY-MM-DD`.

## Выбор периода

Для выбора периода добавляем атрибут `range`:

:::demo
```vue
<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" />
    <p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
</script>
```
```vue
<SDatePicker range v-model="value" value-format="YYYYMMDD" />
<p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
```
:::

В модель подставляется массив из двух дат в формате, указанном в `value-format`.

## Выбор вариантов кнопками

Очень часто в фильтрах по диапазону дат удобно использовать однокликовый выбор предзаданного диапазона. Набор таких диапазонов мы устанавливаем через атрибут `buttons`.

:::demo
```vue
<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" :buttons="buttons" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
const buttons = {
    '2 недели': '20250901-20250914',
    'Месяц': '20250815-20250914',
}
</script>
```
```vue
<SDatePicker range v-model="value" value-format="YYYYMMDD" :buttons="buttons" />
```
:::

Набор доступных кнопок задается в формате <code>{title: value.join('-')}</code>, например: <code>{"2 недели": "20250901-20250914", "Месяц": "20250815-20250914"}</code>

Именно в этом формате backend-класс DateInterval возвращает набор доступных кнопок: `(new DateInterval(request()->period))->titles`

## Выбор времени

Чтобы выбирать время, добавляем атрибут `with-time`. При этом, выходное значение будет в формате <strong>2025-12-22 12:27</strong>:

:::demo
```vue
<template>
    <SDatePicker with-time v-model="value" value-format="YYYYMMDD HH:mm" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
</script>
```
```vue
<SDatePicker with-time v-model="value" value-format="YYYYMMDD HH:mm" />
```
:::

Часы и минуты — это `SSelect` с фильтрацией, поэтому значение можно как выбрать мышью, так и набрать с клавиатуры. В локалях с 12-часовым форматом (например `en-US`) вместо часов 0–23 показываются часы 1–12 и переключатель AM/PM.

## Очистка значения

Атрибут `clearable` добавляет кнопку очистки (×), которая появляется, когда значение выбрано:

:::demo
```vue
<template>
    <SDatePicker clearable v-model="value" />
    <p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('2026-06-18')
</script>
```
```vue
<SDatePicker clearable v-model="value" />
<p>Текущее значение: <code>{{ value ?? 'null' }}</code></p>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `string \| string[]` | `null` | Выбранное значение (строка для одиночного выбора, массив для диапазона). |
| range | `boolean` | `false` | Режим выбора периода (диапазона дат). |
| value-format | `string` | `'YYYY-MM-DD'` | Формат значения в модели. Если `with-time` включен, по умолчанию `'YYYY-MM-DD HH:mm'`. |
| input-format | `string` | `'DD.MM.YYYY'` | Формат отображения даты в текстовом поле. |
| min | `string` | `undefined` | Минимально допустимая дата (в формате `YYYY-MM-DD`). |
| max | `string` | `undefined` | Максимально допустимая дата (в формате `YYYY-MM-DD`). |
| number-of-months | `number` | `1 \| 2` | Количество отображаемых месяцев в календаре (по умолчанию 2 для `range`, иначе 1). |
| buttons | `Record<string, string>` | `undefined` | Набор кнопок быстрого выбора диапазона (`{ название: 'date1-date2' }`). |
| with-time | `boolean` | `false` | Позволяет выбирать время (часы и минуты). Только для одиночного выбора. |
| clearable | `boolean` | `false` | Показывает кнопку очистки (×), когда значение выбрано. |
| first-day | `number` | (из локали) | Первый день недели: `0` — воскресенье, `1` — понедельник. |
| icon | `string \| string[]` | `undefined` | Необязательная FontAwesome-иконка календаря (например `['far', 'calendar']`). По умолчанию используется встроенная SVG-иконка — компонент не требует FontAwesome. |

Названия дней недели и месяцев, а также 12/24-часовой формат времени больше не задаются атрибутами per-instance — они берутся из активной локали и переопределяются глобально через параметры локализации (`configureStartupUi`). Подробнее — в разделе [Локализация](/pages/welcome/basics/localization).

Иконки (календарь и стрелки переключения месяца) — встроенные SVG, поэтому FontAwesome для `SDatePicker` не обязателен. Дни соседних месяцев в сетке кликабельны. Поддерживается управление с клавиатуры: в фокусе стрелка вниз открывает календарь, стрелки двигают маркер по датам, Enter фиксирует выбор, Esc закрывает.

<style lang="scss" scoped>
.s-datepicker {
    color: var(--s-text);
}
</style>
