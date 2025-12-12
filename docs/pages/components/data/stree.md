# STree

Дерево элементов.

<SToggle title="Что будет ценно улучшить?">
    <ol>
        <li>Если сейчас перетаскивать элементы, но ничего не делать по drop-событию, то они не перетаскиваются.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container">
    <STree :data="pages" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Где pages — это массив вида: `[{id, label, children: [...]}, ...]`

## Выбор элемента

Для возможности выбора элемента добавляем атрибут <strong>selectable</strong>

<div class="docs-container">
    <STree :data="pages" selectable v-model="value" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'html'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

В модель подставляется ID. Текущее значение: <code>{{ value ?? 'null' }}</code>

Также изменения можно отслеживать с помощью change-события:

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Кастомный шаблон элемента

<div class="docs-container">
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" /> {{ node.label }}
        </template>
    </STree>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'html'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Раскрытые корневые элементы

Набор раскрытых корневых элементов передаём с помощью атрибута <strong>expanded-keys</strong>

<div class="docs-container">
    <STree :data="pages" :expanded-keys="[34]" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'html'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Перетаскивание элементов

Для поддержки перетаскивания элементов добавляем атрибут <strong>draggable</strong>

<div class="docs-container">
    <STree :data="pages" draggable />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'html'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

При этом выполняются события:

<ul>
    <li><strong>dragstart(node, event)</strong> — при начале перетаскивания;</li>
    <li><strong>drop(targetNode, event, dropType)</strong> — при заверешнии перетаскивания.</li>
</ul>

<script setup>
import { ref } from 'vue';
import STree from '../../../../packages/startup-ui/src/components/STree.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { pages } from '../../../resources/data/pages.js';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const value = ref();

const code1 = `<STree :data="pages" />`;
const fullCode1 = `<template>
    <STree :data="pages" />
</template>
<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
<\/script>`;

const code2 = `<STree :data="pages" selectable v-model="value" />`;
const fullCode2 = `<template>
    <STree :data="pages" selectable v-model="value" />
</template>
<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
<\/script>`;

const code3 = `<STree :data="pages" selectable @change="(node) => console.log(node)" />`;
const fullCode3 = `<template>
    <STree :data="pages" selectable @change="(node) => console.log(node)" />
</template>
<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
<\/script>`;

const code4 = `<STree :data="pages">
    <template #node="{ node }">
        <FontAwesomeIcon :icon="node.icon" /> \{{ node.label }}
    </template>
</STree>`;
const fullCode4 = `<template>
    <STree :data="pages">
        <template #node="{ node }">
            <FontAwesomeIcon :icon="node.icon" /> \{{ node.label }}
        </template>
    </STree>
</template>
<script setup>
import { STree } from 'startup-ui';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
<\/script>`;

const code5 = `<STree :data="pages" :expanded-keys="[34]" />`;
const fullCode5 = `<template>
    <STree :data="pages" :expanded-keys="[34]" />
</template>
<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 34, label: 'Страница 1', children: [{id: 7, label: 'Страница 7'}]}, {id: 2, label: 'Страница 2'}];
<\/script>`;

const code6 = `<STree :data="pages" draggable />`;
const fullCode6 = `<template>
    <STree :data="pages" draggable />
</template>
<script setup>
import { STree } from 'startup-ui';

const pages = [{id: 1, label: 'Страница 1'}, {id: 2, label: 'Страница 2'}];
<\/script>`;

</script>
<style lang="scss">
</style>