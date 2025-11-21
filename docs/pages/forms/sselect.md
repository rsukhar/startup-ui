# SSelect

Выпадающий список с вариантами выбора.

## Классический вариант

<div class="docs-container">
    <SSelect v-model="value1" :options="options" />
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SSelect v-model="value" :options="options" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
</script>
```
:::

Где options — это объект вариантов выбора в формате {value: title}.

## Фильтрация при вводе

<div class="docs-container">
    <SSelect v-model="value2" :options="options" filterable />
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SSelect v-model="value" :options="options" filterable />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
</script>
```
:::

## Получение значений по API

Список значений можно получать и по API.

<div class="docs-container">
    <SSelect v-model="value3" :options="options" filterable />
</div>

::: details Показать код
```js
<template>
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
  axios.post(`/select_options/search`, { query: query })
        .then((response) => selectOptions.value = response.data)
        .finally(() => isLoading.value = false);
}
</script>
```
:::

В данном примере API должно возвращать в data-поле массив {value: title} значений.

## Нулевое значение (плейсхолдер)

У выбиралок иногда бывает «не выбранное значение», особенно в фильтрах при заданном наборе вариантов. Для этого удобно использовать синтаксис placeholder:

<div class="docs-container">
    <SSelect v-model="value4" :options="options" placeholder="Не выбран"/>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SSelect v-model="value" :options="options" placeholder="Не выбран"/>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
</script>
```
:::

## Возможность сброса значения

Иногда бывает нужно сделать возможность сбрасывать значение в невыбранное (null). Для этого используется clearable:

<div class="docs-container">
    <SSelect v-model="value6" :options="options" clearable/>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SSelect v-model="user" placeholder="Не выбран" :options="users" clearable/>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
</script>
```
:::

## Виртуальный скролл

Когда доступно очень много вариантов выбора, можно применить виртуальный скролл для более быстрой загрузки:

<div class="docs-container">
    <SSelect v-model="region" :options="regions" virtual />
</div>

::: details Показать код
```js
<template>
    <SSelect v-model="region" :options="regions" virtual />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
</script>
```
:::


<script setup>
import { ref } from 'vue';
import SSelect from '../../../packages/startup-ui/src/components/SSelect.vue';
import { regions } from '../../resources/data/regions.js';

const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);
const value5 = ref(null);
const value6 = ref(null);
const region = ref(null);
</script>
<style lang="scss">
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