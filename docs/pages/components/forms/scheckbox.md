# SCheckboxGroup > SCheckbox

Одиночная галочка или набор галочек.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Сразу идет с кликабельным стандартизированным лейблом в качестве простого атрибута. Это унифицирует код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
            <li>Поддерживает три формата передачи опций в группы чекбоксов, что удобно в зависимости от кейса: 
            <ol>
                <li><code>&lt;SCheckbox /&gt;</code> — там где опции являются частью дизайна, их можно и удобно хардкодить в шаблон;</li>
                <li><code>{value1: title1, value2: title2}</code> — что удобно для быстрого получения из key-value конфигов, а также из моделей — <code>User::pluck('name', 'id')</code>;</li>
                <li><code>[[value1, title1], [value2, title2]]</code> — что удобно для выгрузки там, где важен порядок. Это минимизирует код в контроллерах, помогая сохранять принцип «тонкого контроллера», которого мы придерживаемся.</li>
            </ol>
            </li>
            <li>Взаимозаменяемость формата опций с другими выбиралками из вариантов. Это позволяет легко заменять SCheckboxGroup на <a href="/pages/components/forms/sselect.html">SSelect</a> или <a href="/pages/components/forms/sradio.html">SRadioGroup</a>, не трогая бэкенд код.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Отвязаться от Font Awesome, добавляя галочку простейшим SVG.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Одиночная галочка

<div class="docs-container">
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Модель принимает значение true/false.

## Группа галочек

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

В данном случае в модели будет храниться массив выбранных значений: <code>{{ types }}</code>

## Динамический набор значений

В предыдущем примере набор вариантов хардкодился в шаблоне, что удобно, когда набор значений относится к логическому уровню интерфейса. Но когда набор вариантов идет из базы данных или конфига, очень неудобно каждый раз формировать набор элементов через v-for, и вместо этого используем атрибут <strong>options</strong>.

<div class="docs-container">
    <SCheckboxGroup v-model="users" :options="userOptions" />
</div>

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Вертикальный список галочек

Чтобы выводить группу галочек вертикальным списком, добавляем атрибут <strong>vertical</strong>:

<div class="docs-container">
    <SCheckboxGroup v-model="usersSecond" :options="userOptions" vertical />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

## Недоступное значение

Добавляем атрибут <strong>disabled</strong> значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SCheckboxGroup from '../../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SCheckbox from '../../../../packages/startup-ui/src/components/SCheckbox.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };

const isAccepted = ref('');
const types = ref([]);
const users = ref([]);
const usersSecond = ref([]);

const code1 = `<SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
`;
const fullCode1 = `<template>
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const isAccepted = ref('');
<\/script>
`;

const code2 = `<SCheckboxGroup v-model="types">
    <SCheckbox value="bug">Ошибка</SCheckbox>
    <SCheckbox value="question">Вопрос</SCheckbox>
    <SCheckbox value="idea">Идея</SCheckbox>
</SCheckboxGroup>
`;
const fullCode2 = `<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
<\/script>
`;

const code3 = `<SCheckboxGroup v-model="users" :options="userOptions" />
`;
const fullCode3 = `<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
<\/script>
`;

const code4 = `<SCheckboxGroup v-model="users" :options="userOptions" vertical />
`;
const fullCode4 = `<template>
    <SCheckboxGroup v-model="users" :options="userOptions" vertical />
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
<\/script>
`;

const code5 = `<SCheckboxGroup v-model="types">
    <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
    <SCheckbox value="question">Вопрос</SCheckbox>
    <SCheckbox value="idea">Идея</SCheckbox>
</SCheckboxGroup>
`;
const fullCode5 = `<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
<script setup>
import { ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'startup-ui';

const types = ref([]);
<\/script>
`;
</script>