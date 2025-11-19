# SStat

Строчка статистики, выравненные по заголовкам.

## Базовый пример

<div class="docs-container">
<SStat title="Сумма платежей">777 000 ₽</SStat>
</div>

::: details Показать код
``` js
<template>
    <SStat title="Сумма платежей">777 000 ₽</SStat>
</template>
<script setup>
import { SStat } from 'startup-ui';
</script>
```
:::

## Кастомный заголовок

<div class="docs-container">
<SStat>
  <template #title>
    Сумма платежей <STooltip>За выбранный период</STooltip>
  </template>
  777 000 ₽
</SStat>
</div>

::: details Показать код
``` js
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
:::

<script setup>
import SStat from '../../../packages/startup-ui/src/components/SStat.vue';
import STooltip from '../../../packages/startup-ui/src/components/STooltip.vue';
</script>
<style lang="scss" scoped>
.s-dashboard {
    color: var(--s-text);
}

.s-stat {
    margin: 0;
}
</style>
