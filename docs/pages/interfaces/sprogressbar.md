# SProgressBar

Полоска прогресса.

## Базовый пример

<SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>

::: details Показать код
```js
<template>
    <SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
</template>
<script setup>
import { ref } from 'vue'; 
import { SProgressBar } from 'startup-ui';

const readyPercentage = ref(50);
</script>
``` 
:::

<script setup>
import { ref } from 'vue'; 
import SProgressBar from '../../../packages/startup-ui/src/components/SProgressbar.vue';

const readyPercentage = ref(50);
</script>
<style lang="scss">
.s-progressbar {
    color: var(--s-text);
}
</style>