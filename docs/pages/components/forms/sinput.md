# SInput

Базовые поля ввода.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Исключает опции, которые, как правило, не используются в стартапах (напр. размеры полей), но из-за которых разные программисты реализовывают компонент по-разному. Без лишних опций унифицируется код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Стандартные поля ввода

<div class="docs-container">
    <SInput v-model="value" placeholder="Обычный инпут" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

Также поддерживаются стандартные HTML-типы полей:

<div class="docs-container">
    <SInput v-model="value1" type="number" placeholder="Номер" />
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value1" type="number" placeholder="Номер"/>
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</template>
```
```vue [Весь код]
<template>
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
</script>
```
:::

## Многострочное поле ввода

<div class="docs-container">
    <SInput v-model="value4" type="textarea" placeholder="Введите длинный текст..." />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" type="textarea" />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" type="textarea" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Плейсхолдер

<div class="docs-container">
    <SInput v-model="value5" placeholder="Введите имя" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" placeholder="Введите имя" />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" placeholder="Введите имя" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Префикс

<div class="docs-container">
    <SInput v-model="value6" prefix="$" type="number" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" prefix="$" type="number" />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" prefix="$" type="number" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

Если нужен кастомный префикс:

<div class="docs-container">
    <SInput v-model="value7" type="number">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" type="number">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</template>
```
```vue [Весь код]
<template>
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
</script>
```
:::

## Недоступное состояние

<div class="docs-container">
    <SInput v-model="value8" disabled />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" disabled />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" disabled />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Поле ввода с кнопкой очистки

Просто используем стандартный HTML5-тип search:

<div class="docs-container">
    <SInput v-model="value9" type="search" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput v-model="value" type="search" />
</template>
```
```vue [Весь код]
<template>
    <SInput v-model="value" type="search" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## События

<div class="docs-container">
    <SInput @change="(newValue) => console.log(newValue)" placeholder="Печатаем и смотрим консоль" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput @change="(newValue) => console.log(newValue)" />
</template>
```
```vue [Весь код]
<template>
    <SInput @change="(newValue) => console.log(newValue)" />
</template>

<script setup>
import { SInput } from 'startup-ui';
</script>
```
:::

## Кастомные стили для инпута

Если нужно задать кастомные стили именно для вложенного инпута, то задаем их через input-style:

<div class="docs-container">
    <SInput input-style="text-align: center" />
</div>

:::code-group
```vue [Пример]
<template>
    <SInput input-style="text-align: center" />
</template>
```
```vue [Весь код]
<template>
    <SInput input-style="text-align: center" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const value = ref('');
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| modelValue / v-model | `number \| string \| null` | `undefined` | Связанное значение поля ввода. |
| type | `'text' \| 'string' \| 'number' \| 'email' \| 'password' \| 'textarea' \| 'search'` | `'text'` | Внутренний тип поля. При значении `textarea` отрисовывается многострочное поле. |
| placeholder | string | `undefined` | Текст-заполнитель, отображаемый, когда поле пустое. |
| prefix | string | `undefined` | Простой текст для отображения в начале поля. Добавляет класс `.has-prefix` обертке. |
| suffix | string | `undefined` | Простой текст для отображения в конце поля. Добавляет класс `.has-suffix` обертке. |
| disabled | boolean | `false` | Флаг, отключающий интерактивность поля. |
| rows | number | `3` | Количество видимых строк текста (применяется только при `type="textarea"`). |
| inputStyle | `StyleValue` | `undefined` | CSS-стили, передаваемые напрямую внутреннему элементу (`input` или `textarea`). |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| prefix | Расширенный контент (например, иконки) перед текстом. Переопределяет проп `prefix`. |
| suffix | Расширенный контент (например, иконки) после текста. Переопределяет проп `suffix`. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| change | `(value: string)` | Срабатывает на нативное событие `@input`. Передает текущее строковое значение. |

<script setup>
import { ref } from 'vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';

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
</script>

<style lang="scss">
.s-input {
    color: var(--s-text);
}
</style>
