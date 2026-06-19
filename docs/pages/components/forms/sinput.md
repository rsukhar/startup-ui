# SInput

Базовые поля ввода.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Исключает опции, которые, как правило, не используются в стартапах (напр. размеры полей), но из-за которых разные программисты реализовывают компонент по-разному. Без лишних опций унифицируется код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Стандартные поля ввода

:::demo
```vue
<template>
    <SInput v-model="value" placeholder="Обычный инпут" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
```vue
<SInput v-model="value" placeholder="Обычный инпут" />
```
:::

Также поддерживаются стандартные HTML-типы полей:

:::demo
```vue
<template>
    <SInput v-model="value1" type="number" placeholder="Номер" />
    <SInput v-model="value2" type="email" placeholder="Email" />
    <SInput v-model="value3" type="password" placeholder="Пароль" />
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```
```vue
<SInput v-model="value1" type="number" placeholder="Номер" />
<SInput v-model="value2" type="email" placeholder="Email" />
<SInput v-model="value3" type="password" placeholder="Пароль" />
```
:::

## Многострочное поле ввода

:::demo
```vue
<template>
    <SInput v-model="value" type="textarea" placeholder="Введите длинный текст..." />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
```vue
<SInput v-model="value" type="textarea" placeholder="Введите длинный текст..." />
```
:::

## Префикс / суффикс

Простой текст задаём пропами `prefix` / `suffix`, а для произвольного контента (иконки и т.п.) — одноимёнными слотами:

:::demo
```vue
<template>
    <SInput v-model="value1" prefix="$" type="number" placeholder="Префикс" />
    <SInput v-model="value2" type="number" placeholder="Кастомный префикс">
        <template #prefix>
            <FontAwesomeIcon icon="star" />
        </template>
    </SInput>
    <SInput v-model="value3" suffix="₽" type="number" placeholder="Суффикс" />
    <SInput v-model="value4" type="number" placeholder="Кастомный суффикс">
        <template #suffix>
            <STooltip>Подсказка к полю</STooltip>
        </template>
    </SInput>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
```
```vue
<SInput v-model="value1" prefix="$" type="number" placeholder="Префикс" />
<SInput v-model="value2" type="number" placeholder="Кастомный префикс">
    <template #prefix>
        <FontAwesomeIcon icon="star" />
    </template>
</SInput>
<SInput v-model="value3" suffix="₽" type="number" placeholder="Суффикс" />
<SInput v-model="value4" type="number" placeholder="Кастомный суффикс">
    <template #suffix>
        <STooltip>Подсказка к полю</STooltip>
    </template>
</SInput>
```
:::

## Недоступное состояние

:::demo
```vue
<template>
    <SInput v-model="value" disabled />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('Иван Иванов')
</script>
```
```vue
<SInput v-model="value" disabled />
```
:::

## Поле ввода с кнопкой очистки

Добавляем атрибут `clearable` — кнопка очистки появляется, когда в поле есть значение:

:::demo
```vue
<template>
    <SInput v-model="value" clearable placeholder="Введите текст" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('Очисти меня')
</script>
```
```vue
<SInput v-model="value" clearable placeholder="Введите текст" />
```
:::

## События

:::demo
```vue
<template>
    <SInput @change="(newValue) => console.log(newValue)" placeholder="Печатаем и смотрим консоль" style="width: 100%" />
</template>

<script setup>
import { SInput } from 'startup-ui'
</script>
```
```vue
<SInput @change="(newValue) => console.log(newValue)" placeholder="Печатаем и смотрим консоль" style="width: 100%" />
```
:::

## Кастомные стили для инпута

Если нужно задать кастомные стили именно для вложенного инпута, то задаем их через `input-style`:

:::demo
```vue
<template>
    <SInput v-model="value" input-style="text-align: center" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('По центру')
</script>
```
```vue
<SInput v-model="value" input-style="text-align: center" />
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| modelValue / v-model | `number \| string \| null` | `undefined` | Связанное значение поля ввода. |
| type | `'text' \| 'string' \| 'number' \| 'email' \| 'password' \| 'textarea'` | `'text'` | Внутренний тип поля. При значении `textarea` отрисовывается многострочное поле. |
| placeholder | string | `undefined` | Текст-заполнитель, отображаемый, когда поле пустое. |
| prefix | string | `undefined` | Простой текст для отображения в начале поля. Добавляет класс `.has-prefix` обертке. |
| suffix | string | `undefined` | Простой текст для отображения в конце поля. Добавляет класс `.has-suffix` обертке. |
| clearable | boolean | `false` | Показывает кнопку очистки, когда в поле есть значение. |
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

<style lang="scss">
.s-input {
    color: var(--s-text);
}
</style>
