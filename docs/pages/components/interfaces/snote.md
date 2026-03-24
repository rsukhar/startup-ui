# SNote

Текстовая заметка.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Привязка к FontAwesome, который бесплатен и оптимально решает задачи иконок для стартапов.</li>
    </ol>
</SToggle>

## Базовый пример


<div class="docs-container">
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</div>

:::code-group
```vue [Пример]
<template>
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</template>
```
```vue [Весь код]
<template>
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</template>

<script setup>
import { SNote } from 'startup-ui';
</script>
```
:::

## С иконкой и заголовком


<div class="docs-container">
    <SNote icon="circle-info" title="В проекте ещё нет ключевиков">
        <ol>
            <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
            <li>Сервис оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
        </ol>
    </SNote>
</div>

:::code-group
```vue [Пример]
<template>
    <SNote icon="circle-info" title="В проекте ещё нет ключевиков">
        <ol>
            <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
            <li>Сервис оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
        </ol>
    </SNote>
</template>
```
```vue [Весь код]
<template>
    <SNote icon="circle-info" title="В проекте ещё нет ключевиков">
        <ol>
            <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
            <li>Сервис оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
        </ol>
    </SNote>
</template>

<script setup>
import SNote from 'startup-ui';
</script>
```
:::

В качестве иконок используются названия иконок font-awesome.

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| icon | string \| string[] | undefined | Имя иконки FontAwesome для отображения рядом с заголовком |
| title | string | undefined | Текст заголовка, отображаемый сверху заметки |
| gray | boolean | false | Стилизует заметку с серым (нейтральным) фоном |
| attention | boolean | false | Стилизует заметку с желтым фоном (для предупреждений/внимания) |
| success | boolean | false | Стилизует заметку с зеленым фоном (для сообщений об успехе) |
| error | boolean | false | Стилизует заметку с красным фоном и границей (для ошибок) |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Основное содержимое заметки. Поддерживает текст или HTML (абзацы, списки и т.д.) |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SNote from '../../../../packages/startup-ui/src/components/SNote.vue';
</script>

<style scoped lang="scss">
.s-note {
    margin-bottom: 0px;
}
</style>
