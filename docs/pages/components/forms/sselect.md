# SSelect

Выпадающий список с вариантами выбора.

## Классический вариант
<div class="docs-container">
    <SSelect v-model="value1" :options="options" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Где options — это объект вариантов выбора в формате {value: title}.

## Фильтрация при вводе

<div class="docs-container">
    <SSelect v-model="value2" :options="options" filterable />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Получение значений по API

Список значений можно получать и по API.

<div class="docs-container">
    <SSelect v-model="value3" :options="options" filterable />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

В данном примере API должно возвращать в data-поле массив {value: title} значений.

## Нулевое значение (плейсхолдер)

У выбиралок иногда бывает «не выбранное значение», особенно в фильтрах при заданном наборе вариантов. Для этого удобно использовать синтаксис placeholder:

<div class="docs-container">
    <SSelect v-model="value4" :options="options" placeholder="Не выбран"/>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Возможность сброса значения

Иногда бывает нужно сделать возможность сбрасывать значение в невыбранное (null). Для этого используется clearable:

<div class="docs-container">
    <SSelect v-model="value6" :options="options" clearable/>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Виртуальный скролл

Когда доступно очень много вариантов выбора, можно применить виртуальный скролл для более быстрой загрузки:

<div class="docs-container">
    <SSelect v-model="region" :options="regions" virtual />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SSelect from '../../../../packages/startup-ui/src/components/SSelect.vue';
import { regions } from '../../../resources/data/regions.js';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);
const value5 = ref(null);
const value6 = ref(null);
const region = ref(null);

const code1 = `<SSelect v-model="value" :options="options" />
`;
const fullCode1 = `<template>
    <div class="docs-container">
        <SSelect v-model="value" :options="options" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code2 = `<SSelect v-model="value" :options="options" filterable />`;
const fullCode2 = `<template>
    <div class="docs-container">
        <SSelect v-model="value" :options="options" filterable />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code3 = `<SSelect v-model="value" :options="selectOptions" filterable @filter="onFilter" />`;
const fullCode3 = `<template>
    <SSelect v-model="value" :options="selectOptions" filterable @filter="onFilter" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
import axios from "axios";

const isLoading = ref(false);
const selectOptions = ref({});

function onFilter(query){
  isLoading.value = true;
  axios.post(\`/select_options/search\`, { query: query })
        .then((response) => selectOptions.value = response.data)
        .finally(() => isLoading.value = false);
}
<\/script>`;

const code4 = `<SSelect v-model="value" :options="options" placeholder="Не выбран"/>`;
const fullCode4 = `<template>
    <SSelect v-model="value" :options="options" placeholder="Не выбран"/>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code5 = `<SSelect v-model="user" placeholder="Не выбран" :options="users" clearable/>`;
const fullCode5 = `<template>
    <SSelect v-model="user" placeholder="Не выбран" :options="users" clearable/>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code6 = `<SSelect v-model="region" :options="regions" virtual />`;
const fullCode6 = `<template>
    <SSelect v-model="region" :options="regions" virtual />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>
`;
</script>
<style lang="scss" scoped>
:root {
    .vp-doc ul {
        padding-left: 0;
        margin: 0;
    }

    .vp-doc li + li {
        margin: 0;
    }
}

.docs-container {
    padding: 20px;
    border: 1px solid #4c4d4f;
    border-radius: 6px;
}

.s-select {
    min-width: 200px;
    height: 40px;
}

.s-input-field {
    color: var(--s-text);
}
</style>