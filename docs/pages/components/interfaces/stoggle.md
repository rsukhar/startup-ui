# SToggleGroup > SToggle

Открывающийся-закрывающийся блок.

## Базовый пример

<div class="docs-container">
<SToggle title="Какие есть гарантии результата?">
    <p><strong>Результат до оплаты.</strong> После регистрации и стартовых действий ты получаешь стартовый депозит, на котором сможешь сделать быстрый тест и получить первые результаты.</p>
</SToggle>
</div>

:::code-group
```vue [Пример]
<template>
    <SToggle title="Какие есть гарантии результата?">
        <p><strong>Результат до оплаты.</strong> Результат до оплаты...</p>
    </SToggle>
</template>
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
<template>
    <SToggle title="Какие есть гарантии результата?" opened>
        <p>Блок открыт по умолчанию...</p>
    </SToggle>
</template>
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
<template>
    <SToggle>
        <template #title>Обратите внимание&nbsp;<STag color="primary-darkest">1</STag></template>
        При пополнении счета банковской картой вы получаете бонус в размере 10 000 рублей.
    </SToggle>
</template>
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
<template>
    <SToggleGroup>
        <SToggle title="Сколько это будет занимать времени">...</SToggle>
        <SToggle title="Гарантии результата">...</SToggle>
    </SToggleGroup>
</template>
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
<template>
    <SToggleGroup multiple>
        <SToggle title="Сколько это будет занимать времени">...</SToggle>
        <SToggle title="Гарантии результата">...</SToggle>
    </SToggleGroup>
</template>
```
```vue [Весь код]
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

## Цвета

Атрибут `color` позволяет менять фоновый стиль заголовка `SToggle`.

<div class="docs-container">
    <SToggle title="Стандартный (bg)" color="bg">Контент...</SToggle>
    <SToggle title="Основной (primary)" color="primary">Контент...</SToggle>
    <SToggle title="Зеленый (green)" color="green">Контент...</SToggle>
    <SToggle title="Красный (red)" color="red">Контент...</SToggle>
</div>

```vue
<template>
    <SToggle title="Стандартный (bg)" color="bg">...</SToggle>
    <SToggle title="Основной (primary)" color="primary">...</SToggle>
    <SToggle title="Зеленый (green)" color="green">...</SToggle>
    <SToggle title="Красный (red)" color="red">...</SToggle>
</template>
```

## Интерфейс компонента SToggleGroup

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| multiple | boolean | false | Если `true`, позволяет одновременно открывать несколько блоков внутри группы. |

## Интерфейс компонента SToggle

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| title | string | undefined | Текст заголовка. |
| opened | boolean | false | Если `true`, блок открыт по умолчанию. |
| color | `'bg'` \| `'primary'` \| `'red'` \| `'green'` | `'bg'` | Цветовая схема заголовка. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| title | Кастомное содержимое для заголовка (переопределяет проп `title`). |
| default | Основное содержимое, которое раскрывается при клике. |

<script setup>
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STag from '../../../../packages/startup-ui/src/components/STag.vue';
</script>

<style lang="scss">
.s-toggle {
    color: var(--s-text);
}
</style>
