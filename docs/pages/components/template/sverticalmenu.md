# SVerticalMenu

Боковое меню.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Может сохранять набор раскрытых элементов в localStorage одним простым атрибутом.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" />
</div>

<CustomCodeBlock :code="{text: code, lang: 'vue'}" :fullCode="{text: fullCode, lang: 'vue'}" />

Где menuLinks — это массив в формате `[{label, url, active, ?type, ?className, ?children}, ...]`

## Раскрытые элементы

Чтобы нужные элементы были раскрыты сразу, мы передаем массив их ID в атрибуте <strong>expanded-keys</strong>:

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Запоминание раскрытых элементов

Во всякого рода документациях 

Когда мы добавляем атрибут <strong>store-expanded-keys-to</strong>, раскрытые элементы сохраняются в localStorage. Теперь, если обновить страницу, раскрытые элементы сохранятся.

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SVerticalMenu from '../../../../packages/startup-ui/src/components/SVerticalMenu.vue';
import { menuLinks } from '../../../resources/data/pagesTree.js';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code = `<SVerticalMenu :links="menuLinks" />`;
const fullCode = `<template>
    <SVerticalMenu :links="menuLinks" />
</template>
<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true }, { "id": 31, "title": "Как подключить вебмастер", "label": "Как подключить вебмастер", "type": "article", "active": false, "url": "/docs/webmaster-integration/", "isPublished": true }, { "id": 32, "title": "Как получать лидов", "label": "Как получать лидов", "type": "article", "active": false, "url": "/docs/get-leads/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true }, { "id": 10, "title": "Кейс №2: Продажа париков, Москва и область", "label": "Кейс №2: Продажа париков", "type": "article", "active": false, "url": "/docs/case2/", "isPublished": true }, { "id": 11, "title": "Кейс №3: Медицинская продукция, вся Россия", "label": "Кейс №3: Медицинская продукция", "type": "article", "active": false, "url": "/docs/case3/", "isPublished": true }, { "id": 29, "title": "Кейс №4: Интернет-магазин на 4512 ключей", "label": "Кейс №4: Интернет-магазин", "type": "article", "active": false, "url": "/docs/case4/", "isPublished": true }, { "id": 33, "title": "Кейс №5: Юридический портал, Москва и область", "label": "Кейс №5: Юридический портал", "type": "article", "active": false, "url": "/docs/case5/", "isPublished": true } ] } ]
<\/script>`;

const code2 = `<SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />`;
const fullCode2 = `<template>
    <SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />
</template>
<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true }, { "id": 31, "title": "Как подключить вебмастер", "label": "Как подключить вебмастер", "type": "article", "active": false, "url": "/docs/webmaster-integration/", "isPublished": true }, { "id": 32, "title": "Как получать лидов", "label": "Как получать лидов", "type": "article", "active": false, "url": "/docs/get-leads/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true }, { "id": 10, "title": "Кейс №2: Продажа париков, Москва и область", "label": "Кейс №2: Продажа париков", "type": "article", "active": false, "url": "/docs/case2/", "isPublished": true }, { "id": 11, "title": "Кейс №3: Медицинская продукция, вся Россия", "label": "Кейс №3: Медицинская продукция", "type": "article", "active": false, "url": "/docs/case3/", "isPublished": true }, { "id": 29, "title": "Кейс №4: Интернет-магазин на 4512 ключей", "label": "Кейс №4: Интернет-магазин", "type": "article", "active": false, "url": "/docs/case4/", "isPublished": true }, { "id": 33, "title": "Кейс №5: Юридический портал, Москва и область", "label": "Кейс №5: Юридический портал", "type": "article", "active": false, "url": "/docs/case5/", "isPublished": true } ] } ]
<\/script>`;

const code3 = `<SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />`;
const fullCode3 = `<template>
    <SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />
</template>
<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true }, { "id": 31, "title": "Как подключить вебмастер", "label": "Как подключить вебмастер", "type": "article", "active": false, "url": "/docs/webmaster-integration/", "isPublished": true }, { "id": 32, "title": "Как получать лидов", "label": "Как получать лидов", "type": "article", "active": false, "url": "/docs/get-leads/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true }, { "id": 10, "title": "Кейс №2: Продажа париков, Москва и область", "label": "Кейс №2: Продажа париков", "type": "article", "active": false, "url": "/docs/case2/", "isPublished": true }, { "id": 11, "title": "Кейс №3: Медицинская продукция, вся Россия", "label": "Кейс №3: Медицинская продукция", "type": "article", "active": false, "url": "/docs/case3/", "isPublished": true }, { "id": 29, "title": "Кейс №4: Интернет-магазин на 4512 ключей", "label": "Кейс №4: Интернет-магазин", "type": "article", "active": false, "url": "/docs/case4/", "isPublished": true }, { "id": 33, "title": "Кейс №5: Юридический портал, Москва и область", "label": "Кейс №5: Юридический портал", "type": "article", "active": false, "url": "/docs/case5/", "isPublished": true } ] } ]
<\/script>`;


</script>

<style lang="scss">
.vp-doc a.s-verticalmenu-label {
    text-decoration: none;
}
</style>