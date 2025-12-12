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

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Laravel-пагинатор на выходе формирует объект с ключами `{current_page, from, last_page, links, per_page, to, total}`. SPaginator использует ровно то же именование входных атрибутов, поэтому пробрасываем их как есть через v-bind.

## Выбор кол-ва результатов на странице

Чтобы также выводить выпадающий список в кол-вом результатов на странице, можно добавить атрибут <strong>per-page-options</strong>:

<div class="docs-container">
    <SPagination v-bind="users2" :per-page-options="[15, 25, 50]" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

Изменение кол-ва вариантов на странице меняет query-параметр perpage, сбрасывает query-параметр page и сохраняет все остальные query-параметры нетронутыми.

<script setup>
import {computed} from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SPagination from '../../../../packages/startup-ui/src/components/SPagination.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

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

const code1 = `// inertia('User/Index', ['users' => Users::paginate()])
<SPagination v-bind="users" />`;
const fullCode1 = `<template>
    // inertia('User/Index', ['users' => Users::paginate()])
    <SPagination v-bind="users" />
</template>
<script setup>
import { SPagination } from 'startup-ui';
<\/script>`;

const code2 = `<SPagination v-bind="users" :per-page-options="[15, 25, 50]" />`;
const fullCode2 = `<template>
    <SPagination v-bind="users" :per-page-options="[15, 25, 50]" />
</template>
<script setup>
import { SPagination } from 'startup-ui';
<\/script>`;

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