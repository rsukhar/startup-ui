# SDialog

Диалоговое окно.

## Базовый пример

<div class="docs-container">
<SDialog v-model="isShownFirst" title="Заголовок">
  Какой-то текст.
</SDialog>

<SButton @click="isShownFirst = true">Открыть окно</SButton>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Фиксированная ширина

<div class="docs-container">
<SDialog v-model="isShownSecond" title="Заголовок" width="500px">
  Какой-то текст.
</SDialog>

<SButton @click="isShownSecond = true">Открыть окно</SButton>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

## Не-модальное окно

По умолчанию окно модальное (нельзя взаимодействовать с другими объектами при открытом окне). Но если нужно отключить модальность, это можно сделать вот так:

<div class="docs-container">
<SDialog v-model="isShownThird" title="Заголовок" not-modal>
  Какой-то текст.
</SDialog>

<SButton @click="isShownThird = true">Открыть окно</SButton>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Не закрывать по клику на оверлей

По умолчанию при клике на оверлей окно закрывается, если надо перехватывать-останавливать событие, то:

<div class="docs-container">
<SDialog v-model="isShownFourth" title="Заголовок" @overlay-click.stop.prevent>
  Какой-то текст.
</SDialog>

<SButton @click="isShownFourth = true">Открыть окно</SButton>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

<script setup>
import { ref } from 'vue';
import SDialog from '../../../../packages/startup-ui/src/components/SDialog.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const isShownFirst = ref(false);
const isShownSecond = ref(false);
const isShownThird = ref(false);
const isShownFourth = ref(false);

const code1 = `<SDialog v-model="isShown" title="Заголовок">
    ...
</SDialog>
`;
const fullCode1 = `<template>
<SDialog v-model="isShown" title="Заголовок">
    ...
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
<\/script>
`;

const code2 = `<SDialog v-model="isShown" title="Заголовок" width="500px">
    ...
</SDialog>
`;
const fullCode2 = `<template>
<SDialog v-model="isShown" title="Заголовок" width="500px">
    ...
</SDialog>
<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
<\/script>
`;

const code3 = `<SDialog v-model="isShown" title="Заголовок" not-modal>
    ...
</SDialog>
`;
const fullCode3 = `<template>
<SDialog v-model="isShown" title="Заголовок" not-modal>
    ...
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
<\/script>
`;

const code4 = `<SDialog v-model="isShown" title="Заголовок" @overlay-click.stop.prevent>
    ...
</SDialog>
`;
const fullCode4 = `<template>
<SDialog v-model="isShown" title="Заголовок" @overlay-click.stop.prevent>
    ...
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
<\/script>
`;
</script>
<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>