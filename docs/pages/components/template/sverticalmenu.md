# SVerticalMenu

Боковое меню.

## Базовый пример

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" />
</div>

<CustomCodeBlock :code="{text: code, lang: 'vue'}" :fullCode="{text: fullCode, lang: 'vue'}"/>

Где menuLinks — это массив в формате `[{label, url, active, ?type, ?className, ?children}, ...]`
<script setup>
import SVerticalMenu from '../../../../packages/startup-ui/src/components/SVerticalMenu.vue';
import { menuLinks } from '../../../resources/data/pagesTree.js';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code = `<SVerticalMenu :links="menuLinks" />
`;
const fullCode = `<template>
    <SVerticalMenu :links="menuLinks" />
</template>
<script setup>
import { SVerticalMenu } from 'startup-ui';
<\/script>
`;
</script>