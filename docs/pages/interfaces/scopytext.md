# SCopyText

Копируемый текст.

## Базовый пример

<div class="docs-container block">
<SCopyText>Секретный код для копирования</SCopyText>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Внутристрочный пример

<div class="docs-container">
<SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

## Копируем не то, что выводим

<div class="docs-container block">
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

<script setup>
import { ref } from 'vue'; 
import SCopyText from '../../../packages/startup-ui/src/components/SCopyText.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const readyPercentage = ref(50);

const code1 = `
<SCopyText>Секретный код для копирования</SCopyText>
`;
const fullCode1 = `
<template>
    <SCopyText>Секретный код для копирования</SCopyText>
</template>
<script setup>
import { SCopyText } from 'startup-ui';
<\/script>
`;

const code2 = `
<SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
`;
const fullCode2 = `
<template>
    <SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</template>
<script setup>
import SCopyText from 'startup-ui';
<\/script>
`;

const code3 = `
<SCopyText copytext="777">Секретный код: 777</SCopyText>
`;
const fullCode3 = `
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>
<script setup>
import SCopyText from 'startup-ui';
<\/script>
`;
</script>
<style lang="scss">
.block .s-copytext {
    max-width: 450px;
}
</style>