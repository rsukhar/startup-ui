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

```vue
<template>
    <STree :data="pages" />
</template>
<script setup>
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]
</script>
```

Где `pages` — это массив вида: `[{id, label, children: [...]}, ...]`

## Выбор элемента

Для возможности выбора элемента добавляем атрибут <strong>selectable</strong>

```vue
<template>
    <STree :data="pages" selectable v-model="value" />
    <p>В модель подставляется ID. Текущее значение: <code>{{ value ?? 'null' }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const value = ref(null)
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]
</script>
```

Также изменения можно отслеживать с помощью change-события:

```vue
<template>
    <STree :data="pages" selectable @change="(node) => console.log(node)" />
</template>
<script setup>
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог' },
    { id: 5, label: 'Контакты' },
]
</script>
```

## Кастомный шаблон элемента

```vue
<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" v-if="node.icon" /> {{ node.label }}
        </template>
    </STree>
</template>
<script setup>
const pages = [
    { id: 1, label: 'Главная', icon: 'house' },
    { id: 2, label: 'Каталог', icon: 'folder' },
    { id: 5, label: 'Контакты', icon: 'envelope' },
]
</script>
```

## Раскрытые корневые элементы

Набор раскрытых корневых элементов передаём с помощью атрибута <strong>expanded-keys</strong>

```vue
<template>
    <STree :data="pages" :expanded-keys="[2]" />
</template>
<script setup>
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]
</script>
```

## Перетаскивание элементов

Для поддержки перетаскивания элементов добавляем атрибут <strong>draggable</strong>

```vue
<template>
    <STree :data="pages" draggable @drop="onDrop" />
</template>
<script setup>
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]

function onDrop(targetNode, event, dropType) {
    console.log('Dropped on:', targetNode.label, 'Type:', dropType)
    // Your node-reordering logic on the pages array goes here
}
</script>
```

При этом выполняются события:

<ul>
    <li><strong>dragstart(node, event)</strong> — при начале перетаскивания;</li>
    <li><strong>drop(targetNode, event, dropType)</strong> — при заверешнии перетаскивания.</li>
</ul>

## Чек-боксы

Для поддержки чек-боксов у элементов добавляем атрибут <strong>checkboxes</strong>

```vue
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes />
    <p>Выбрано: <code>{{ selectedPageIds }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const selectedPageIds = ref([])
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]
</script>
```

Если нужно, чтобы при выборе чек-бокса автоматически выбирались чек-боксы вложенных элементов, добавьте атрибут **select-with-children**:

```vue
<template>
    <STree v-model="selectedPageIds" :data="pages" checkboxes select-with-children />
    <p>Выбрано: <code>{{ selectedPageIds }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const selectedPageIds = ref([])
const pages = [
    { id: 1, label: 'Главная' },
    { id: 2, label: 'Каталог', children: [
        { id: 3, label: 'Электроника' },
        { id: 4, label: 'Одежда' },
    ] },
    { id: 5, label: 'Контакты' },
]
</script>
```

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
