# STimeline

Вертикальная черта с точками-пунктами.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Упрощено до минимально необходимого функционала, что обеспечивает одинаковое написание кода и взаимозаменяемость компонентов дальше.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container">
    <STimeline :items="items">
        <template #item="{ item }">
            <strong>{{ item.last_visit_diff }} назад</strong> {{ item.username }} остановил переходы
        </template>
    </STimeline>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'html'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STimeline from '../../../../packages/startup-ui/src/components/STimeline.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

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

const code1 = `<STimeline :items="items">
    <template #item="{ item }">
        <strong>\{{ item.last_visit_diff }} назад</strong> \{{ item.username }} остановил переходы
    </template>
</STimeline>
`;
const fullCode1 = `<template>
    <STimeline :items="items">
        <template #item="{ item }">
            <strong>\{{ item.last_visit_diff }} назад</strong> \{{ item.username }} остановил переходы
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
<\/script>
`;
</script>