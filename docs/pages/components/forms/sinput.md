# SInput

Базовые поля ввода.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Исключает опции, которые, как правило, не используются в стартапах (напр.размеры полей), но из-за которых разные программисты реализовывают компонент по-разному. Без лишних опций унифицируется код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Стандартные поля ввода

<div class="docs-container">
    <SInput v-model="value" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Также поддерживаются стандартные HTML-типы полей:

<div class="docs-container">
    <SInput v-model="value1" type="number" placeholder="Номер" />
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Многострочное поле ввода

<div class="docs-container">
    <SInput v-model="value4" type="textarea" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />


## Плейсхолдер

<div class="docs-container">
    <SInput v-model="value5" placeholder="Введите имя" />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />



## Префикс

<div class="docs-container">
    <SInput v-model="value6" prefix="$" type="number" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />



Если нужен кастомный префикс:

<div class="docs-container">
    <SInput v-model="value7" type="number">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</div>

<CustomCodeBlock :code="{text: code6, lang: 'html'}" :fullCode="{text: fullCode6, lang: 'vue'}" />



## Недоступное состояние

<div class="docs-container">
    <SInput v-model="value8" disabled />
</div>

<CustomCodeBlock :code="{text: code7, lang: 'vue'}" :fullCode="{text: fullCode7, lang: 'vue'}" />



## Поле ввода с кнопкой очистки

Просто используем стандартный HTML5-тип search:

<div class="docs-container">
    <SInput v-model="value9" type="search" />
</div>

<CustomCodeBlock :code="{text: code8, lang: 'vue'}" :fullCode="{text: fullCode8, lang: 'vue'}" />



## События

<div class="docs-container">
    <SInput @change="(newValue) => console.log(newValue)" placeholder="Печатаем и смотрим консоль" />
</div>

<CustomCodeBlock :code="{text: code9, lang: 'vue'}" :fullCode="{text: fullCode9, lang: 'vue'}" />



## Кастомные стили для инпута

Если нужно задать кастомные стили именно для вложенного инпута, то задаем их через input-style:

<div class="docs-container">
    <SInput input-style="text-align: center" />
</div>

<CustomCodeBlock :code="{text: code10, lang: 'vue'}" :fullCode="{text: fullCode10, lang: 'vue'}" />



<script setup>
import { ref } from 'vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import SFormRow from '../../../../packages/startup-ui/src/components/SFormRow.vue';
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const value = ref('');
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const value7 = ref('');
const value8 = ref('');
const value9 = ref('');

const currentInput = ref('');

const code1 = `<SInput v-model="value" />`;
const fullCode1 = `<template>
    <SInput v-model="value" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code2 = `<SInput v-model="value1" type="number" placeholder="Номер"/>
<SInput v-model="value2" type="email" placeholder="Email"/>
<SInput v-model="value3" type="password" placeholder="Пароль"/>`;

const fullCode2 = `<template>
    <SInput v-model="value1" type="number" placeholder="Номер"/>
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
<\/script>`;

const code3 = `<SInput v-model="value" type="textarea" />`;

const fullCode3 = `<template>
    <SInput v-model="value" type="textarea" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code4 = `<SInput v-model="value" placeholder="Введите имя" />`;

const fullCode4 = `<template>
    <SInput v-model="value" placeholder="Введите имя" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code5 = `<SInput v-model="value" prefix="$" type="number" />`;

const fullCode5 = `<template>
    <SInput v-model="value" prefix="$" type="number" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code6 = `<SInput v-model="value" type="number">
    <template #prefix>
        <SStatus icon="star" />
    </template>
</SInput>`;

const fullCode6 = `<template>
    <SInput v-model="value" type="number">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code7 = `<SInput v-model="value" disabled />`;

const fullCode7 = `<template>
    <SInput v-model="value" disabled />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code8 = `<SInput v-model="value" type="search" />`;

const fullCode8 = `<template>
    <SInput v-model="value" type="search" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;

const code9 = `<SInput @change="(newValue) => console.log(newValue)" />`;
const fullCode9 = `<template>
    <SInput @change="(newValue) => console.log(newValue)" />
</template>
<script setup>
import { SInput } from 'startup-ui';
<\/script>`;

const code10 = `<SInput input-style="text-align: center" />`;

const fullCode10 = `<template>
    <SInput input-style="text-align: center" />
</template>
<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
<\/script>`;
</script>
<style lang="scss">
:root {
    h3 {
        margin: 0;
    }
}
</style>