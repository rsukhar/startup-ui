# STree

Дерево элементов.

<div class="docs-container">
    <STree :data="pages" />
</div>


<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Где pages — это массив вида: `[{id, label, children: [...]}, ...]`

## Кастомный шаблон элемента

<div class="docs-container">
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" />
            {{ node.label }}
        </template>
    </STree>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'html'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

<script setup>
import { ref } from 'vue'; 
import STree from '../../../packages/startup-ui/src/components/STree.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { pages } from '../../resources/data/pages.js';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const code1 = `
<STree :data="pages" />
`;
const fullCode1 = `
<template>
    <STree :data="pages" />
</template>
<script setup>
import { STree } from 'startup-ui';

const props = defineProps({
    data: Array
});
<\/script>
`;

const code2 = `
<STree :data="pages">
    <template #node="{ node }">
        <FontAwesomeIcon :icon="node.icon" />
        \{{ node.label }}
    </template>
</STree>
`;
const fullCode2 = `
<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" />
            \{{ node.label }}
        </template>
    </STree>
</template>
<script setup>
import { STree } from 'startup-ui';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    data: Array
});
<\/script>
`;
</script>
<style lang="scss">
</style>