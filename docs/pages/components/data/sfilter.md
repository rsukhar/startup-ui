# SFilterGroup > SFilter

Фильтры

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В популярных библиотеках компонентов для Vue3 прямого аналога нет. По сравнению с ручной сборкой из других компонентов SFilter позволяет:</p>
        <ol>
            <li>Минимальным синтаксисом собирать функциональные фильтры на страницах. Это обеспечивает одинаковую реализацию разными программистами, избавляет от визуальных отличий, упрощает дальнейшую поддержку и сохраняет взаимозаменяемость между проектами.</li>
            <li>Брать первоначальные значения фильтра напрямую из GET-параметров, а не пробрасывать из контроллера (сохранение «тонких контроллеров»).</li>
            <li>Дебаунсить применение значений одним атрибутом, что всегда нужно для приятного UX ввода текстовых значений.</li>
            <li>Для пустых/незаданных значений фильтров не добавляет GET-параметры, чтобы сохранять консистентность URL.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
        <ol>
            <li>Отвязать от InertiaJS и роутера в чистом виде, сделать это опциональным.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <SFilterGroup v-model="filter">
        <SFilter name="plan">
            <SRadioGroup buttons>
                <SRadio value="">Все тарифы</SRadio>
                <SRadio value="base">Базовый</SRadio>
                <SRadio value="premium">Премиум</SRadio>
            </SRadioGroup>
        </SFilter>
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

Текущее значение: <code>{{ filter }}</code>

## Привязка к GET-параметрам

Часто бывает удобно привязать модель напрямую к GET-параметрам:
<ol>
<li>Взять стартовые значения модели из GET-параметров (без необходимости проброса через контроллер)</li>

<li>При изменениях модели автоматически обновлять GET-параметры, сбрасывая page, но оставляя любые другие параметры.</li>
</ol>

В этом случае можно использовать атрибут `bind-to-query` , который включит такое поведение:

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" />

## Часто используемые поля

### Горизонтальные радио-кнопки

<div class="docs-container">
    <SFilterGroup v-model="filter2">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

Текущее значение: <code>{{ filter2 }}</code>.

Placeholder задает «не выбранный вариант» — null-значение.

## Выпадающий список

<div class="docs-container">
    <SFilterGroup v-model="filter3">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

Текущее значение: <code>{{ filter3 }}</code>

## Текстовое поле ввода

<div class="docs-container">
    <SFilterGroup v-model="filter4">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

Текущее значение: <code>{{ filter4 }}</code>

## Выбор периода дат

<div class="docs-container">
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</div>

<CustomCodeBlock :code="{text: code6, lang: 'js'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

Текущее значение: <code>{{ filter5 }}</code>

<script setup>
import { ref, watch } from 'vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SFilterGroup from '../../../../packages/startup-ui/src/components/SFilterGroup.vue';
import SFilter from '../../../../packages/startup-ui/src/components/SFilter.vue';
import SRadioGroup from '../../../../packages/startup-ui/src/components/SRadioGroup.vue';
import SRadio from '../../../../packages/startup-ui/src/components/SRadio.vue';
import SDatePicker from '../../../../packages/startup-ui/src/components/SDatePicker.vue';
import SSelect from '../../../../packages/startup-ui/src/components/SSelect.vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const roles = {
    customer: 'Пользователь',
    admin: 'Админ',
    editor: 'Редактор'
};

const statusOptions = {
    warning: 'Предупреждение',
    success: 'Удачно',
    error: 'Ошибка'
};

const filter = ref({});
const filter2 = ref({});
const filter3 = ref({});
const filter4 = ref({});
const filter5 = ref({});

watch(
    [filter, filter2, filter3, filter4, filter5],
    (newValues) => {
        newValues.forEach((f) => {
        const notEmpty = Object.values(f).filter(v => v);
        if (notEmpty.length === 0 && Object.keys(f).length > 0) {
            for (const key in f) delete f[key];
        }
        });
    }, { deep: true }
);

const code1 = `<SFilterGroup v-model="filter">
    <SFilter name="plan">
        <SRadioGroup buttons>
            <SRadio value="">Все тарифы</SRadio>
            <SRadio value="base">Базовый</SRadio>
            <SRadio value="premium">Премиум</SRadio>
        </SRadioGroup>
    </SFilter>
    <SFilter name="period">
        <SDatePicker range value-format="YYYYMMDD" />
    </SFilter>
</SFilterGroup>`;
const fullCode1 = `<template>
    <SFilterGroup v-model="filter">
        <SFilter name="plan">
            <SRadioGroup buttons>
                <SRadio value="">Все тарифы</SRadio>
                <SRadio value="base">Базовый</SRadio>
                <SRadio value="premium">Премиум</SRadio>
            </SRadioGroup>
        </SFilter>
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SRadioGroup, SRadio, SDatePicker } from 'startup-ui';
<\/script>`;

const code2 = `<SFilterGroup bind-to-query>
  ...
</SFilterGroup>`;

const code3 = `<SFilterGroup v-model="filter">
    <SFilter name="role">
        <SRadioGroup buttons placeholder="Все" :options="roles" />
    </SFilter>
</SFilterGroup>`;
const fullCode3 = `<template>
    <SFilterGroup v-model="filter">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SRadioGroup } from 'startup-ui';
<\/script>`;

const code4 = `<SFilterGroup v-model="filter">
    <SFilter name="status">
        <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
    </SFilter>
</SFilterGroup>`;
const fullCode4 = `<template>
    <SFilterGroup v-model="filter">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SSelect } from 'startup-ui';
<\/script>`;

const code5 = `<SFilterGroup v-model="filter">
    <SFilter name="q" :debounce="500" style="max-width: 350px">
        <SInput type="search" placeholder="Поиск по никнейму" />
    </SFilter>
</SFilterGroup>`;
const fullCode5 = `<template>
    <SFilterGroup v-model="filter">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SInput } from 'startup-ui';
<\/script>`;

const code6 = `<SFilterGroup v-model="filter5">
    <SFilter name="period">
        <SDatePicker range value-format="YYYYMMDD" />
    </SFilter>
</SFilterGroup>`;

const fullCode6 = `<template>
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SDatePicker } from 'startup-ui';
<\/script>`;

</script>
<style lang="scss" scoped>
.vp-doc ol {
    margin: var(--s-base-margin) !important;
}

.vp-doc li {
    margin-bottom: 10px !important;
}

.s-datepicker {
    color: var(--s-text);
}

.s-filtergroup {
    margin-bottom: 0;
}


</style>