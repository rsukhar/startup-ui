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

:::code-group
```vue [Пример]
<template>
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</template>
```
```vue [Весь код]
<template>
    <SCheckbox v-model="isAccepted">Я согласен</SCheckbox>
</template>

<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const isAccepted = ref('');
</script>
```
:::

Модель принимает значение true/false.

## Группа галочек

<div class="docs-container">
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

:::code-group
```vue [Пример]
<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug">Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
```
```vue [Весь код]
<template>
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
</script>
```
:::

В данном случае в модели будет храниться массив выбранных значений: <code>{{ types }}</code>

## Динамический набор значений

В предыдущем примере набор вариантов хардкодился в шаблоне, что удобно, когда набор значений относится к логическому уровню интерфейса. Но когда набор вариантов идет из базы данных или конфига, очень неудобно каждый раз формировать набор элементов через v-for, и вместо этого используем атрибут <strong>options</strong>.

<div class="docs-container">
    <SCheckboxGroup v-model="users" :options="userOptions" />
</div>

:::code-group
```vue [Пример]
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
</template>
```
```vue [Весь код]
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
</template>

<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
</script>
```
:::

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Вертикальный список галочек

Чтобы выводить группу галочек вертикальным списком, добавляем атрибут <strong>vertical</strong>:

<div class="docs-container">
    <SCheckboxGroup v-model="usersSecond" :options="userOptions" vertical />
</div>

:::code-group
```vue [Пример]
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" vertical />
</template>
```
```vue [Весь код]
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" vertical />
</template>

<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const users = ref([]);
const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };
</script>
```
:::

## Недоступное значение

Добавляем атрибут <strong>disabled</strong> значению, которое должно быть недоступно для переключения.

<div class="docs-container">
    <SCheckboxGroup v-model="typesDisabled">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</div>

:::code-group
```vue [Пример]
<template>
    <SCheckboxGroup v-model="types">
        <SCheckbox value="bug" disabled>Ошибка</SCheckbox>
        <SCheckbox value="question">Вопрос</SCheckbox>
        <SCheckbox value="idea">Идея</SCheckbox>
    </SCheckboxGroup>
</template>
```
```vue [Весь код]
<template>
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
</script>
```
:::

## Интерфейс компонента SCheckboxGroup

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `any[]` | `[]` | Массив выбранных значений. |
| options | Record \| Array | `{}` | Список вариантов (объект или массив пар). |
| vertical | boolean | `false` | Расположение элементов в колонку. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое группы (обычно компоненты `SCheckbox`). |

## Интерфейс компонента SCheckbox

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | any | - | Значение (для одиночного использования). |
| value | any | `undefined` | Значение элемента (для использования в группе). |
| disabled | boolean | `false` | Отключает возможность выбора. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текст лейбла рядом с галочкой. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| change | `(value: any)` | Вызывается при изменении состояния. |

<script setup>
import { ref } from 'vue';
import SCheckboxGroup from '../../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SCheckbox from '../../../../packages/startup-ui/src/components/SCheckbox.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' };

const isAccepted = ref(false);
const types = ref([]);
const typesDisabled = ref([]);
const users = ref([]);
const usersSecond = ref([]);
</script>

<style lang="scss">
.docs-container {
    padding: 20px;
    border: 1px solid var(--s-border);
    border-radius: var(--s-border-radius);
    background: var(--s-bg-light);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
