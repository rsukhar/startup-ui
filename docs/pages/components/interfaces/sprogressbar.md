# SProgressBar

Полоска прогресса.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Есть лейбл-пояснение, формирующий ожидание пользователей, упрощенный до одного атрибута.</li>
    </ol>
</SToggle>

## Базовый пример


<div class="docs-container" style="display: block">
    <SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
</div>

<div v-pre>

```vue
<template>
    <SProgressBar :percentage="readyPercentage">Обновляем проект...</SProgressBar>
</template>

<script setup>
import { ref } from 'vue';
import { SProgressBar } from 'startup-ui';

const readyPercentage = ref(50);
</script>
```

</div>

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| percentage | number | undefined | Обязательный. Текущее значение прогресса от 0 до 100. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текстовая метка, отображаемая рядом с полосой прогресса (например, «Обновляем проект...»). |

<script setup>
import { ref } from 'vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SProgressBar from '../../../../packages/startup-ui/src/components/SProgressbar.vue';

const readyPercentage = ref(50);
</script>

<style lang="scss">
.s-progressbar {
    color: var(--s-text);
}
</style>