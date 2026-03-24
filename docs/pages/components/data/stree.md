# STree

Дерево элементов.

<SToggleGroup>
    <SToggle title="Что будет ценно улучшить?">
        <ol>
            <li>Если сейчас перетаскивать элементы, но ничего не делать по drop-событию, то они не перетаскиваются.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <STree :data="pages" />
</div>

:::code-group
```vue [Пример]
<template>
    <STree :data="pages" />
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages" />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
</script>
```
:::

Где `pages` — это массив вида: `[{id, label, children: [...]}, ...]`

## Выбор элемента

Для возможности выбора элемента добавляем атрибут <strong>selectable</strong>

<div class="docs-container">
    <STree :data="pages" selectable v-model="value" />
</div>

:::code-group
```vue [Пример]
<template>
    <STree :data="pages" selectable v-model="value" />
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages" selectable v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
import { STree } from 'startup-ui';

const value = ref(null);
const pages = [...];
</script>
```
:::

В модель подставляется ID. Текущее значение: <code>{{ value ?? 'null' }}</code>

Также изменения можно отслеживать с помощью change-события:

:::code-group
```vue [Пример]
<template>
    <STree :data="pages" selectable @change="(node) => console.log(node)" />
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages" selectable @change="(node) => console.log(node)" />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
</script>
```
:::

## Кастомный шаблон элемента

<div class="docs-container">
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" v-if="node.icon" /> {{ node.label }}
        </template>
    </STree>
</div>

:::code-group
```vue [Пример]
<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" /> {{ node.label }}
        </template>
    </STree>
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" /> {{ node.label }}
        </template>
    </STree>
</template>

<script setup>
import { STree } from 'startup-ui';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
</script>
```
:::

## Раскрытые корневые элементы

Набор раскрытых корневых элементов передаём с помощью атрибута <strong>expanded-keys</strong>

<div class="docs-container">
    <STree :data="pages" :expanded-keys="[34]" />
</div>

:::code-group
```vue [Пример]
<template>
    <STree :data="pages" :expanded-keys="[34]" />
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages" :expanded-keys="[34]" />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 34, label: 'Страница 1', children: [{id: 7, label: 'Страница 7'}]}, {id: 2, label: 'Страница 2'}];
</script>
```
:::

## Перетаскивание элементов

Для поддержки перетаскивания элементов добавляем атрибут <strong>draggable</strong>

<div class="docs-container">
    <STree :data="pages" draggable />
</div>

:::code-group
```vue [Пример]
<template>
    <STree :data="pages" draggable @drop="onDrop" />
</template>
```
```vue [Весь код]
<template>
    <STree :data="pages" draggable @drop="onDrop" />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [...];

function onDrop(targetNode, event, dropType) {
    console.log('Dropped on:', targetNode.label, 'Type:', dropType);
    // Здесь должна быть ваша логика перемещения элемента в массиве pages
}
</script>
```
:::

При этом выполняются события:

<ul>
    <li><strong>dragstart(node, event)</strong> — при начале перетаскивания;</li>
    <li><strong>drop(targetNode, event, dropType)</strong> — при заверешнии перетаскивания.</li>
</ul>

## Чек-боксы

Для поддержки чек-боксов у элементов добавляем атрибут <strong>checkboxes</strong>

<div class="docs-container">
    <STree v-model="selectedPageIds7" checkboxes :data="pages" />
</div>

:::code-group
```vue [Пример]
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes />
</template>
```
```vue [Весь код]
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}, ...];
const selectedPageIds = ref([]);
</script>
```
:::

Если нужно, чтобы при выборе чек-бокса автоматически выбирались чек-боксы вложенных элементов, добавьте атрибут **select-with-children**:

<div class="docs-container">
    <STree v-model="selectedPageIds8" checkboxes :data="pages" select-with-children/>
</div>

:::code-group
```vue [Пример]
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes select-with-children />
</template>
```
```vue [Весь код]
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes select-with-children />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}, ...];
const selectedPageIds = ref([]);
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| data | `STreeNode[]` | - | Массив данных дерева. |
| expandedKeys | `(string \| number)[]` | `[]` | Список ID раскрытых узлов. |
| draggable | boolean | `false` | Разрешить перетаскивание узлов. |
| selectable | boolean | `false` | Разрешить выбор одного узла (через клик). |
| checkboxes | boolean | `false` | Отображать чекбоксы для множественного выбора. |
| selectWithChildren | boolean | `false` | При выборе родителя выбирать всех его детей. |
| storeExpandedKeysTo | string | - | Ключ в `localStorage` для сохранения состояния раскрытых узлов. |
| bordered | boolean | `false` | Добавить границы вокруг ячеек. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| dragstart | `(node: STreeNode, event: DragEvent)` | Вызывается при начале перетаскивания узла. |
| drop | `(targetNode: STreeNode, event: DragEvent, dropType: string \| undefined)` | Вызывается при завершении перетаскивания. |
| change | `(node: STreeNode)` | Вызывается при смене выбранного узла (если `selectable`). |

### Слоты (Slots)

| Название | Параметры | Описание |
|----------|-----------|----------|
| node | `{ node: STreeNode }` | Кастомный шаблон для содержимого узла дерева. |

<script setup>
import { ref } from 'vue';
import STree from '../../../../packages/startup-ui/src/components/STree.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SNote from '../../../../packages/startup-ui/src/components/SNote.vue';
import { pages } from '../../../resources/data/pages.js';

const value = ref();
const selectedPageIds7 = ref([]);
const selectedPageIds8 = ref([]);
</script>
