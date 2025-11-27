# SHtmlEditor

Визуальный HTML-редактор.

## Базовый пример

<div class="docs-container">
    <SHtmlEditor v-model="content" upload-url="/image/upload" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

## Плейсхолдер

<div class="docs-container">
    <SHtmlEditor v-model="content" upload-url="/image/upload" placeholder="Введите контент" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SHtmlEditor from '../../../resources/components/SHtmlEditor.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const content = ref('');

const code1 = `<SHtmlEditor v-model="content" upload-url="/image/upload" />
`;
const fullCode1 = `<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" />
</template>
<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref(false);
<\/script>
`;

const code2 = `<SHtmlEditor v-model="content" upload-url="/image/upload" placeholder="Введите контент" />
`;
const fullCode2 = `<template>
    <SHtmlEditor v-model="content" upload-url="/image/upload" placeholder="Введите контент" />
</template>
<script setup>
import { ref } from 'vue';
import { SHtmlEditor } from 'startup-ui';

const content = ref(false);
<\/script>
`;
</script>