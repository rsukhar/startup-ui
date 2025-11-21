# SDialog

Диалоговое окно.

## Базовый пример

<div class="docs-container">
<SDialog v-model="isShownFirst" title="Заголовок">
  Какой-то текст.
</SDialog>

<SButton @click="isShownFirst = true">Открыть окно</SButton>
</div>

::: details Показать код
```js
<template>
<SDialog v-model="isShown" title="Заголовок">
  Какой-то текст.
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Фиксированная ширина

<div class="docs-container">
<SDialog v-model="isShownSecond" title="Заголовок" width="500px">
  Какой-то текст.
</SDialog>

<SButton @click="isShownSecond = true">Открыть окно</SButton>
</div>

::: details Показать код
```js
<template>
<SDialog v-model="isShown" title="Заголовок" width="500px">
  Какой-то текст.
</SDialog>
<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Не-модальное окно

По умолчанию окно модальное (нельзя взаимодействовать с другими объектами при открытом окне). Но если нужно отключить модальность, это можно сделать вот так:

<div class="docs-container">
<SDialog v-model="isShownThird" title="Заголовок" not-modal>
  Какой-то текст.
</SDialog>

<SButton @click="isShownThird = true">Открыть окно</SButton>
</div>

::: details Показать код
```js
<template>
<SDialog v-model="isShown" title="Заголовок" not-modal>
  Какой-то текст.
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Не закрывать по клику на оверлей

По умолчанию при клике на оверлей окно закрывается, если надо перехватывать-останавливать событие, то:

<div class="docs-container">
<SDialog v-model="isShownFourth" title="Заголовок" @overlay-click.stop.prevent>
  Какой-то текст.
</SDialog>

<SButton @click="isShownFourth = true">Открыть окно</SButton>
</div>

::: details Показать код
```js
<template>
<SDialog v-model="isShown" title="Заголовок" @overlay-click.stop.prevent>
  Какой-то текст.
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

<script setup>
import { ref } from 'vue';
import SDialog from '../../../packages/startup-ui/src/components/SDialog.vue';
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';

const isShownFirst = ref(false);
const isShownSecond = ref(false);
const isShownThird = ref(false);
const isShownFourth = ref(false);
</script>
<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>