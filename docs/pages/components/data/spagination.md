# SPagination

Постраничная навигация.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Принимает атрибуты ровно в том формате, в котором его отдает пагинатор Laravel, что позволяет сразу пробросить исходный пагинатор без дополнительных прописываний атрибутов через v-bind.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
        <ol>
            <li>Отвязать от InertiaJS и роутера в чистом виде, сделать это опциональным.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

:::demo
```vue
<template>
    <!-- inertia('User/Index', ['users' => Users::paginate()]) -->
    <SPagination v-bind="users" />
</template>
<script setup>
import { ref } from 'vue'

// Объект в том же виде, в каком его отдаёт пагинатор Laravel
const users = ref({
    current_page: 2,
    from: 16,
    to: 30,
    per_page: 15,
    total: 72,
    links: [
        { url: '?page=1', label: '&#8592;', active: false },
        { url: '?page=1', label: '1', active: false },
        { url: '?page=2', label: '2', active: true },
        { url: '?page=3', label: '3', active: false },
        { url: '?page=4', label: '4', active: false },
        { url: '?page=5', label: '5', active: false },
        { url: '?page=3', label: '&#8594;', active: false },
    ],
})
</script>
```
```vue
<!-- inertia('User/Index', ['users' => Users::paginate()]) -->
<SPagination v-bind="users" />
```
:::

Laravel-пагинатор на выходе формирует объект с ключами `{current_page, from, last_page, links, per_page, to, total}`. SPaginator использует ровно то же именование входных атрибутов, поэтому пробрасываем их как есть через v-bind.

## Выбор кол-ва результатов на странице

Чтобы также выводить выпадающий список в кол-вом результатов на странице, можно добавить атрибут <strong>per-page-options</strong>:

:::demo
```vue
<template>
    <SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
</template>
<script setup>
import { ref } from 'vue'

const users = ref({
    current_page: 2,
    from: 16,
    to: 30,
    per_page: 15,
    total: 72,
    links: [
        { url: '?page=1', label: '&#8592;', active: false },
        { url: '?page=1', label: '1', active: false },
        { url: '?page=2', label: '2', active: true },
        { url: '?page=3', label: '3', active: false },
        { url: '?page=4', label: '4', active: false },
        { url: '?page=5', label: '5', active: false },
        { url: '?page=3', label: '&#8594;', active: false },
    ],
})
</script>
```
```vue
<SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
```
:::

Изменение кол-ва вариантов на странице меняет query-параметр perpage, сбрасывает query-параметр page и сохраняет все остальные query-параметры нетронутыми.

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| links | `PaginationLink[]` | `[]` | Массив ссылок `[{ url, label, active }]`. Обычно генерируется бекэндом Laravel. |
| perPageOptions | `number[] \| string[]` \ `Record` | `undefined` | Опции для выпадающего списка кол-ва элементов на странице (например, `[10, 20, 50]`). |
| url | string | `location.pathname` | Базовый URL, используемый при смене кол-ва элементов на странице. |
| preserveScroll | boolean | `true` | Пробрасывается в `Link` Inertia. Сохраняет позицию скролла. |
| preserveState | boolean | `false` | Пробрасывается в `Link` Inertia. Сохраняет локальный стейт страницы. |
| per_page | number | `undefined` | Выбранное кол-во элементов на странице. |
| from | number | `undefined` | Начальный индекс (для надписи «Показано X-Y из Z»). |
| to | number | `undefined` | Конечный индекс. |
| total | number | `undefined` | Общее количество записей. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | По умолчанию слоты отсутствуют, пагинация генерируется автоматически по пропсам. |

<style lang="scss">
:root {
    .vp-doc ul {
        padding-left: 0;
        margin: 0;
    }

    .vp-doc li + li {
        margin: 0;
    }
    .s-demo-preview .s-pagination {
        margin-bottom: 0;
    }
}
</style>
