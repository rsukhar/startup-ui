# SProgressBar

Полоска прогресса.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Есть лейбл-пояснение, формирующий ожидание пользователей, упрощенный до одного атрибута.</li>
    </ol>
</SToggle>

## Базовый пример


:::demo
```vue
<template>
    <SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
</template>
<script setup>
import { ref } from 'vue'

const readyPercentage = ref(50)
</script>
```
```vue
<SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| percentage | number | undefined | Обязательный. Текущее значение прогресса от 0 до 100. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текстовая метка, отображаемая рядом с полосой прогресса (например, «Обновляем проект...»). |

<script setup lang="ts">
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
</script>

<style lang="scss">
.s-progressbar {
    color: var(--s-text);
}
</style>
