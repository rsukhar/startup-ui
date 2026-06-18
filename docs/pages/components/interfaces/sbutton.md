# SButton

Кнопка.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>В зависимости от контекста сам подбирает семантический элемент: анкор для ссылок или button для отправки формы.</li>
        <li>Позволяет передать Link-элемент InertiaJS в качестве атрибута as.</li>
    </ol>
</SToggle>

## Стандартный пример

Используйте `color`, `outlined`, `transparent`, `disabled`, `small`, `loading` и `fullwidth` чтобы задать стили кнопок.

### Основной цвет

:::demo
```vue
<template>
    <SButton>Основное действие</SButton>
    <SButton outlined>Дополнительное действие</SButton>
    <SButton transparent>Прозрачная кнопка</SButton>
    <SButton disabled>Недоступная кнопка</SButton>
    <SButton small>Маленькая кнопка</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton>Основное действие</SButton>
<SButton outlined>Дополнительное действие</SButton>
<SButton transparent>Прозрачная кнопка</SButton>
<SButton disabled>Недоступная кнопка</SButton>
<SButton small>Маленькая кнопка</SButton>
```
:::

### Красная кнопка

:::demo
```vue
<template>
    <SButton color="red">Основное действие</SButton>
    <SButton outlined color="red">Дополнительное действие</SButton>
    <SButton transparent color="red">Прозрачная кнопка</SButton>
    <SButton disabled color="red">Недоступная кнопка</SButton>
    <SButton small color="red">Маленькая кнопка</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton color="red">Основное действие</SButton>
<SButton outlined color="red">Дополнительное действие</SButton>
<SButton transparent color="red">Прозрачная кнопка</SButton>
<SButton disabled color="red">Недоступная кнопка</SButton>
<SButton small color="red">Маленькая кнопка</SButton>
```
:::

### Зеленая кнопка

:::demo
```vue
<template>
    <SButton color="green">Основное действие</SButton>
    <SButton outlined color="green">Дополнительное действие</SButton>
    <SButton transparent color="green">Прозрачная кнопка</SButton>
    <SButton disabled color="green">Недоступная кнопка</SButton>
    <SButton small color="green">Маленькая кнопка</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton color="green">Основное действие</SButton>
<SButton outlined color="green">Дополнительное действие</SButton>
<SButton transparent color="green">Прозрачная кнопка</SButton>
<SButton disabled color="green">Недоступная кнопка</SButton>
<SButton small color="green">Маленькая кнопка</SButton>
```
:::

### Жёлтая кнопка

:::demo
```vue
<template>
    <SButton color="yellow">Основное действие</SButton>
    <SButton outlined color="yellow">Дополнительное действие</SButton>
    <SButton transparent color="yellow">Прозрачная кнопка</SButton>
    <SButton disabled color="yellow">Недоступная кнопка</SButton>
    <SButton small color="yellow">Маленькая кнопка</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton color="yellow">Основное действие</SButton>
<SButton outlined color="yellow">Дополнительное действие</SButton>
<SButton transparent color="yellow">Прозрачная кнопка</SButton>
<SButton disabled color="yellow">Недоступная кнопка</SButton>
<SButton small color="yellow">Маленькая кнопка</SButton>
```
:::

### Кнопка на всю ширину формы

:::demo
```vue
<template>
    <SButton fullwidth>Основное действие</SButton>
    <SButton fullwidth color="red">Основное действие</SButton>
    <SButton fullwidth color="green">Основное действие</SButton>
    <SButton fullwidth color="yellow">Основное действие</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton fullwidth>Основное действие</SButton>
<SButton fullwidth color="red">Основное действие</SButton>
<SButton fullwidth color="green">Основное действие</SButton>
<SButton fullwidth color="yellow">Основное действие</SButton>
```
:::

## Действия по кнопке

### Отправка формы

Если кнопка внутри формы, то отправляет форму:

```vue
<template>
    <SForm method="post" action="/users/create">
        ...
        <SButton>Создать пользователя</SButton>
    </SForm>
</template>
```

### Кастомное действие

:::demo
```vue
<template>
    <SButton @click="createUser">Создать пользователя</SButton>
</template>
<script setup>
import { SAlert } from 'startup-ui'
function createUser() {
    SAlert.success('Пользователь создан')
}
</script>
```
```vue
<SButton @click="createUser">Создать пользователя</SButton>
```
:::

### Переход по ссылке

Если добавляем href, то кнопка по умолчанию становится семантически правильным анкором:

:::demo
```vue
<template>
    <SButton href="https://startup-ui.suhar.ru">Документация</SButton>
</template>

<script setup>
import { SButton } from 'startup-ui'
</script>
```
```vue
<SButton href="https://startup-ui.suhar.ru">Документация</SButton>
```
:::

### Переход по внутренней ссылке InertiaJs

Если нужно сделать кнопку внутренней InertjaJS-ссылкой, то используем атрибут "is":

```vue
<SButton :is="Link" href="/projects/create">Создать проект</SButton>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| outlined | boolean | false | Стиль кнопки с контуром (без заливки) |
| transparent | boolean | false | Прозрачная кнопка без границ |
| fullwidth | boolean | false | Кнопка на всю ширину контейнера |
| small | boolean | false | Маленький размер кнопки |
| disabled | boolean | false | Отключает кнопку (некликабельна, прозрачность 0.3) |
| loading | boolean | false | Состояние загрузки (некликабельна, курсор ожидания) |
| color | string | — | Цвет кнопки: `"red"`, `"green"`, `"yellow"` или кастомный |
| is | string \| Component | — | HTML-элемент или Vue-компонент для рендеринга (например, InertiaJS `Link`) |
| href | string | — | URL для перехода (делает кнопку ссылкой) |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое кнопки (текст, иконка и т.д.) |
