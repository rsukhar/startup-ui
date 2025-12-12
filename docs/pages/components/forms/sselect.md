# SSelect

Выпадающий список с вариантами выбора.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Исключает опции, которые, как правило, не используются в стартапах (флоат лейблы, размеры), но из-за которых разные программисты реализовывают компонент по-разному. Без лишних опций унифицируется код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
            <li>Поддерживает два формата передачи опций, удобных для выгрузки из контроллеров Laravel: 
            <ol>
                <li><code>{value1: title1, value2: title2}</code> — что удобно для быстрого получения из key-value конфигов, а также из моделей — <code>User::pluck('name', 'id')</code>;</li>
                <li><code>[[value1, title1], [value2, title2]]</code> — что удобно для выгрузки там, где важен порядок. Это минимизирует код в контроллерах, помогая сохранять принцип «тонкого контроллера», которого мы придерживаемся.</li>
            </ol>
            </li>
            <li>Взаимозаменяемость формата опций с другими выбиралками из вариантов. Это позволяет легко заменять SSelect на <a href="/pages/components/forms/scheckbox.html">SCheckboxGroup</a> или <a href="/pages/components/forms/sradio.html">SRadioGroup</a>, не трогая бэкенд код.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
        <ol>
            <li>Добавить управление с клавиатуры: стрелка вниз открывает выпадающий список, стрелки позволяют перемещаться по значениям, а enter позволяет его выбрать. Особенно ценно будет сделать в связке с фильтрацией.</li>
            <li>Добавить живой реальный пример для блока «Получение значений по API»</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Классический вариант
<div class="docs-container">
    <SSelect v-model="value1" :options="options" placeholder="Выберите" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Фильтрация при вводе

<div class="docs-container">
    <SSelect v-model="value2" :options="options" filterable placeholder="Выберите" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

## Получение значений по API

Список значений можно получать и по API.

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

В данном примере API должно возвращать в data-поле массив {value: title} значений.

## Возможность сброса значения

Иногда бывает нужно сделать возможность сбрасывать значение в невыбранное (null). Для этого используется атрибут <strong>clearable</strong>:

<div class="docs-container">
    <SSelect v-model="value6" :options="options" clearable placeholder="Не выбрано" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

## Виртуальный скролл

Когда доступно очень много вариантов выбора, можно применить виртуальный скролл для более быстрой загрузки, добавив атрибут <strong>virtual</strong>:

<div class="docs-container">
    <SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

<script setup>
import { ref } from 'vue';
import SSelect from '../../../../packages/startup-ui/src/components/SSelect.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import { regions } from '../../../resources/data/regions.js';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);
const value5 = ref(null);
const value6 = ref(null);
const region = ref(null);

const code1 = `<SSelect v-model="value" :options="options" placeholder="Выберите" />`;
const fullCode1 = `<template>
    <SSelect v-model="value" :options="options" placeholder="Выберите" />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code2 = `<SSelect v-model="value" :options="options" filterable placeholder="Выберите" />`;
const fullCode2 = `<template>
    <SSelect v-model="value" :options="options" filterable placeholder="Выберите" />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const value = ref('');
<\/script>`;

const code3 = `<SSelect v-model="value" :options="selectOptions" filterable @filter="onFilter" />`;
const fullCode3 = `<template>
    <SSelect v-model="value" :options="selectOptions" filterable @filter="onFilter" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
import axios from "axios";

const isLoading = ref(false);
const selectOptions = ref({});
const value = ref('');

function onFilter(query){
  isLoading.value = true;
  axios.post(\`/select_options/search\`, { query: query })
        .then((response) => selectOptions.value = response.data)
        .finally(() => isLoading.value = false);
}
<\/script>`;

const code5 = `<SSelect v-model="user" :options="users" clearable placeholder="Не выбрано" />`;
const fullCode5 = `<template>
    <SSelect v-model="user" :options="users" clearable placeholder="Не выбрано" />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
const options = {1: 'Иванов', 2: 'Петров', 3: 'Сидоров'};
const user = ref('');
<\/script>`;

const code6 = `<SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />`;
const fullCode6 = `<template>
    <SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
</template>
<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

const props = defineProps({
    regions: Object
});

const region = ref('');
<\/script>
`;
</script>
<style lang="scss" scoped>
:root {
    .vp-doc ul {
        padding-left: 0;
        margin: 0;
    }

    .vp-doc li + li {
        margin: 0;
    }
}

.docs-container {
    padding: 20px;
    border: 1px solid #4c4d4f;
    border-radius: 6px;
}

.s-select {
    min-width: 200px;
    height: 40px;
}

.s-input-field {
    color: var(--s-text);
}
</style>