# SFilterGroup > SFilter

Базовый пример

## Базовый пример

<div class="docs-container">
    <h3>Значение фильтра</h3>
    <pre>{{ filter }}</pre>
    <SFilterGroup v-model="filter">
        <SFilter name="plan">
            <SRadioGroup buttons>
                <SRadio value="">Все</SRadio>
                <SRadio value="base">Базовый</SRadio>
                <SRadio value="premium">Премиум</SRadio>
            </SRadioGroup>
        </SFilter>
        <SFilter name="period">
            <SDatePicker range format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</div>

::: details Показать код
``` js
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="plan">
            <SRadioGroup buttons>
                <SRadio value="">Все</SRadio>
                <SRadio value="base">Базовый</SRadio>
                <SRadio value="premium">Премиум</SRadio>
            </SRadioGroup>
        </SFilter>
        <SFilter name="period">
            <SDatePicker range format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SRadioGroup, SRadio, SDatePicker } from 'startup-ui';
</script>
```
:::

## Привязка к GET-параметрам

Часто бывает удобно привязать модель напрямую к GET-параметрам:
<ul>
<li>1. Взять стартовые значения модели из GET-параметров (без необходимости проброса через контроллер)</li>

<li>2. При изменениях модели автоматически обновлять GET-параметры, сбрасывая page, но оставляя любые другие параметры.</li>
</ul>

В этом случае можно использовать атрибут `bind-to-get` , который включит такое поведение:

``` js
<SFilterGroup bind-to-get>
  ...
</SFilterGroup>
```

## Часто используемые поля

### Горизонтальные радио-кнопки

<div class="docs-container">
    <h3>Значение фильтра</h3>
    <pre>{{ filter2 }}</pre>
    <SFilterGroup v-model="filter2">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</div>

::: details Показать код
``` js
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SRadioGroup } from 'startup-ui';
</script>
```
:::

Placeholder задает «не выбранный вариант» — null-значение.

## Выпадающий список

<div class="docs-container">
    <h3>Значение фильтра</h3>
    <pre>{{ filter3 }}</pre>
    <SFilterGroup v-model="filter3">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
</div>

::: details Показать код
``` js
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SSelect } from 'startup-ui';
</script>
```
:::

## Текстовое поле ввода

<div class="docs-container">
    <h3>Значение фильтра</h3>
    <pre>{{ filter4 }}</pre>
    <SFilterGroup v-model="filter4">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по имени пользователя" />
        </SFilter>
    </SFilterGroup>
</div>

::: details Показать код
``` js
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по имени пользователя" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SInput } from 'startup-ui';
</script>
```
:::

## Выбор периода дат

<div class="docs-container">
    <h3>Значение фильтра</h3>
    <pre>{{ filter5 }}</pre>
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</div>

::: details Показать код
``` js
<template>
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>
<script setup>
import { ref } from 'vue'; 
import { SFilterGroup, SFilter, SDatePicker } from 'startup-ui';
</script>
```
:::

<script setup>
import { ref, computed } from 'vue';
import SFilterGroup from '../../../packages/startup-ui/src/components/SFilterGroup.vue';
import SFilter from '../../../packages/startup-ui/src/components/SFilter.vue';
import SRadioGroup from '../../../packages/startup-ui/src/components/SRadioGroup.vue';
import SRadio from '../../../packages/startup-ui/src/components/SRadio.vue';
import SDatePicker from '../../../packages/startup-ui/src/components/SDatePicker.vue';
import SSelect from '../../../packages/startup-ui/src/components/SSelect.vue';
import SInput from '../../../packages/startup-ui/src/components/SInput.vue';

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

    .vp-doc h3 {
        margin: 0;
    }
}

.s-datepicker {
    color: var(--s-text);
}

ul > li {
    padding-left: 20px;
    list-style: none;
}
</style>