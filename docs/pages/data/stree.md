# STree

Дерево элементов.

<div class="docs-container">
    <STree :data="pages" />
</div>

::: details Показать код
``` js
<template>
    <STree :data="pages" />
</template>
<script setup>
import { STree } from 'startup-ui';

const props = defineProps({
    data: Array
});
</script>
```
:::

Где pages — это массив вида: `[{id, label, children: [...]}, ...]`

## Кастомный шаблон элемента

<STree :data="pages">
    <template #node="{ node }">
        <FontAwesomeIcon :icon="node.icon" />
        {{ node.label }}
    </template>
</STree>

::: details Показать код
``` js
<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" />
            {{ node.label }}
        </template>
    </STree>
</template>
<script setup>
import { STree } from 'startup-ui';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    data: Array
});
</script>
```
:::

<script setup>
import { ref } from 'vue'; 
import STree from '../../../packages/startup-ui/src/components/STree.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { pages } from '../../resources/data/pages.js';
</script>
<style lang="scss">
</style>