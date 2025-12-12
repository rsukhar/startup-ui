# SProgressBar

Полоска прогресса.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Есть лейбл-пояснение, формирующий ожидание пользователей, упрощенный до одного атрибута.</li>
    </ol>
</SToggle>

## Базовый пример

<SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

<script setup>
import { ref } from 'vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
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