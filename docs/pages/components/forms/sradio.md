# SRadioGroup > SRadio

Радио-кнопки.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Сразу идет с кликабельным стандартизированным лейблом в качестве простого атрибута. Это унифицирует код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
            <li>Сразу из коробки идет кнопочный стиль, который часто используется.</li>
            <li>Поддерживает три формата передачи опций в группы радио-кнопок, что удобно в зависимости от кейса: 
            <ol>
                <li><code>&lt;SRadio /&gt;</code> — там где опции являются частью дизайна, их можно и удобно хардкодить в шаблон;</li>
                <li><code>{value1: title1, value2: title2}</code> — что удобно для быстрого получения из key-value конфигов, а также из моделей — <code>User::pluck('name', 'id')</code>;</li>
                <li><code>[[value1, title1], [value2, title2]]</code> — что удобно для выгрузки там, где важен порядок. Это минимизирует код в контроллерах, помогая сохранять принцип «тонкого контроллера», которого мы придерживаемся.</li>
            </ol>
            </li>
            <li>Взаимозаменяемость формата опций с другими выбиралками из вариантов. Это позволяет легко заменять SRadioGroup на <a href="/pages/components/forms/sselect.html">SSelect</a> или <a href="/pages/components/forms/scheckbox.html">SCheckboxGroup</a>, не трогая бэкенд код.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
        <ol>
            <li>Достилизовать кружочек по цвету под --s-primary.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Группа радио-кнопок

<div class="docs-container">
    <SRadioGroup v-model="type">
        <SRadio value="bug">Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Модель будет принимать значение выбранного варианта: <code>{{ type }}</code>

## Динамический набор значений

В предыдущем примере набор вариантов хардкодился в шаблоне, что удобно, когда набор значений относится к логическому уровню интерфейса. Но когда набор вариантов идет из базы данных или конфига, очень неудобно каждый раз формировать набор элементов через v-for, и вместо этого используем атрибут <strong>options</strong>.

<div class="docs-container">
    <SRadioGroup v-model="typeSecond" :options="options" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Кнопочный стиль

Чтобы заменить стиль с кружочками на группу кнопок, добавляем атрибут <strong>buttons</strong>:

<div class="docs-container">
    <SRadioGroup v-model="typeThird" :options="options" buttons />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Вертикальный список радио-кнопок

Чтобы выводить группу радио-кнопок вертикальным списком, добавляем атрибут <strong>vertical</strong>:

<div class="docs-container">
    <SRadioGroup v-model="typeFourth" :options="options" vertical/>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Недоступное значение

Добавляем disabled-атрибут значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SRadioGroup v-model="typeFifth">
        <SRadio value="bug" disabled>Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Нулевое значение (плейсхолдер)

У радио-кнопок иногда бывает «не выбранное значение», особенно в фильтрах при заданном наборе вариантов. Для этого удобно использовать синтаксис placeholder:

<div class="docs-container">
    <SRadioGroup v-model="typeSixth" placeholder="Все" :options="options" />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SRadioGroup from '../../../../packages/startup-ui/src/components/SRadioGroup.vue';
import SRadio from '../../../../packages/startup-ui/src/components/SRadio.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };

const type = ref('bug');
const typeSecond = ref(null);
const typeThird = ref(null);
const typeFourth = ref(null);
const typeFifth = ref(null);
const typeSixth = ref('');

const code1 = `<SRadioGroup v-model="type">
    <SRadio value="bug">Ошибка</SRadio>
    <SRadio value="question">Вопрос</SRadio>
    <SRadio value="idea">Идея</SRadio>
</SRadioGroup>`;
const fullCode1 = `<template>
    <SRadioGroup v-model="type">
        <SRadio value="bug">Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SRadio, SRadioGroup } from 'startup-ui';

const type = ref(null);
<\/script>`;

const code2 = `<SRadioGroup v-model="type" :options="options" />`;
const fullCode2 = `<template>
    <SRadioGroup v-model="type" :options="options" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
<\/script>`;

const code3 = `<SRadioGroup v-model="type" :options="options" buttons />`;
const fullCode3 = `<template>
    <SRadioGroup v-model="type" :options="options" buttons />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const options = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
<\/script>`;

const code4 = `<SRadioGroup v-model="type" :options="options" vertical />`;
const fullCode4 = `<template>
    <SRadioGroup v-model="type" :options="options" vertical />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const type = ref(null);
<\/script>`;

const code5 = `<SRadioGroup v-model="type">
    <SRadio value="bug" disabled>Ошибка</SRadio>
    <SRadio value="question">Вопрос</SRadio>
    <SRadio value="idea">Идея</SRadio>
</SRadioGroup>`;
const fullCode5 = `<template>
    <SRadioGroup v-model="type">
        <SRadio value="bug" disabled>Ошибка</SRadio>
        <SRadio value="question">Вопрос</SRadio>
        <SRadio value="idea">Идея</SRadio>
    </SRadioGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup, SRadio } from 'startup-ui';

const type = ref(null);
<\/script>`;

const code6 = `<SRadioGroup v-model="type" placeholder="Все" :options="types" />`;
const fullCode6 = `<template>
    <SRadioGroup v-model="type" placeholder="Все" :options="types" />
</template>
<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const types = { 1: 'Ошибка', 2: 'Вопрос', 3: 'Идея' };
const type = ref(null);
<\/script>`;
</script>