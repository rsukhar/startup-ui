# SCopyText

Копируемый текст.

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках элементов для Vue3 прямого аналога нет.</SToggle>

## Базовый пример

```vue
<template>
    <SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</template>

<script setup>
import { SCopyText } from 'startup-ui'
</script>
```

## Внутристрочный пример

```vue
<template>
    <SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</template>

<script setup>
import { SCopyText } from 'startup-ui'
</script>
```

## Копируем не то, что выводим

```vue
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>

<script setup>
import { SCopyText } from 'startup-ui'
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| layout | `'input'` \| `'inline'` | `'input'` | Вид компонента. `'input'` — блок с рамкой, `'inline'` — текст с пунктирным подчёркиванием. |
| copytext | string | undefined | Строка, которая будет скопирована в буфер. Если не указана, копируется текст из слота. |
| size | `'small'` \| `'normal'` \| `'large'` | `'normal'` | Размер компонента. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текстовое содержимое, отображаемое пользователю. |

<script setup lang="ts">
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
</script>

<style lang="scss">
.block .s-copytext {
    max-width: 450px;
}
</style>
