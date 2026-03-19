# SCopyText

Копируемый текст.

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках элементов для Vue3 прямого аналога нет.</SToggle>

## Базовый пример

По умолчанию компонент отображается как блок с рамкой и иконкой копирования. При клике текст из слота копируется в буфер обмена:

<div class="docs-container block">
<SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</div>

<div v-pre>

```vue
<template>
    <SCopyText>ABCD-EFGH-1234-5678</SCopyText>
</template>
```

</div>

## Внутристрочный пример

Для встраивания копируемого текста внутри абзаца используйте `layout="inline"` — убирает рамку, текст отображается с пунктирным подчёркиванием:

<div class="docs-container" style="display:block;">
<SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.
</div>

<div v-pre>

```vue
<template>
    <p><SCopyText layout="inline">Секретный код для копирования</SCopyText> в обычном тексте.</p>
</template>
```

</div>

## Копируем не то, что выводим

Иногда нужно показывать одно, а копировать другое. Используйте проп `copytext`:

<div class="docs-container block">
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</div>

<div v-pre>

```vue
<template>
    <SCopyText copytext="777">Секретный код: 777</SCopyText>
</template>
```

</div>

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

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SCopyText from '../../../../packages/startup-ui/src/components/SCopyText.vue';
</script>

<style lang="scss">
.block .s-copytext {
    max-width: 450px;
}
</style>