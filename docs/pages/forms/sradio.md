# SRadio

Радио-кнопки.

## Группа радио-кнопок

<div class="docs-container">
    <SRadioGroup v-model="type">
        <SRadio value="bug">Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Модель будет принимать значение выбранного варианта.

Если нужно задать варианты значений из `{value: title}` объекта (что часто бывает нужно, когда задаем варианты выбора динамически), то более короткий синтаксис для этого будет выглядеть так:

<div class="docs-container">
    <SRadioGroup v-model="typeSecond" :options="options" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кнопочный стиль

Чтобы заменить стиль с кружочками на группу кнопок, добавляем атрибут buttons:

<div class="docs-container">
    <SRadioGroup v-model="typeThird" :options="options" buttons/>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Вертикальный список радио-кнопок

Обычно галочки идут в строку, чтобы сделать их вертикальным списком, добавляем атрибут:

<div class="docs-container">
    <SRadioGroup v-model="typeFourth" :options="options" vertical/>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Недоступное значение

Добавляем disabled-атрибут значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SRadioGroup v-model="typeFifth">
        <SRadio value="bug" disabled>Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Нулевое значение (плейсхолдер)

У радио-кнопок иногда бывает «не выбранное значение», особенно в фильтрах при заданном наборе вариантов. Для этого удобно использовать синтаксис placeholder:

<div class="docs-container">
    <SRadioGroup v-model="typeSixth" placeholder="Все" :options="options" />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SRadioGroup from '../../../packages/startup-ui/src/components/SRadioGroup.vue';
import SRadio from '../../../packages/startup-ui/src/components/SRadio.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const type = ref(null);
const typeSecond = ref(null);
const typeThird = ref(null);
const typeFourth = ref(null);
const typeFifth = ref(null);
const typeSixth = ref('');

const code1 = `
<SRadioGroup v-model="type">
    <SRadio value="bug">Ошибка</SRadio>
    <SRadio value="question">Вопрос</SRadio>
    <SRadio value="idea">Идея</SRadio>
</SRadioGroup>
`;
const fullCode1 = `
<template>
    <SRadioGroup v-model="type">
        <SRadio value="bug">Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SRadio, SRadioGroup } from 'startup-ui';

const type = ref(null);
<\/script>
`;

const code2 = `
<SRadioGroup v-model="type" :options="options" />
`;
const fullCode2 = `
<template>
    <SRadioGroup v-model="type" :options="options" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
<\/script>
`;

const code3 = `
<SRadioGroup v-model="type" :options="options" />
`;
const fullCode3 = `
<template>
    <SRadioGroup v-model="type" :options="options" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';


const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
<\/script>
`;

const code4 = `
<SRadioGroup v-model="type" :options="options" vertical />
`;
const fullCode4 = `
<template>
    <SRadioGroup v-model="type" :options="options" vertical />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const type = ref(null);
<\/script>
`;

const code5 = `
<SRadioGroup v-model="type">
    <SRadio value="bug" disabled>Ошибка</SRadio>
    <SRadio value="question">Вопрос</SRadio>
    <SRadio value="idea">Идея</SRadio>
</SRadioGroup>
`;
const fullCode5 = `
<template>
    <SRadioGroup v-model="type">
        <SRadio value="bug" disabled>Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup, SRadio } from 'startup-ui';

const type = ref(null);
<\/script>
`;

const code6 = `
<SRadioGroup v-model="type" placeholder="Все" :options="types" />
`;
const fullCode6 = `
<template>
    <SRadioGroup v-model="type" placeholder="Все" :options="types" />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const types = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
<\/script>
`;
</script>