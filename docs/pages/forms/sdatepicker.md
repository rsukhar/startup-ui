## SDatePicker

Выбиралка даты.

## Стандартный пример

<div class="docs-container">
    <SDatePicker v-model="value" />
</div>

::: details Показать код
```js
<template>
    <SDatePicker v-model="value" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
</script>
```
:::

Выбирает значение в формате `YYYY-MM-DD`

## Минимальное и максимальное значения

```js
<template>
    <SDatePicker v-model="value" min="2025-01-01" max="2025-01-15" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
</script>
```

<div class="docs-container">
    <SDatePicker v-model="valueSecond" min="2025-01-01" max="2025-01-15" />
</div>

## Кастомный формат значения

```js
<template>
    <SDatePicker v-model="value" format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
</script>
```

<div class="docs-container">
    <SDatePicker v-model="valueThird" format="YYYYMMDD" />
</div>

При этом format не влияет на min/max поля — они всегда идут в своём стандартном формате.

## Выбор периода

Для выбора периода добавляем атрибут range:

<div class="docs-container">
    <SDatePicker range v-model="valueFourth" format="YYYYMMDD" />
</div>

::: details Показать код
```js
<template>
    <SDatePicker range v-model="value" format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
</script>
```
:::

В данном примере в value будет массив вида `["20250401", "20250430"]`, у которого каждое значение идет в format-значении.

## Выбор вариантов кнопками

Для выбора вариантов кнопками возможно задать настройки этих кнопок в формате, который возвращает Backend-класс `(new DateInterval(request()->period))->titles`:

```js
const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};
```

И передать данные:

```js
<SDatePicker range v-model="value" format="YYYYMMDD" :buttons="buttons" />
```

<div class="docs-container">
    <SDatePicker range v-model="valueFifth" format="YYYYMMDD" :buttons="buttons" />
</div>


<script setup>
import { ref } from 'vue';
import SDatePicker from '../../../packages/startup-ui/src/components/SDatePicker.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const value = ref(null);
const valueSecond = ref(null);
const valueThird = ref(null);
const valueFourth = ref(null);
const valueFifth = ref(null);

const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};

</script>
<style lang="scss">
.s-datepicker {
    color: var(--s-text);
}
</style>