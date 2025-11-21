# SPagination

Постраничная навигация.

## Базовый пример

Laravel-пагинатор на выходе формирует объект с ключами `{current_page, from, last_page, links, per_page, to, total}`. SPaginator использует ровно то же именование входных пропсов, поэтому делаем просто вот так:

<div class="docs-container">
    <SPagination v-bind="users" />
</div>

::: details Показать код
``` js
<template>
    <div class="docs-container">
        <SPagination v-bind="users" />
    </div>
</template>
<script setup>
import { SPagination } from 'startup-ui';
</script>
```
:::

## Выбор кол-ва результатов на странице

Если задано perpage-options, то выводится выпадающий список с кол-вом результатов на странице:

<div>
    <SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
</div>

::: details Показать код
``` js
<template>
    <div class="docs-container">
        <SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
    </div>
</template>
<script setup>
import { SPagination } from 'startup-ui';
</script>
```
:::

Изменение кол-ва вариантов на странице меняет get-параметр perpage, сбрасывает get-параметр page и сохраняет все остальные get-параметры нетронутыми.

<script setup>
import { ref } from 'vue'; 
import SPagination from '../../resources/components/SPagination.vue';

const users = { 
    "current_page": 1, 
    "first_page_url": "/pages/data/spagination.html?page=1", 
    "from": 1, 
    "last_page": 5, 
    "last_page_url": "/pages/data/spagination.html?page=2", 
    "links": [ 
        { "has_url": false, "label": "&#8592;", "active": false }, 
        { "has_url": true, "label": "1", "active": true }, 
        { "has_url": true, "label": "2", "active": false }, 
        { "has_url": true, "label": "3", "active": false }, 
        { "has_url": true, "label": "4", "active": false }, 
        { "has_url": true, "label": "5", "active": false }, 
        { "has_url": true, "label": "&#8594;", "active": false } 
    ], 
    "next_page_url": "http://localhost/users?page=2", 
    "path": "http://localhost/users", 
    "per_page": 15, 
    "prev_page_url": null, 
    "to": 15, 
    "total": 72
};
</script>
<style lang="scss">
:root {
    .vp-doc ul {
        padding-left: 0;
        margin: 0;
    }

    .vp-doc li + li {
        margin: 0;
    }
}

.docs-container {
    padding: 20px;
    border: 1px solid #4c4d4f;
    border-radius: 6px;
}


</style>