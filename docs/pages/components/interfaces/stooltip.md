# STooltip

Иконка вопроса со всплывающе/й подсказкой.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Текст подсказки в слоте, так что там можно размещать html-контент и ссылки на расширенную информацию.</li>
        <li>Событийная логика сделана так, что мышку можно перевести с иконки на текст подсказки и кликнуть по ссылке, которая в ней.</li>
    </ol>
</SToggle>

## Базовый пример

<div class="docs-container" style="display:block;">
Показы
<STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Фиксированное положение

По умолчанию положение подсказки выбирается исходя из того, где эта подсказка уместится на экране. Но если нужно указать положение явно, можно использовать атрибут `at`:

<div class="docs-container">
    <div>Подсказка сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Подсказка слева <STooltip at="left">Подсказка слева</STooltip></div>
    <div>Подсказка справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Подсказка снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

## Кастомная иконка

Если нужна другая иконка, то её можно заменить атрибутом icon:

<div class="docs-container">
    <div>Подсказка с другой иконкой <STooltip icon="circle-info">Подсказка с другой иконкой</STooltip></div>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

Если нужна совсем нестандартная иконка/область наведения, то можно использовать слот icon:

<div class="docs-container">
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STooltip from '../../../../packages/startup-ui/src/components/STooltip.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code1 = `Показы <STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
`;
const fullCode1 = `<template>
<p>
Показы <STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
</p>
</template>
<script setup>
import STooltip from 'startup-ui';
<\/script>
`;

const code2 = `<div>Подсказка сверху <STooltip at="top">Подсказка сверху</STooltip></div>
<div>Подсказка справа <STooltip at="right">Подсказка справа</STooltip></div>
<div>Подсказка снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
<div>Подсказка слева <STooltip at="left">Подсказка слева</STooltip></div>
`;
const fullCode2 = `<template>
    <div>Подсказка сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Подсказка справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Подсказка снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
    <div>Подсказка слева <STooltip at="left">Подсказка слева</STooltip></div>
</template>
<script setup>
import { STooltip } from 'startup-ui';
<\/script>
`;

const code3 = `<div>Подсказка с другой иконкой <STooltip icon="circle-info">Подсказка с другой иконкой</STooltip></div>
`;
const fullCode3 = `<template>
<div>Подсказка с другой иконкой <STooltip icon="circle-info">Подсказка с другой иконкой</STooltip></div>
</template>
<script setup>
import { STooltip } from 'startup-ui';
<\/script>
`;

const code4 = `<div>Подсказка с другой иконкой 
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>
`;
const fullCode4 = `<template>
<div>Подсказка с другой иконкой 
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>
</template>
<script setup>
import { STooltip } from 'startup-ui';
<\/script>
`;
</script>
<style lang="scss" scoped>
.s-tooltip {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}
</style>