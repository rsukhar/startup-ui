# SSwitch

Включатель-выключатель.

## Базовый пример

<div class="docs-container">
    <SSwitch v-model="checked">Включить</SSwitch>
</div>

::: details Показать код
```js
<template>
    <SSwitch v-model="checked">Включить</SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
</script>
```
:::

## Недоступное состояние

<div class="docs-container">
    <SSwitch v-model="checkedSecond" disabled>Включить</SSwitch>
</div>

::: details Показать код
```js
<template>
    <SSwitch v-model="checked" disabled>Включить</SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
</script>
```
:::

## Кастомные да/нет-значения

Для включенного/отключенного состояния можно задать кастомные значения:

<div class="docs-container">
    <SSwitch v-model="checkedThird" true-value="yes" false-value="no">Включить</SSwitch>
</div>

::: details Показать код
```js
<template>
    <SSwitch v-model="value" true-value="yes" false-value="no">Включить</SSwitch>
</template>
<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const value = ref(false);
</script>
```
:::

<script setup>
import { ref } from 'vue';
import SSwitch from '../../../packages/startup-ui/src/components/SSwitch.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const checked = ref(null);
const checkedSecond = ref(null);
const checkedThird = ref(null);
</script>