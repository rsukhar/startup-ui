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

:::code-group
```vue [Пример]
<template>
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
```
```vue [Весь код]
<template>
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

const filter = ref({});
</script>
```
:::

Текущее значение: <code>{{ filter }}</code>

## Привязка к GET-параметрам

Часто бывает удобно привязать модель напрямую к GET-параметрам:
<ol>
<li>Взять стартовые значения модели из GET-параметров (без необходимости проброса через контроллер)</li>

<li>При изменениях модели автоматически обновлять GET-параметры, сбрасывая page, но оставляя любые другие параметры.</li>
</ol>

В этом случае можно использовать атрибут `bind-to-query` , который включит такое поведение:

```vue
<SFilterGroup bind-to-query>
  <!-- ... -->
</SFilterGroup>
```

## Часто используемые поля

### Горизонтальные радио-кнопки

<div class="docs-container">
    <SFilterGroup v-model="filter2">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</div>

:::code-group
```vue [Пример]
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
</template>
```
```vue [Весь код]
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

const filter = ref({});
const roles = { customer: 'Пользователь', admin: 'Админ', editor: 'Редактор' };
</script>
```
:::

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

:::code-group
```vue [Пример]
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
</template>
```
```vue [Весь код]
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

const filter = ref({});
const statusOptions = { warning: 'Предупреждение', success: 'Удачно', error: 'Ошибка' };
</script>
```
:::

Текущее значение: <code>{{ filter3 }}</code>

## Текстовое поле ввода

<div class="docs-container">
    <SFilterGroup v-model="filter4">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
</div>

:::code-group
```vue [Пример]
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
</template>
```
```vue [Весь код]
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
</template>

<script setup>
import { ref } from 'vue';
import { SFilterGroup, SFilter, SInput } from 'startup-ui';

const filter = ref({});
</script>
```
:::

Текущее значение: <code>{{ filter4 }}</code>

## Выбор периода дат

<div class="docs-container">
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</div>

:::code-group
```vue [Пример]
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>
```
```vue [Весь код]
<template>
    <SFilterGroup v-model="filter5">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
</template>

<script setup>
import { ref } from 'vue';
import { SFilterGroup, SFilter, SDatePicker } from 'startup-ui';

const filter = ref({});
</script>
```
:::

Текущее значение: <code>{{ filter5 }}</code>

## Интерфейс компонента SFilterGroup

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `Object` | `{}` | Объект, хранящий состояние всех вложенных `SFilter`. |
| bindToQuery | boolean | `false` | Автоматически синхронизирует состояние с GET-параметрами (через Inertia). |
| ignoreQueryNames | `string[]` | `['page']` | GET-параметры, которые игнорируются при сбросе фильтров. |
| ignoreQueryValues | `any[]` | `['', null, undefined, false]` | Значения, при которых параметр удаляется из URL (чтобы не мусорить пустой строкой). |
| title | string | - | Заголовок группы фильтров. |
| loading | boolean | `false` | Состояние загрузки (скелетон или спиннер). |
| showAll | boolean | `false` | Если `true`, кнопка «Показать все» заменяется на «Скрыть». |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое группы (обычно компоненты `SFilter`). |

## Интерфейс компонента SFilter

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| name | string | `undefined` | **Обязательное.** Ключ для хранения значения в `v-model` родительской группы. |
| debounce | number | `0` | Задержка в миллисекундах перед сохранением. Критично для текстовых инпутов при `bindToQuery`. |
| title | string | - | Заголовок конкретного фильтра. |
| opened | boolean | `false` | Раскрыт ли фильтр по умолчанию. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое фильтра (чекбоксы, инпуты и т.д.). |

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
