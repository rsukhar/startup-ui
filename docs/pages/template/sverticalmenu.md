# SVerticalMenu

Боковое меню.

## Базовый пример

<div class="docs-container">
    <div class="menu-container">
        <SVerticalMenu :links="menuLinks" />
    </div>
</div>

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SVerticalMenu :links="menuLinks" />
    </div>
</template>
<script setup>
import { SVerticalMenu } from 'startup-ui';
</script>
```
:::

Где menuLinks — это массив в формате `[{label, url, active, ?type, ?className, ?children}, ...]`

<script setup>
import SVerticalMenu from '../../../packages/startup-ui/src/components/SVerticalMenu.vue';
import { menuLinks } from '../../resources/data/pagesTree.js'; 
</script>
<style lang="scss" scoped>
.menu-container {
    display: flex;
}
</style>