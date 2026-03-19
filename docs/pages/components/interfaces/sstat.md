# SStat

Строчка статистики, выравненные по заголовкам.

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках компонентов для Vue3 прямого аналога нет.</SToggle>

## Базовый пример

Вы можете передать заголовок через свойство `title`, а значение — через слот по умолчанию.

<div class="docs-container">
<SStat title="Кол-во платежей">112</SStat>
<SStat title="Сумма платежей">777 000 ₽</SStat>
</div>

<div v-pre>

```vue
<template>
    <SStat title="Кол-во платежей">112</SStat>
    <SStat title="Сумма платежей">777 000 ₽</SStat>
</template>

<script setup>
import { SStat } from 'startup-ui';
</script>
```

</div>

## Кастомный заголовок

Если вам нужно разместить HTML или другие компоненты (например, `STooltip`) внутри заголовка, используйте слот `#title` вместо свойства:

<div class="docs-container">
<SStat>
    <template #title>
        Сумма платежей <STooltip>За выбранный период</STooltip>
    </template>
    777 000 ₽
</SStat>
</div>

<div v-pre>

```vue
<template>
    <SStat>
        <template #title>
            Сумма платежей <STooltip>За выбранный период</STooltip>
        </template>
        777 000 ₽
    </SStat>
</template>

<script setup>
import { SStat, STooltip } from 'startup-ui';
</script>
```

</div>

## Модификаторы

С помощью логических (boolean) свойств можно изменить внешний вид строки:

<div v-pre>

```vue
<template>
    <!-- Крупный текст значения -->
    <SStat title="Выручка" large>777 000 ₽</SStat>

    <!-- nowrap запрещает перенос текста, обрезая его многоточием -->
    <SStat title="Описание" nowrap>Очень длинное описание, которое может не поместиться...</SStat>

    <!-- wide выравнивает заголовок и значение по краям (space-between) -->
    <SStat title="Элементы" wide>10</SStat>
</template>
```

</div>

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| title | string | undefined | Подпись для статистики. |
| value | string \| number | undefined | Альтернатива базовому слоту: передает значение статистики через атрибут. |
| nowrap | boolean | `false` | Запрещает перенос текста и использует многоточие для длинных значений. |
| large | boolean | `false` | Увеличивает размер шрифта и высоту строки для значения. |
| wide | boolean | `false` | Использует `justify-content: space-between`, чтобы прижать значение к правому краю. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Основное содержимое для значения статистики. Имеет приоритет над атрибутом `value`. |
| title | Для кастомного заголовка (например, с иконками или тултипами). Имеет приоритет над атрибутом `title`. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SStat from '../../../../packages/startup-ui/src/components/SStat.vue';
import STooltip from '../../../../packages/startup-ui/src/components/STooltip.vue';
</script>

<style lang="scss" scoped>
.s-stat {
    margin: 0;
}
</style>
