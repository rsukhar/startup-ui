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
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Сделать дни предыдущего-следующего месяца, которые идут до-после текущего показанного, тоже кликабельными.</li>
        <li>Когда выпадающему списку не хватает места снизу (напр.когда инпут близко к низу экрана), он должен открываться от инпута наверх.</li>
        <li>Отвязать иконки (календарь и стрелочки переключения месяца) от FontAwesome, сделать встроенными SVG. При этом сохранить поддержку font-awesome через атрибут.</li>
        <li>Добавить возможность системной локализации всех выбиралок дат в проекте (не через атрибуты, как сейчас).</li>
        <li>Добавить управление стрелочками с клавиатуры: стрелочки двигают маркер по датам, enter фиксирует выбор.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Стандартный пример

<div class="docs-container">
    <SDatePicker v-model="value" />
</div>

```vue
<template>
    <SDatePicker v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(null);
</script>
```

Выбирает значение в формате `YYYY-MM-DD`. Текущее значение: <code>{{ value ?? 'null' }}</code>

## Минимальное и максимальное значения

<div class="docs-container">
    <SDatePicker v-model="valueSecond" :min="minDate" :max="maxDate" />
</div>

```vue
<template>
    <SDatePicker v-model="value" :min="minDate" :max="maxDate" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const minDate = '2025-01-01'; // Пример
const maxDate = '2025-12-31'; // Пример
const value = ref(null);
</script>
```

## Кастомный формат значения

<div class="docs-container">
    <SDatePicker v-model="valueThird" value-format="YYYYMMDD" />
</div>

```vue
<template>
    <SDatePicker v-model="value" value-format="YYYYMMDD" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(null);
</script>
```

Текущее значение: <code>{{ valueThird ?? 'null' }}</code>

Независимо от этого атрибуты min/max всегда идут в своём стандартном формате `YYYY-MM-DD`.

## Выбор периода

Для выбора периода добавляем атрибут **range**:

<div class="docs-container">
    <SDatePicker range v-model="valueFourth" value-format="YYYYMMDD" />
</div>

```vue
<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref([]);
</script>
```

В модель подставляется массив из двух дат в формате, указанном в **value-format**. Текущее значение: <code>{{ valueFourth ?? 'null' }}</code>

## Выбор вариантов кнопками

Очень часто в фильтрах по диапазону дат удобно использовать однокликовый выбор предзаданного диапазона. Набор таких диапазонов мы устанавливаем через атрибут **buttons**.

<div class="docs-container">
    <SDatePicker range v-model="valueFifth" value-format="YYYYMMDD" :buttons="buttons" />
</div>

```vue
<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" :buttons="buttons" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref([]);
const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};
</script>
```

Набор доступных кнопок задается в формате <code>{title: value.join('-')}</code>, например: <code>{"2 недели": "20250901-20250914", "Месяц": "20250815-20250914"}</code>

Именно в этом формате backend-класс DateInterval возвращает набор доступных кнопок: `(new DateInterval(request()->period))->titles`

## Выбор времени

Чтобы выбирать время, добавляем атрибут **with-time**. При этом, выходное значение будет в формате **2025-12-22 12:27**:

<div class="docs-container">
    <SDatePicker with-time v-model="valueSixth" value-format="YYYYMMDD HH:mm" />
</div>

```vue
<template>
    <SDatePicker with-time v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(null);
</script>
```

Дополнительно в формате можно дописывать **HH:mm**, чтобы там было время:

```vue
<SDatePicker with-time v-model="value" value-format="YYYYMMDD HH:mm" />
```

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
| week-day-names | `string[]` | `['Пн', ..., 'Вс']` | Названия дней недели. |
| month-names | `string[]` | `['Январь', ..., 'Декабрь']` | Названия месяцев. |

<script setup>
import { ref } from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SDatePicker from '../../../../packages/startup-ui/src/components/SDatePicker.vue';

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

let minDate = new Date();
let maxDate = new Date(minDate);
maxDate.setDate(minDate.getDate() + 5);

maxDate = toDateString(maxDate);
minDate = toDateString(minDate);

const value = ref(null);
const valueSecond = ref(null);
const valueThird = ref(null);
const valueFourth = ref(null);
const valueFifth = ref(null);
const valueSixth = ref(null);

const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};
</script>

<style lang="scss" scoped>
.s-datepicker {
    color: var(--s-text);
}
</style>