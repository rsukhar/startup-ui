# SCheckbox

Галочки.

## Одиночная галочка

<div class="docs-container">
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const isAccepted = ref('');
</script>
```
:::

Модель будет принимать значение true/false.

## Группа галочек

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SCheckboxGroup v-model="types">
            <SCheckbox value="bug">Ошибка</SCheckbox>
            <SCheckbox value="question">Вопрос</SCheckbox>
            <SCheckbox value="idea">Идея</SCheckbox>
        </SCheckboxGroup>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
</script>
```
:::

В данном случае моделью будет массив выбранных значений.

Если нужно задать варианты значений из {value: title} объекта (что часто бывает нужно, когда задаем варианты выбора динамически), то более короткий синтаксис для этого будет выглядеть так:

<div class="docs-container">
    <div class="input-container">
        <SCheckboxGroup v-model="users" :options="userOptions" />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <div class="input-container">
            <SCheckboxGroup v-model="users" :options="userOptions" />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
</script>
```
:::

## Вертикальный список галочек

Обычно галочки идут в строку, чтобы сделать их вертикальным списком, добавляем атрибут:

<div class="docs-container">
    <SCheckboxGroup v-model="usersSecond" :options="userOptions" vertical/>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SCheckboxGroup v-model="users" :options="userOptions" vertical/>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
</script>
```
:::

## Недоступное значение

Добавляем disabled-атрибут значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SCheckboxGroup v-model="types">
            <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
            <SCheckbox value="question">Вопрос</SCheckbox>
            <SCheckbox value="idea">Идея</SCheckbox>
        </SCheckboxGroup>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
</script>
```
:::

<script setup>
import { ref } from 'vue';
import SCheckboxGroup from '../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SCheckbox from '../../../packages/startup-ui/src/components/SCheckbox.vue';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };

const isAccepted = ref('');
const types = ref([]);
const users = ref([]);
const usersSecond = ref([]);
</script>