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

```vue
<template>
    <SSelect v-model="value" :options="options" placeholder="Выберите" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const value = ref(null);
</script>
```

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Фильтрация при вводе

<div class="docs-container">
    <SSelect v-model="value2" :options="options" filterable placeholder="Выберите" />
</div>

```vue
<template>
    <SSelect v-model="value" :options="options" filterable placeholder="Выберите" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const value = ref(null);
</script>
```

## Получение значений по API

Список значений можно получать и по API.

```vue
<template>
    <SSelect v-model="value" :options="selectOptions" filterable @filter="onFilter" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';
import axios from "axios";

const isLoading = ref(false);
const selectOptions = ref({});
const value = ref(null);

function onFilter(query) {
    isLoading.value = true;
    axios.post('/select_options/search', { query: query })
        .then((response) => selectOptions.value = response.data)
        .finally(() => isLoading.value = false);
}
</script>
```

В данном примере API должно возвращать в data-поле массив {value: title} значений.

## Возможность сброса значения

Иногда бывает нужно сделать возможность сбрасывать значение в невыбранное (null). Для этого используется атрибут <strong>clearable</strong>:

<div class="docs-container">
    <SSelect v-model="value6" :options="options" clearable placeholder="Не выбрано" />
</div>

```vue
<template>
    <SSelect v-model="user" :options="users" clearable placeholder="Не выбрано" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
const user = ref(null);
</script>
```

## Виртуальный скролл

Когда доступно очень много вариантов выбора, можно применить виртуальный скролл для более быстрой загрузки, добавив атрибут <strong>virtual</strong>:

<div class="docs-container">
    <SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
</div>

```vue
<template>
    <SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

// Представим, что здесь огромный список регионов
const regions = [ [ 225, "Россия (225)" ], ... ]; 
const region = ref(null);
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | any | - | Текущее выбранное значение. |
| options | Record \| Array | - | Список вариантов (объект или массив пар). |
| placeholder | string | - | Текст заглушки. |
| filterable | boolean | `false` | Включает текстовый поиск. |
| clearable | boolean | `false` | Показывает кнопку сброса значения. |
| disabled | boolean | `false` | Отключает компонент. |
| inline | boolean | `false` | Убирает границы и делает селект компактным. |
| virtual | boolean | `false` | Включает виртуальный скролл. |
| virtualScrollSize | number | `10` | Количество одновременно отображаемых элементов при виртуальном скролле. |

### Слоты (Slots)

| Название | Параметры | Описание |
|----------|-----------|----------|
| value | `{ value: any }` | Кастомное отображение выбранного значения. |
| option | `{ option: { label: string, value: any } }` | Кастомное отображение элемента в выпадающем списке. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| change | `(value: any)` | Вызывается при изменении значения. |
| filter | `(query: string)` | Вызывается при вводе текста в режиме поиска. |

<script setup>
import { ref } from 'vue';
import SSelect from '../../../../packages/startup-ui/src/components/SSelect.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import { regions } from '../../../resources/data/regions.js';

const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };

const value1 = ref(null);
const value2 = ref(null);
const value6 = ref(null);
const region = ref(null);
</script>

<style lang="scss">
.docs-container {
    padding: 20px;
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background: var(--s-bg-light);
}

.s-select {
    min-width: 200px;
}
</style>