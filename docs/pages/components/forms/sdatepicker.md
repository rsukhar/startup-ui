## SDatePicker

Выбиралка даты.

## Стандартный пример

<div class="docs-container">
    <SDatePicker v-model="value" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Выбирает значение в формате `YYYY-MM-DD`
## Минимальное и максимальное значения

<div class="docs-container">
    <SDatePicker v-model="valueSecond" :min="minDate" :max="maxDate" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кастомный формат значения

<div class="docs-container">
    <SDatePicker v-model="valueThird" format="YYYYMMDD" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

При этом format не влияет на min/max поля — они всегда идут в своём стандартном формате.

## Выбор периода

Для выбора периода добавляем атрибут range:

<div class="docs-container">
    <SDatePicker range v-model="valueFourth" format="YYYYMMDD" />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

В данном примере в value будет массив вида `["20250401", "20250430"]`, у которого каждое значение идет в format-значении.

## Выбор вариантов кнопками

Для выбора вариантов кнопками возможно задать настройки этих кнопок в формате, который возвращает Backend-класс `(new DateInterval(request()->period))->titles`, и передать данные:

<div class="docs-container">
    <SDatePicker range v-model="valueFifth" format="YYYYMMDD" :buttons="buttons" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SDatePicker from '../../../../packages/startup-ui/src/components/SDatePicker.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

let minDate = new Date();

// Сегодня + 5 дней
let maxDate = new Date(minDate);
maxDate.setDate(minDate.getDate() + 5);

maxDate = toDateString(maxDate);
minDate = toDateString(minDate);

const value = ref(null);
const valueSecond = ref(null);
const valueThird = ref(null);
const valueFourth = ref(null);
const valueFifth = ref(null);

const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};

const code1 = `<SDatePicker v-model="value" />
`;
const fullCode1 = `<template>
    <SDatePicker v-model="value" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>
`;

const code2 = `<SDatePicker v-model="value" min="${minDate}" max="${maxDate}" />
`;
const fullCode2 = `<template>
    <SDatePicker v-model="value" min="${minDate}" max="${maxDate}" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>
`;

const code3 = `<SDatePicker v-model="value" format="YYYYMMDD" />
`;
const fullCode3 = `<template>
    <SDatePicker v-model="value" format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>
`;

const code4 = `<SDatePicker range v-model="value" format="YYYYMMDD" />
`;
const fullCode4 = `<template>
    <SDatePicker range v-model="value" format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>
`;

const code5 = `<SDatePicker range v-model="value" format="YYYYMMDD" :buttons="buttons" />
`;
const fullCode5 = `<template>
    <SDatePicker range v-model="value" format="YYYYMMDD" :buttons="buttons" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);

const buttons = {
  '2 недели': '20250901-20250914',
  'Месяц': '20250815-20250914',
};
<\/script>
`;

const code6 = ``;
const fullCode6 = ``;

</script>
<style lang="scss">
.s-datepicker {
    color: var(--s-text);
}
</style>