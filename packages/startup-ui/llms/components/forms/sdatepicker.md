# SDatePicker

Поле выбора даты.

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

Выбирает значение в формате `YYYY-MM-DD`.

## Минимальное и максимальное значения

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

## Кастомный формат значения

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

Независимо от этого атрибуты min/max всегда идут в своём стандартном формате `YYYY-MM-DD`.

## Выбор периода

Для выбора периода добавляем атрибут `range`:

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

В модель подставляется массив из двух дат в формате, указанном в `value-format`.

## Выбор вариантов кнопками

Очень часто в фильтрах по диапазону дат удобно использовать однокликовый выбор предзаданного диапазона. Набор таких диапазонов мы устанавливаем через атрибут `buttons`.

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

Набор доступных кнопок задается в формате <code>{title: value.join('-')}</code>, например: <code>{"2 недели": "20250901-20250914", "Месяц": "20250815-20250914"}</code>

Именно в этом формате backend-класс DateInterval возвращает набор доступных кнопок: `(new DateInterval(request()->period))->titles`

## Выбор времени

Чтобы выбирать время, добавляем атрибут `with-time`. При этом, выходное значение будет в формате <strong>2025-12-22 12:27</strong>:

```vue
<template>
    <SDatePicker with-time v-model="value" value-format="YYYYMMDD HH:mm" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
</script>
```

Часы и минуты — это `SSelect` с фильтрацией, поэтому значение можно как выбрать мышью, так и набрать с клавиатуры. В локалях с 12-часовым форматом (например `en-US`) вместо часов 0–23 показываются часы 1–12 и переключатель AM/PM.

## Очистка значения

Атрибут `clearable` добавляет кнопку очистки (×), которая появляется, когда значение выбрано:

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

## Компактный инлайн-режим (чипы)

Пропс `compact` убирает жёсткую высоту поля и ужимает его по содержимому — удобно для инлайн-«чипов». `icon-position="start"` ставит иконку слева, `placeholder` задаёт текст пустого поля. Цвет иконки и значения наследуется от `color` инстанса, поэтому «красный флажок дедлайна» получается одним `style="color: …"` — без CSS-оверрайдов:

```vue
<template>
    <div style="display:flex; gap:16px; align-items:center">
        <SDatePicker
            v-model="deadline"
            input-format="DD.MM"
            icon="flag"
            icon-position="start"
            compact
            clearable
            placeholder="дедлайн"
            style="color: var(--s-red)"
        />
        <SDatePicker
            v-model="day"
            :icon="['far', 'calendar']"
            icon-position="start"
            compact
            input-format="DD.MM"
            placeholder="дата"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue'

const deadline = ref(null)
const day = ref('2026-07-12')
</script>
```

## Слот `#trigger` (headless)

Слот `trigger` заменяет поле произвольным элементом: клик по нему открывает календарь у триггера, `v-model` работает как обычно. Полезно для иконок-действий, ссылок, ячеек таблиц. В слот прокидываются `displayValue`, `value`, `isOpen` и методы `open` / `close` / `toggle`.

```vue
<template>
    <SDatePicker v-model="date">
        <template #trigger="{ displayValue, isOpen }">
            <SButton small :outlined="!isOpen">📅 {{ date ? displayValue : 'выбрать дату' }}</SButton>
        </template>
    </SDatePicker>
</template>
<script setup>
import { ref } from 'vue'

const date = ref(null)
</script>
```

<SNote icon="lightbulb" attention>
Календарь телепортируется в <code>&lt;body&gt;</code> как <code>.s-datepicker-calendar</code>. Если у вас есть свои обработчики «клик снаружи» (например, закрытие карточки), они посчитают клик по календарю кликом снаружи. Ориентируйтесь на события <code>open</code> / <code>close</code> или на класс <code>.s-datepicker-calendar</code>, а не на попадание внутрь корня компонента.
</SNote>

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
| placeholder | `string` | `undefined` | Текст пустого поля (приглушённый). Заменяет локализованное «Не выбрано». |
| icon-position | `'start' \| 'end'` | `'end'` | Сторона иконки календаря: `end` — справа, `start` — слева. Цвет иконки наследуется от `color` инстанса. |
| compact | `boolean` | `false` | Компактный инлайн-режим: высота по содержимому, поле не растягивается, ширина инпута — по формату. |

Названия дней недели и месяцев, а также 12/24-часовой формат времени больше не задаются атрибутами per-instance — они берутся из активной локали и переопределяются глобально через параметры локализации (`configureStartupUi`). Подробнее — в разделе [Локализация](/pages/welcome/basics/localization).

Иконки (календарь и стрелки переключения месяца) — встроенные SVG, поэтому FontAwesome для `SDatePicker` не обязателен. Дни соседних месяцев в сетке кликабельны. Поддерживается управление с клавиатуры: в фокусе стрелка вниз открывает календарь, стрелки двигают маркер по датам, Enter фиксирует выбор, Esc закрывает.

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| update:modelValue | `string \| string[] \| null` | Изменение значения (`v-model`). |
| open | — | Календарь открылся. |
| close | — | Календарь закрылся. |

### Слоты (Slots)

| Название | Пропсы слота | Описание |
|----------|--------------|----------|
| trigger | `{ isOpen, value, displayValue, open, close, toggle }` | Заменяет поле произвольным элементом (headless-режим). Клик открывает календарь у триггера. |

<style lang="scss" scoped>
.s-datepicker {
    color: var(--s-text);
}
</style>
