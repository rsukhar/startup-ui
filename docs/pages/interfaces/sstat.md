# SStat

Строчка статистики, выравненные по заголовкам.

## Базовый пример

<div class="docs-container">
<SStat title="Сумма платежей">777 000 ₽</SStat>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Кастомный заголовок

<div class="docs-container">
<SStat>
  <template #title>
    Сумма платежей <STooltip>За выбранный период</STooltip>
  </template>
  777 000 ₽
</SStat>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

<script setup>
import SStat from '../../../packages/startup-ui/src/components/SStat.vue';
import STooltip from '../../../packages/startup-ui/src/components/STooltip.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const code1 = `
<SStat title="Сумма платежей">777 000 ₽</SStat>
`;
const fullCode1 = `
<template>
    <SStat title="Сумма платежей">777 000 ₽</SStat>
</template>
<script setup>
import { SStat } from 'startup-ui';
<\/script>
`;

const code2 = `
<SStat>
    <template #title>
        Сумма платежей <STooltip>За выбранный период</STooltip>
    </template>
    777 000 ₽
</SStat>
`;
const fullCode2 = `
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
<\/script>
`;
</script>
<style lang="scss" scoped>
.s-dashboard {
    color: var(--s-text);
}

.s-stat {
    margin: 0;
}
</style>
