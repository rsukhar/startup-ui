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

::: details Показать код
```js
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
</script>
```
:::

Модель будет принимать значение выбранного варианта.

Если нужно задать варианты значений из `{value: title}` объекта (что часто бывает нужно, когда задаем варианты выбора динамически), то более короткий синтаксис для этого будет выглядеть так:

<div class="docs-container">
    <SRadioGroup v-model="typeSecond" :options="options" />
</div>

::: details Показать код
```js
<template>
    <SRadioGroup v-model="type" :options="options" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
</script>
```
:::

## Кнопочный стиль

Чтобы заменить стиль с кружочками на группу кнопок, добавляем атрибут buttons:

<div class="docs-container">
    <SRadioGroup v-model="typeThird" :options="options" buttons/>
</div>

::: details Показать код
```js
<template>
    <SRadioGroup v-model="type" :options="options" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';


const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
</script>
```
:::

## Вертикальный список радио-кнопок

Обычно галочки идут в строку, чтобы сделать их вертикальным списком, добавляем атрибут:

<div class="docs-container">
    <SRadioGroup v-model="typeFourth" :options="options" vertical/>
</div>

::: details Показать код
```js
<template>
    <SRadioGroup v-model="type" :options="options" vertical />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const type = ref(null);
</script>
```
:::

## Недоступное значение

Добавляем disabled-атрибут значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SRadioGroup v-model="typeFifth">
        <SRadio value="bug" disabled>Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</div>

::: details Показать код
```js
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
</script>
```
:::

## Нулевое значение (плейсхолдер)

У радио-кнопок иногда бывает «не выбранное значение», особенно в фильтрах при заданном наборе вариантов. Для этого удобно использовать синтаксис placeholder:

<div class="docs-container">
    <SRadioGroup v-model="typeSixth" placeholder="Все" :options="options" />
</div>

::: details Показать код
```js
<template>
    <div class="docs-container">
        <SRadioGroup v-model="type" placeholder="Все" :options="types" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const types = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
</script>
```
:::


<script setup>
import { ref } from 'vue';
import SRadioGroup from '../../../packages/startup-ui/src/components/SRadioGroup.vue';
import SRadio from '../../../packages/startup-ui/src/components/SRadio.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const type = ref(null);
const typeSecond = ref(null);
const typeThird = ref(null);
const typeFourth = ref(null);
const typeFifth = ref(null);
const typeSixth = ref(null);

</script>