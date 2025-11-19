# SInput

Базовые поля ввода.

## Стандартные поля ввода

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value" />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

Также поддерживаются стандартные HTML-типы полей:

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value1" type="number" placeholder="Номер"/>
        <SInput v-model="value2" type="email" placeholder="Email"/>
        <SInput v-model="value3" type="password" placeholder="Пароль"/>
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value1" type="number" placeholder="Номер"/>
        <SInput v-model="value2" type="email" placeholder="Email"/>
        <SInput v-model="value3" type="password" placeholder="Пароль"/>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
```
:::

## Многострочное поле ввода

<div class="docs-container">
    <SInput v-model="value4" type="textarea" />
</div>

::: details Показать код
```js
<template>
    <SInput v-model="value" type="textarea" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Плейсхолдер

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value5" placeholder="Введите имя" />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" placeholder="Введите имя" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Префикс

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value6" prefix="$" type="number" />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" prefix="$" type="number" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

Если нужен кастомный префикс:

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value7" type="number">
            <template #prefix>
                <SStatus icon="star" />
            </template>
        </SInput>
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" type="number">
            <template #prefix>
                <SStatus icon="star" />
            </template>
        </SInput>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Недоступное состояние

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value8" disabled />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" disabled />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Поле ввода с кнопкой очистки

Просто используем стандартный HTML5-тип search:

<div class="docs-container">
    <div class="input-container">
        <SInput v-model="value9" type="search" />
    </div>
</div>

::: details Показать код
```js
<template>
    <div class="input-container">
        <SInput v-model="value" type="search" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## События

Изменение значения:

<div class="docs-container">
    <h3>Текущее значение</h3>
    <p>
        {{ currentInput || 'null' }}
    </p>
    <div class="input-container">
        <SInput @change="(newValue) => currentInput = newValue" />
    </div>
</div>

```js
<template>
    <div class="input-container">
        <SInput @change="(newValue) => console.log(newValue)" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
const currentInput = ref('');
</script>
```

## Кастомные стили для инпута

Если нужно задать кастомные стили именно для вложенного инпута, то задаем их через input-style:

<div class="docs-container">
    <div class="input-container">
        <SInput input-style="text-align: center" />
    </div>
</div>

```js
<template>
    <div class="input-container">
        <SInput input-style="text-align: center" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```

<script setup>
import { ref } from 'vue';
import SInput from '../../../packages/startup-ui/src/components/SInput.vue';
import SFormRow from '../../../packages/startup-ui/src/components/SFormRow.vue';
import SStatus from '../../../packages/startup-ui/src/components/SStatus.vue';

const value = ref('');
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const value7 = ref('');
const value8 = ref('');
const value9 = ref('');

const currentInput = ref('');
</script>
<style lang="scss">
:root {
    h3 {
        margin: 0;
    }
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;

}

.s-input-field {
    color: var(--s-text);
}
</style>