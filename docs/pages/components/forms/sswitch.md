# SSwitch

Включатель-выключатель.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Сразу идет с кликабельным стандартизированным лейблом в качестве простого атрибута. Это унифицирует код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Базовый пример

<div class="docs-container">
    <SSwitch v-model="checked">Включить</SSwitch>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

## Недоступное состояние

<div class="docs-container">
    <SSwitch v-model="checkedSecond" disabled>Включить</SSwitch>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Кастомные да/нет-значения

Для включенного/отключенного состояния можно задать кастомные значения:

<div class="docs-container">
    <SSwitch v-model="checkedThird" true-value="yes" false-value="no">Значение: {{ checkedThird }}</SSwitch>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SSwitch from '../../../../packages/startup-ui/src/components/SSwitch.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const checked = ref(null);
const checkedSecond = ref(null);
const checkedThird = ref(null);

const code1 = `<SSwitch v-model="checked">Включить</SSwitch>
`;
const fullCode1 = `<template>
    <SSwitch v-model="checked">Включить</SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
<\/script>
`;

const code2 = `<SSwitch v-model="checked" disabled>Включить</SSwitch>
`;
const fullCode2 = `<template>
    <SSwitch v-model="checked" disabled>Включить</SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
<\/script>
`;

const code3 = `<SSwitch v-model="value" true-value="yes" false-value="no">
    Значение: {{ value }}
</SSwitch>`;
const fullCode3 = `<template>
    <SSwitch v-model="value" true-value="yes" false-value="no">
        Значение: {{ value }}
    </SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const value = ref(false);
<\/script>
`;
</script>