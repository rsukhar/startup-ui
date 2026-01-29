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

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Выбирает значение в формате `YYYY-MM-DD`. Текущее значение: <code>{{ value ?? 'null' }}</code>

## Минимальное и максимальное значения

<div class="docs-container">
    <SDatePicker v-model="valueSecond" :min="minDate" :max="maxDate" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кастомный формат значения

<div class="docs-container">
    <SDatePicker v-model="valueThird" value-format="YYYYMMDD" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

Текущее значение: <code>{{ valueThird ?? 'null' }}</code>

Независимо от этого атрибуты min/max всегда идут в своём стандартном формате `YYYY-MM-DD`.

## Выбор периода

Для выбора периода добавляем атрибут <strong>range</strong>:

<div class="docs-container">
    <SDatePicker range v-model="valueFourth" value-format="YYYYMMDD" />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

В модель подставляется массив из двух дат в формате, указанном в <strong>value-format</strong>. Текущее значение: <code>{{ valueFourth ?? 'null' }}</code>

## Выбор вариантов кнопками

Очень часто в фильтрах по диапазону дат удобно использовать однокликовый выбор предзаданного диапазона. Набор таких диапазонов мы устанавливаем через атрибут <strong>buttons</strong>.

<div class="docs-container">
    <SDatePicker range v-model="valueFifth" value-format="YYYYMMDD" :buttons="buttons" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

Набор доступных кнопок задается в формате <code>{title: value.join('-')}</code>, например: <code>{"2 недели": "20250901-20250914", "Месяц": "20250815-20250914"}</code>

Именно в этом формате backend-класс DateInterval возвращает набор доступных кнопок: `(new DateInterval(request()->period))->titles`

## Выбор времени

Чтобы выбирать время, добавляем атрибут <strong>with-time</strong>. При этом, выходное значение будет в формате <strong>2025-12-22 12:27</strong>:  
<div class="docs-container">
    <SDatePicker with-time v-model="valueSixth" value-format="YYYYMMDD HH:mm" />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

Дополнительно в формате можно дописывать <strong>HH:mm</strong> , чтобы там было время:
<CustomCodeBlock :code="{text: code62, lang: 'vue'}" :fullCode="{text: fullCode62, lang: 'vue'}" />


<script setup>
import { ref } from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
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
const valueSixth = ref(null);

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

const code3 = `<SDatePicker v-model="value" value-format="YYYYMMDD" />`;
const fullCode3 = `<template>
    <SDatePicker v-model="value" value-format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>`;

const code4 = `<SDatePicker range v-model="value" value-format="YYYYMMDD" />`;
const fullCode4 = `<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>
`;

const code5 = `<SDatePicker range v-model="value" value-format="YYYYMMDD" :buttons="buttons" />`;
const fullCode5 = `<template>
    <SDatePicker range v-model="value" value-format="YYYYMMDD" :buttons="buttons" />
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

const code6 = `<SDatePicker with-time v-model="value" />`;
const fullCode6 = `<template>
    <SDatePicker with-time v-model="value" />
</template>
<script setup>
import { ref } from 'vue';
import { SDatePicker } from 'startup-ui';

const value = ref(false);
<\/script>`;

const code62 = `<SDatePicker with-time v-model="value" value-format="YYYYMMDD HH:mm" />`;

</script>
<style lang="scss" scoped>
.s-datepicker {
    color: var(--s-text);
}
</style>