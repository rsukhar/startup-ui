# SHorizontalMenu

Горизонтальное меню. Обычно размещается в subheader-блоке.

## Базовый пример

<div class="docs-container">
    <div class="menu-container">
        <SHorizontalMenu :links="menuLinks" />
    </div>
</div>

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SHorizontalMenu :links="menuLinks" />
    </div>
</template>
<script setup>
import { SHorizontalMenu } from 'startup-ui';
</script>
```
:::

Где menuLinks — это массив в формате `[{label, url, active}, ...]`

<script setup>
import SHorizontalMenu from '../../../packages/startup-ui/src/components/SHorizontalMenu.vue';

const menuLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#' }
];
</script>
<style lang="scss">
.menu-container {
    display: flex;
    line-height: 60px;
    background-color: var(--s-bg-gradient-light);
}

a.s-horizontalmenu-label {
    color: var(--s-white) !important;
    text-decoration: none;
}
</style>