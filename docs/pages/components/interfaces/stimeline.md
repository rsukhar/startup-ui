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

:::code-group
```vue [Пример]
<template>
    <STimeline :items="items">
        <template #item="{ item }">
            <strong>{{ item.last_visit_diff }} назад</strong> {{ item.username }} остановил переходы
        </template>
    </STimeline>
</template>
```
```vue [Весь код]
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

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| items | `Array` | `undefined` | Обязательный массив объектов данных для итерации по таймлайну. |

### Слоты (Slots)

| Название | Привязки | Описание |
|----------|----------|----------|
| item | `{ item: Object, index: number }` | Слот для отображения содержимого рядом с маркером таймлайна для каждого элемента. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STimeline from '../../../../packages/startup-ui/src/components/STimeline.vue';

const items = [
    {
        id: 1,
        last_visit_diff: '2 д. 6 ч',
        username: 'Иванов',
    },
    {
        id: 2,
        last_visit_diff: '4 д. 2 ч',
        username: 'Петров',
    },
    {
        id: 3,
        last_visit_diff: '22 д. 1 ч',
        username: 'Сидоров',
    }
];
</script>
