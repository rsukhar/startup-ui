# SHtmlEditor

Визуальный HTML-редактор.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Сразу используем самый удобный TinyMCE. Все остальные редакторы по юзабилити сильно хуже.</li>
            <li>Поддержка ембеддинга видео из сервиса <a href="https://www.kinescope.com/" target="_blank">Kinescope</a>, который в моменте является наиболее удобной заменой блокируемого YouTube</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>В примерах сейчас не применяются внутренние стили: шрифт и другие стилевые моменты отличаются. Нужно применить, и либо чтобы это делалось автомтически, либо явно показать в примерах атрибутами, как это делать в своих проектах.</li>
        <li>Очень много настроек хардкодится, нужно допроработать и вынести в пропсы.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <SHtmlEditor v-model="content1" upload-url="/image/upload" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

## Плейсхолдер

<div class="docs-container">
    <SHtmlEditor v-model="content2" upload-url="/image/upload" placeholder="Введите контент" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SHtmlEditor from '../../../resources/components/SHtmlEditor.client.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const content1 = ref('');
const content2 = ref('');

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