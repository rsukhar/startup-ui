# SProgressBar

Полоска прогресса.

## Базовый пример

<SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

<script setup>
import { ref } from 'vue'; 
import SProgressBar from '../../../../packages/startup-ui/src/components/SProgressbar.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const readyPercentage = ref(50);

const code1= `<SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
`;
const fullCode1 = `<template>
    <SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
</template>
<script setup>
import { ref } from 'vue'; 
import { SProgressBar } from 'startup-ui';

const readyPercentage = ref(50);
<\/script>
`; 
</script>
<style lang="scss">
.s-progressbar {
    color: var(--s-text);
}
</style>