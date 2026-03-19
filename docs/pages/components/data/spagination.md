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

<div class="docs-container">
    <SPagination v-bind="users" />
</div>

```vue
<template>
    <!-- Пример: inertia('User/Index', ['users' => Users::paginate()]) -->
    <SPagination v-bind="users" />
</template>

<script setup>
import { SPagination } from 'startup-ui';

const props = defineProps({
    users: Object // Пагинатор Laravel
});
</script>

<style scoped>
.s-pagination {
    margin-bottom: 0;
}
</style>
```

Laravel-пагинатор на выходе формирует объект с ключами `{current_page, from, last_page, links, per_page, to, total}`. SPaginator использует ровно то же именование входных атрибутов, поэтому пробрасываем их как есть через v-bind.

## Выбор кол-ва результатов на странице

Чтобы также выводить выпадающий список в кол-вом результатов на странице, можно добавить атрибут <strong>per-page-options</strong>:

<div class="docs-container">
    <SPagination v-bind="users2" :per-page-options="[15, 25, 50]" />
</div>

<div v-pre>

```vue
<template>
    <SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
</template>

<script setup>
import { SPagination } from 'startup-ui';
</script>

<style scoped>
.s-pagination {
    margin-bottom: 0;
}
</style>
```

</div>

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

<script setup>
import {computed} from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SPagination from '../../../../packages/startup-ui/src/components/SPagination.vue';

const getQueryParams = () => {
    if (typeof window === 'undefined') return {};
    const result = {};
    for (const [name, value] of (new URLSearchParams(window.location.search)).entries()){
        result[name] = value;
    }
    return result;
};

const generatePaginator = (total, page, perpage) => {
    perpage = Math.max(1, perpage ?? 15);
    const lastPage = Math.ceil(total / perpage); 
    const links = [];
    for (let curPage = 1; curPage <= lastPage; curPage++){
        if (curPage === 1) links.push({ has_url: (page > 2), label: "&#8592;", active: false });
        links.push({ "has_url": true, "label": curPage, "active": (page === curPage), url: "?page=" + curPage });
        if (curPage === lastPage) links.push({ "has_url": (page < lastPage), "label": "&#8594;", "active": false });
    }
    return {
        current_page: page,
        first_page_url: "?",
        from: (page - 1) * perpage + 1,
        last_page: lastPage,
        last_page_url: `?page=${lastPage}`,
        links: links,
        next_page_url: (page >= lastPage) ? null : "?page=" + (page + 1),
        path: "?",
        per_page: perpage,
        prev_page_url: (page <= 1) ? null : "?page=" + (page - 1),
        to: Math.min(page * perpage, total),
        total: total
    }
};

const users = computed(() => generatePaginator(72, parseInt(getQueryParams().page ?? 1)));
const users2 = computed(() => generatePaginator(72, parseInt(getQueryParams().page ?? 1), parseInt(getQueryParams().perpage ?? 15)));
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
    .docs-container .s-pagination {
        margin-bottom: 0;
    }
}
</style>