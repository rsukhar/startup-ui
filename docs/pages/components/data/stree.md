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

<div v-pre>

```vue
<template>
    <STree :data="pages" />
</template>

<script setup>
import { STree } from 'startup-ui';

const pages = [
  { id: 1, label: 'Страница 1' }, 
  { id: 2, label: 'Страница 2' }
];
</script>
```

</div>

Где `pages` — это массив вида: `[{id, label, children: [...]}, ...]`

## Выбор элемента

Для возможности выбора элемента добавляем атрибут <strong>selectable</strong>

<div class="docs-container">
    <STree :data="pages" selectable v-model="value" />
</div>

<div v-pre>

```vue
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

</div>

В модель подставляется ID. Текущее значение: <code>{{ value ?? 'null' }}</code>

Также изменения можно отслеживать с помощью change-события:

<div v-pre>

```vue
<STree :data="pages" selectable @change="(node) => console.log(node)" />
```

</div>

## Кастомный шаблон элемента

<div class="docs-container">
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" v-if="node.icon" /> {{ node.label }}
        </template>
    </STree>
</div>

<div v-pre>

```vue
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

const pages = [...];
</script>
```

</div>

## Раскрытые корневые элементы

Набор раскрытых корневых элементов передаём с помощью атрибута <strong>expanded-keys</strong>

<div class="docs-container">
    <STree :data="pages" :expanded-keys="[34]" />
</div>

<div v-pre>

```vue
<STree :data="pages" :expanded-keys="[34]" />
```

</div>

## Перетаскивание элементов

Для поддержки перетаскивания элементов добавляем атрибут <strong>draggable</strong>

<div class="docs-container">
    <STree :data="pages" draggable />
</div>

<div v-pre>

```vue
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

</div>

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

<div v-pre>

```vue
<STree v-model="selectedPageIds" :data="pages" checkboxes />
```

</div>

Если нужно, чтобы при выборе чек-бокса автоматически выбирались чек-боксы вложенных элементов, добавьте атрибут **select-with-children**:

<div class="docs-container">
    <STree v-model="selectedPageIds8" checkboxes :data="pages" select-with-children/>
</div>

<div v-pre>

```vue
<STree v-model="selectedPageIds" :data="pages" checkboxes select-with-children />
```

</div>

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