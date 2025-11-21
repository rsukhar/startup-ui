# SToggle + SToggleGroup

Открывающийся-закрывающийся блок.

## Базовый пример

<div class="docs-container">
<SToggle title="Какие есть гарантии результата?">
    <p><strong>Результат до оплаты.</strong> После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты.</p>
</SToggle>
</div>

::: details Показать код
``` js
<template>
<SToggle title="Какие есть гарантии результата?">
    <p><strong>Результат до оплаты.</strong> После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты.</p>
</SToggle>
</template>
<script setup>
import { SToggle } from 'startup-ui';
</script>
```
:::

## Первоначально открытое состояние

<div class="docs-container">
<SToggle title="Какие есть гарантии результата?" opened>
    <p><strong>Результат до оплаты.</strong> После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты.</p>
</SToggle>
</div>

::: details Показать код
``` js
<template>
<SToggle title="Какие есть гарантии результата?" opened>
    <p><strong>Результат до оплаты.</strong> После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты.</p>
</SToggle>
</template>
<script setup>
import { SToggle } from 'startup-ui';
</script>
```
:::

## Кастомный заголовок

Когда просто текста не достаточно, используем слот:

<div class="docs-container">
<SToggle>
    <template #title>Обратите внимание&nbsp;<STag color="primary-darkest">1</STag></template>
    При пополнении счета банковской картой вы получаете бонус в размере 10 000 рублей.  
</SToggle>
</div>

::: details Показать код
``` js
<template>
<SToggle>
    <template #title>Обратите внимание&nbsp;<STag color="primary-darkest">1</STag></template>
    При пополнении счета банковской картой вы получаете бонус в размере 10 000 рублей.  
</SToggle>
</template>
<script setup>
import { SToggle, STag } from 'startup-ui';
</script>
```
:::

## Несколько блоков (аккордеон)

<div class="docs-container">
<SToggleGroup>
    <SToggle title="Сколько это будет занимать времени">5 минут в день. Базовая настройка и запуск обычно занимает от 5 до 30 минут.</SToggle>
    <SToggle title="Гарантии результата">Результат до оплаты. После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты. И это лучше любых гарантий!</SToggle>
</SToggleGroup>
</div>

::: details Показать код
``` js
<template>
<SToggleGroup>
    <SToggle title="Сколько это будет занимать времени">5 минут в день. Базовая настройка и запуск обычно занимает от 5 до 30 минут.</SToggle>
    <SToggle title="Гарантии результата">Результат до оплаты. После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты. И это лучше любых гарантий!</SToggle>
</SToggleGroup>
</template>
<script setup>
import { SToggleGroup, SToggle } from 'startup-ui';
</script>
```
:::

По умолчанию будет давать открыть не более одного тоггла (остальные будет закрывать). Если нужно открыть несколько, то добавляем multiple:

<div class="docs-container">
<SToggleGroup multiple>
    <SToggle title="Сколько это будет занимать времени">5 минут в день. Базовая настройка и запуск обычно занимает от 5 до 30 минут.</SToggle>
    <SToggle title="Гарантии результата">Результат до оплаты. После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты. И это лучше любых гарантий!</SToggle>
</SToggleGroup>
</div>

::: details Показать код
``` js
<template>
<SToggleGroup multiple>
    <SToggle title="Сколько это будет занимать времени">5 минут в день. Базовая настройка и запуск обычно занимает от 5 до 30 минут.</SToggle>
    <SToggle title="Гарантии результата">Результат до оплаты. После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты. И это лучше любых гарантий!</SToggle>
</SToggleGroup>
</template>
<script setup>
import { SToggleGroup, SToggle } from 'startup-ui';
</script>
```
:::

<script setup>
import SToggleGroup from '../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../packages/startup-ui/src/components/SToggle.vue';
import STag from '../../../packages/startup-ui/src/components/STag.vue';
</script>
<style lang="scss">
.s-toggle {
    color: var(--s-text);
}
</style>