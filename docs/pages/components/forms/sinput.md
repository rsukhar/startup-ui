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

```vue
<template>
    <SInput v-model="value" />
</template>
```

Также поддерживаются стандартные HTML-типы полей:

<div class="docs-container">
    <SInput v-model="value1" type="number" placeholder="Номер" />
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</div>

```vue
<template>
    <SInput v-model="value1" type="number" placeholder="Номер" />
    <SInput v-model="value2" type="email" placeholder="Email"/>
    <SInput v-model="value3" type="password" placeholder="Пароль"/>
</template>
```

## Многострочное поле ввода (Textarea)

Для создания многострочного поля используйте `type="textarea"`. По умолчанию отображается 3 строки, это можно изменить через проп `rows`.

<div class="docs-container">
    <SInput v-model="value4" type="textarea" placeholder="Введите длинный текст..." />
</div>

```vue
<template>
    <SInput v-model="value" type="textarea" :rows="3" />
</template>
```

## Префикс и суффикс

Вы можете добавить текст или иконки внутри поля ввода. Простые строки передаются через пропсы `prefix` и `suffix`, а для сложного HTML (например, иконок) используйте соответствующие слоты.

<div class="docs-container">
    <SInput v-model="value6" prefix="$" type="number" placeholder="Цена" />
</div>

```vue
<template>
    <SInput v-model="value" prefix="$" type="number" />
</template>
```

Пример с кастомным префиксом через слот:

<div class="docs-container">
    <SInput v-model="value7" type="number" placeholder="С иконкой в начале">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</div>

```vue
<template>
    <SInput v-model="value" type="number">
        <template #prefix>
            <SStatus icon="star" />
        </template>
    </SInput>
</template>
```

## Недоступное состояние (Disabled)

<div class="docs-container">
    <SInput v-model="value8" disabled placeholder="Поле отключено" />
</div>

```vue
<template>
    <SInput v-model="value" disabled />
</template>
```

## Поле с кнопкой очистки

Для этого достаточно использовать стандартный HTML5 тип `search`:

<div class="docs-container">
    <SInput v-model="value9" type="search" placeholder="Поиск..." />
</div>

```vue
<template>
    <SInput v-model="value" type="search" />
</template>
```

## События

Компонент прокидывает событие `change` при вводе текста:

<div class="docs-container">
    <SInput @change="(newValue) => console.log(newValue)" placeholder="Печатаем и смотрим консоль" />
</div>

```vue
<template>
    <SInput @change="(newValue) => console.log(newValue)" />
</template>
```

## Кастомные стили

Если нужно задать стили напрямую вложенному тегу `input` или `textarea`, используйте проп `input-style`:

<div class="docs-container">
    <SInput input-style="text-align: center" placeholder="Текст по центру" />
</div>

```vue
<template>
    <SInput input-style="text-align: center" />
</template>
```

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