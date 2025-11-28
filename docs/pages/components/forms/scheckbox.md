# SCheckbox

Галочки.

## Одиночная галочка

<div class="docs-container">
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Модель будет принимать значение true/false.

## Группа галочек

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

В данном случае моделью будет массив выбранных значений.

Если нужно задать варианты значений из {value: title} объекта (что часто бывает нужно, когда задаем варианты выбора динамически), то более короткий синтаксис для этого будет выглядеть так:

<div class="docs-container">
    <SCheckboxGroup v-model="users" :options="userOptions" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Вертикальный список галочек

Обычно галочки идут в строку, чтобы сделать их вертикальным списком, добавляем атрибут:

<div class="docs-container">
    <SCheckboxGroup v-model="usersSecond" :options="userOptions" vertical/>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Недоступное значение

Добавляем disabled-атрибут значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SCheckboxGroup from '../../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SCheckbox from '../../../../packages/startup-ui/src/components/SCheckbox.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };

const isAccepted = ref('');
const types = ref([]);
const users = ref([]);
const usersSecond = ref([]);

const code1 = `<SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
`;
const fullCode1 = `<template>
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const isAccepted = ref('');
<\/script>
`;

const code2 = `<SCheckboxGroup v-model="types">
    <SCheckbox value="bug">Ошибка</SCheckbox>
    <SCheckbox value="question">Вопрос</SCheckbox>
    <SCheckbox value="idea">Идея</SCheckbox>
</SCheckboxGroup>
`;
const fullCode2 = `<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
<\/script>
`;

const code3 = `<SCheckboxGroup v-model="users" :options="userOptions" />
`;
const fullCode3 = `<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
<\/script>
`;

const code4 = `<SCheckboxGroup v-model="users" :options="userOptions" vertical/>
`;
const fullCode4 = `<template>
    <SCheckboxGroup v-model="users" :options="userOptions" vertical/>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
<\/script>
`;

const code5 = `<SCheckboxGroup v-model="types">
    <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
    <SCheckbox value="question">Вопрос</SCheckbox>
    <SCheckbox value="idea">Идея</SCheckbox>
</SCheckboxGroup>
`;
const fullCode5 = `<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
<\/script>
`;
</script>