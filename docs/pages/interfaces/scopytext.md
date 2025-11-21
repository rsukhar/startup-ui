# SCopyText

Копируемый текст.

## Базовый пример

<div class="docs-container block">
<SCopyText>Секретный код для копирования</SCopyText>
</div>

::: details Показать код
```js
<template>
    <SCopyText>Секретный код для копирования</SCopyText>
</template>
<script setup>
import { SCopyText } from 'startup-ui';
</script>
``` 
:::

## Внутристрочный пример

<div class="docs-container">
<SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</div>

::: details Показать код
```js
<template>
    <SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</template>
<script setup>
import SCopyText from 'startup-ui';
</script>
``` 
:::

## Копируем не то, что выводим
<div class="docs-container block">
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</div>

::: details Показать код
```js
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>
<script setup>
import SCopyText from 'startup-ui';
</script>
``` 
:::

<script setup>
import { ref } from 'vue'; 
import SCopyText from '../../../packages/startup-ui/src/components/SCopyText.vue';

const readyPercentage = ref(50);
</script>
<style lang="scss">
.block .s-copytext {
    max-width: 450px;
}
</style>