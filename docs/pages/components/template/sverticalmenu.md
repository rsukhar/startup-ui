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

:::code-group
```vue [Пример]
<template>
    <SVerticalMenu :links="menuLinks" />
</template>
```
```vue [Весь код]
<template>
    <SVerticalMenu :links="menuLinks" />
</template>

<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [
    {
        id: 34,
        title: "Мануал",
        label: "Мануал",
        type: "section",
        children: [
            { id: 6, label: "Быстрый запуск", url: "/docs/quick-start/" },
            { id: 30, label: "Тарифы", url: "/docs/plans/" }
        ]
    },
    {
        id: 8,
        title: "Кейсы",
        label: "Кейсы",
        type: "section",
        children: [
            { id: 9, label: "Кейс №1: Ландшафтный дизайн", url: "/docs/case1/" }
        ]
    }
];
</script>
```
:::

Где menuLinks — это массив в формате `[{label, url, active, ?type, ?className, ?children}, ...]`

## Раскрытые элементы

Чтобы нужные элементы были раскрыты сразу, мы передаем массив их ID в атрибуте <strong>expanded-keys</strong>:

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />
</div>

:::code-group
```vue [Пример]
<template>
    <SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />
</template>
```
```vue [Весь код]
<template>
    <SVerticalMenu :links="menuLinks" :expanded-keys="[34]" />
</template>

<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true }, { "id": 31, "title": "Как подключить вебмастер", "label": "Как подключить вебмастер", "type": "article", "active": false, "url": "/docs/webmaster-integration/", "isPublished": true }, { "id": 32, "title": "Как получать лидов", "label": "Как получать лидов", "type": "article", "active": false, "url": "/docs/get-leads/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true } ] } ]
</script>
```
:::

## Запоминание раскрытых элементов

Во всякого рода документациях

Когда мы добавляем атрибут <strong>store-expanded-keys-to</strong>, раскрытые элементы сохраняются в localStorage. Теперь, если обновить страницу, раскрытые элементы сохранятся.

<div class="docs-container">
    <SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />
</div>

:::code-group
```vue [Пример]
<template>
    <SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />
</template>
```
```vue [Весь код]
<template>
    <SVerticalMenu :links="menuLinks" store-expanded-keys-to="opened-pages" />
</template>

<script setup>
import { SVerticalMenu } from 'startup-ui';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true }, { "id": 31, "title": "Как подключить вебмастер", "label": "Как подключить вебмастер", "type": "article", "active": false, "url": "/docs/webmaster-integration/", "isPublished": true }, { "id": 32, "title": "Как получать лидов", "label": "Как получать лидов", "type": "article", "active": false, "url": "/docs/get-leads/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true } ] } ]
</script>
```
:::

## Интерфейс компонента SVerticalMenu

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| links | `SVerticalMenuLink[]` | `[]` | Массив навигационных ссылок с поддержкой вложенности. |
| expandedKeys | `(string \| number)[]` | `[]` | Массив ID элементов, которые должны быть раскрыты по умолчанию. |
| storeExpandedKeysTo | string | `undefined` | Ключ в localStorage для сохранения состояния раскрытых элементов. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | По умолчанию слоты отсутствуют, меню генерируется автоматически по пропсу `links`. |

## Интерфейс объекта SVerticalMenuLink

| Свойство | Тип | Описание |
|----------|-----|----------|
| id | string \| number | **Обязательное.** Уникальный идентификатор пункта меню (нужен для логики открытия/закрытия). |
| label | string | **Обязательное.** Текст пункта меню. |
| url | string | URL для перехода. Если указан, рендерится как `<Link>` (Inertia). Если нет — используется как папка для дочерних элементов. |
| active | boolean | Если `true`, пункт визуально помечается как активный. |
| type | string | Может быть `'section'` для заголовка раздела (жирнее и с отступами). |
| isPublished | boolean | Если `false`, пункт затеняется и появляется иконка перечеркнутого глаза (чтобы показать, что раздел скрыт на сайте). |
| className | string | Дополнительные CSS классы пункта. |
| children | `SVerticalMenuLink[]` | Вложенный массив дочерних пунктов. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SVerticalMenu from '../../../../packages/startup-ui/src/components/SVerticalMenu.vue';

const menuLinks = [ { "id": 34, "title": "Мануал", "label": "Мануал", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 6, "title": "Быстрый запуск проекта в ПфПульте", "label": "Быстрый запуск", "type": "article", "active": false, "url": "/docs/quick-start/", "isPublished": true }, { "id": 30, "title": "Тарифы ПфПульта", "label": "Тарифы", "type": "article", "active": false, "url": "/docs/plans/", "isPublished": true } ] }, { "id": 8, "title": "Кейсы", "label": "Кейсы", "type": "section", "active": false, "isPublished": true, "children": [ { "id": 9, "title": "Кейс №1: Ландшафтный дизайн, Москва и область", "label": "Кейс №1: Ландшафтный дизайн", "type": "article", "active": false, "url": "/docs/case1/", "isPublished": true } ] } ];
</script>

<style lang="scss">
.vp-doc a.s-verticalmenu-label {
    text-decoration: none;
}
</style>
