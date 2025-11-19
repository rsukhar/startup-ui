# STimeline

Вертикальная черта с точками-пунктами.

## Базовый пример

<div class="docs-container">
    <STimeline :items="items">
        <template #item="{ item }">
            <strong>{{ item.last_visit_diff }} назад</strong> {{ item.username }} остановил переходы
        </template>
    </STimeline>
</div>

::: details Показать код
```js
<template>
    <STimeline :items="items">
        <template #item="{ item }">
            <strong>{{ item.last_visit_diff }} назад</strong> {{ item.username }} остановил переходы
        </template>
    </STimeline>
</template>
<script setup>
import STimeline from 'startup-ui';

const items = [
    {
        last_visit_diff: '2 д. 6 ч',
        username: 'Иванов',
    }, 
    {
        last_visit_diff: '4 д. 2 ч',
        username: 'Петров',
    }, 
    {
        last_visit_diff: '22 д. 1 ч',
        username: 'Сидоров',
    }
];
</script>
``` 
:::

<script setup>
import STimeline from '../../../packages/startup-ui/src/components/STimeline.vue';

const items = [
    {
        last_visit_diff: '2 д. 6 ч',
        username: 'Иванов',
    }, 
    {
        last_visit_diff: '4 д. 2 ч',
        username: 'Петров',
    }, 
    {
        last_visit_diff: '22 д. 1 ч',
        username: 'Сидоров',
    }
];
</script>