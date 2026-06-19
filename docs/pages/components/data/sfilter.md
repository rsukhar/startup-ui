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
</SToggleGroup>

## Базовый пример

:::demo
```vue
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
    <p>Текущее значение: <code>{{ filter }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const filter = ref({})
</script>
```
```vue
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
<p>Текущее значение: <code>{{ filter }}</code></p>
```
:::

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

По умолчанию `bind-to-query` синхронизирует URL через нативный History API — без серверного рефетча и без зависимости от какого-либо роутера (компонент не требует InertiaJS). Если нужно, чтобы изменение фильтра инициировало серверный запрос (SPA-навигация), зарегистрируйте роутер один раз при подключении плагина — например, роутер Inertia:

```js
// app.js
import StartupUI from 'startup-ui';
import { router } from '@inertiajs/vue3';

app.use(StartupUI, { router });
```

Подойдёт любой объект с совместимой сигнатурой `get(url, params, options)`. Если роутер не зарегистрирован — `bind-to-query` работает «в чистом виде» (только синхронизация URL).

## Часто используемые поля

### Горизонтальные радио-кнопки

:::demo
```vue
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="role">
            <SRadioGroup buttons placeholder="Все" :options="roles" />
        </SFilter>
    </SFilterGroup>
    <p>Текущее значение: <code>{{ filter }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const filter = ref({})
const roles = { customer: 'Пользователь', admin: 'Админ', editor: 'Редактор' }
</script>
```
```vue
<SFilterGroup v-model="filter">
    <SFilter name="role">
        <SRadioGroup buttons placeholder="Все" :options="roles" />
    </SFilter>
</SFilterGroup>
<p>Текущее значение: <code>{{ filter }}</code></p>
```
:::

Placeholder задает «не выбранный вариант» — null-значение.

## Выпадающий список

:::demo
```vue
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="status">
            <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
        </SFilter>
    </SFilterGroup>
    <p>Текущее значение: <code>{{ filter }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const filter = ref({})
const statusOptions = { warning: 'Предупреждение', success: 'Удачно', error: 'Ошибка' }
</script>
```
```vue
<SFilterGroup v-model="filter">
    <SFilter name="status">
        <SSelect placeholder="Любой статус" :options="statusOptions" clearable />
    </SFilter>
</SFilterGroup>
<p>Текущее значение: <code>{{ filter }}</code></p>
```
:::

## Текстовое поле ввода

:::demo
```vue
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="q" :debounce="500" style="max-width: 350px">
            <SInput type="search" placeholder="Поиск по никнейму" />
        </SFilter>
    </SFilterGroup>
    <p>Текущее значение: <code>{{ filter }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const filter = ref({})
</script>
```
```vue
<SFilterGroup v-model="filter">
    <SFilter name="q" :debounce="500" style="max-width: 350px">
        <SInput type="search" placeholder="Поиск по никнейму" />
    </SFilter>
</SFilterGroup>
<p>Текущее значение: <code>{{ filter }}</code></p>
```
:::

## Выбор периода дат

:::demo
```vue
<template>
    <SFilterGroup v-model="filter">
        <SFilter name="period">
            <SDatePicker range value-format="YYYYMMDD" />
        </SFilter>
    </SFilterGroup>
    <p>Текущее значение: <code>{{ filter }}</code></p>
</template>
<script setup>
import { ref } from 'vue'
const filter = ref({})
</script>
```
```vue
<SFilterGroup v-model="filter">
    <SFilter name="period">
        <SDatePicker range value-format="YYYYMMDD" />
    </SFilter>
</SFilterGroup>
<p>Текущее значение: <code>{{ filter }}</code></p>
```
:::

## Интерфейс компонента SFilterGroup

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `Object` | `{}` | Объект, хранящий состояние всех вложенных `SFilter`. |
| bindToQuery | boolean | `false` | Синхронизирует состояние с GET-параметрами. По умолчанию через History API; если зарегистрирован роутер (`app.use(StartupUI, { router })`) — через него (напр. Inertia-визит с серверным рефетчем). |
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
