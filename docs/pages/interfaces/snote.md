# SNote

Текстовая заметка.

## Базовый пример

<div class="docs-container">
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## С иконкой и заголовком

<div class="docs-container">
    <SNote icon="circle-info" title="В проекте ещё нет ключевиков" />
    <ol>
        <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
        <li>Сервис оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
    </ol>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

В качестве иконок используются названия иконок font-awesome.

<script setup>
import SNote from '../../../packages/startup-ui/src/components/SNote.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const code1 = `
<SNote>Стандартный стиль (основной цвет)</SNote>
<SNote gray>В сером цвете</SNote>
<SNote attention>Привлечение внимания</SNote>
<SNote success>Успешное действие</SNote>
<SNote error>Описание ошибки</SNote>
`;
const fullCode1 = `
<template>
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</template>
<script setup>
import { SNote } from 'startup-ui';
<\/script>
`;

const code2 = `
<SNote>Стандартный стиль (основной цвет)</SNote>
<SNote gray>В сером цвете</SNote>
<SNote attention>Привлечение внимания</SNote>
<SNote success>Успешное действие</SNote>
<SNote error>Описание ошибки</SNote>
`;
const fullCode2 = `
<template>
<SNote icon="circle-info" title="В проекте ещё нет ключевиков" />
<ol>
    <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
    <li>ПФПульт оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
</ol>
</template>
<script setup>
import SNote from 'startup-ui';
<\/script>
`;

</script>