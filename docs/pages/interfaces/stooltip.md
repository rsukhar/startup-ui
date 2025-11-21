# STooltip

Иконка вопроса со всплывающе/й подсказкой.

## Базовый пример

<div class="docs-container">
Показы
<STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
</div>

``` js
Показы
<STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
```

## Фиксированное положение

По умолчанию положение подсказки выбирается исходя из того, где эта подсказка уместится на экране. Но если нужно указать положение явно, можно использовать атрибут `at`:

<div class="docs-container">
    <div>Подсказка сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Подсказка слева <STooltip at="left">Подсказка слева</STooltip></div>
    <div>Подсказка справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Подсказка снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
</div>

::: details Показать код
``` js
<template>
    <div>Подсказка сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Подсказка справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Подсказка снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
    <div>Подсказка слева <STooltip at="left">Подсказка слева</STooltip></div>
</template>
<script setup>
import { STooltip } from 'startup-ui';
</script>
```
:::

## Кастомная иконка

Если нужна другая иконка, то её можно заменить атрибутом icon:

::: details Показать код
``` js
<div>Подсказка с другой иконкой <STooltip icon="circle-info">Подсказка с другой иконкой</STooltip></div>
<script setup>
import { STooltip } from 'startup-ui';
</script>
```
:::

<div class="docs-container">
    <div>Подсказка с другой иконкой <STooltip icon="circle-info">Подсказка с другой иконкой</STooltip></div>
</div>

Если нужна совсем нестандартная иконка/область наведения, то можно использовать слот icon:

<div class="docs-container">
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>

::: details Показать код
``` js
<div>Подсказка с другой иконкой 
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>
<script setup>
import { STooltip } from 'startup-ui';
</script>
```
:::

<script setup>
import STooltip from '../../../packages/startup-ui/src/components/STooltip.vue';
</script>
<style lang="scss" scoped>
.s-tooltip {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}
</style>