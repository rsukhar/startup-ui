# SImagePreview

Картинка, которую можно посмотреть более детально в диалоговом окне.

## Базовый пример

Выводим картинку, которая увеличивается при клике.

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../../resources/img/animals.webp" />
    </div>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Кастомное превью

Если первоначально до клика показывается другое изображение (напр.меньшего размера), то используем атрибут preview:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview preview="../../../resources/img/nature.jpg" src="../../../resources/img/animals.webp" />
    </div>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

Если нужно вставить кастомный контент, используем слот “preview”:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../../resources/img/animals.webp">
            <template #preview>
                <img src="../../../resources/img/nature.jpg" />
            </template>
        </SImagePreview>
    </div>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Кастомная иконка увеличения

В icon-атрибуте указываем название иконки:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../../resources/img/animals.webp" icon="magnifying-glass-plus" />
    </div>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

Если нужно вставить кастомный контент, используем слот “icon”:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../../resources/img/animals.webp" icon="magnifying-glass-plus">
            <template #icon>
                🔍
            </template>
        </SImagePreview>
    </div>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'html'}" :fullCode="{text: fullCode5, lang: 'vue'}"/>

<script setup>
import SImagePreview from '../../../../packages/startup-ui/src/components/SImagePreview.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code1 = `<SImagePreview src="../../resources/img/animals.webp" />
`;
const fullCode1 = `<template>
<SImagePreview src="../../resources/img/animals.webp" />
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
`;

const code2 = `<SImagePreview preview="../../resources/img/nature.jpg" src="../../resources/img/animals.webp" />
`;
const fullCode2 = `<template>
<SImagePreview preview="../../resources/img/nature.jpg" src="../../resources/img/animals.webp" />
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
`;

const code3 = `<SImagePreview src="../../resources/img/animals.webp">
    <template #preview>
        <img src="../../resources/img/nature.jpg" />
    </template>
</SImagePreview>
`;
const fullCode3 = `<template>
<SImagePreview src="../../resources/img/animals.webp">
    <template #preview>
        <img src="../../resources/img/nature.jpg" />
    </template>
</SImagePreview>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
`;

const code4 = `<SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus" />
`;
const fullCode4 = `<template>
    <SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus" />
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
`;

const code5 = `<SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus">
    <template #icon>
        🔍
    </template>
</SImagePreview>
`;
const fullCode5 = `<template>
<SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus">
    <template #icon>
        🔍
    </template>
</SImagePreview>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
`;
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>