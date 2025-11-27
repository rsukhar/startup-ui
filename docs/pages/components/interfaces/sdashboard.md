# SDashboard + SDashboardItem

Дешборд блоков (как правило, удобно использовать для отчетов).

## Базовый пример

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Продажи">
    Информация о продажах.
  </SDashboardItem>
  <SDashboardItem title="Списания за услуги">
    Информация о стоимости услуг.
  </SDashboardItem>
</SDashboard>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'html'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Кастомный заголовок

Если текста не достаточно, то для заголовка можно использовать слот:

<div class="docs-container">
<SDashboard>  
    <SDashboardItem>
        <template #title>
            Продажи <STooltip>Только с подписанными актами</STooltip>
        </template>
        Информация о продажах.
  </SDashboardItem>
</SDashboard>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'html'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

## Доп.элемент справа от заголовка

Справа от заголовка часто бывает сподручно разместить дополнительную ссылку или что-то ещё. Сделать это можно в слоте #extra:

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Мой тариф">
    <template #extra>
      <a href="/docs/plans/">Как работают тарифы?</a>
    </template>
    Описание работы тарифов
  </SDashboardItem>
</SDashboard>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Максимальная высота контента

Иногда динамически генерируемый контент внутри SDashboardItem может превращаться в длинную простыню. Чтобы не занимать большое пространство подобным блоком, такой контент можно ограничить по высоте, и в случае превышения в блоке появится свой внутренний горизонтальный скролл.

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

## Цвета

По умолчанию блоки идут в самом светлом цвете акцента, но при необходимости можно использовать кастомные выделения цветом:

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Обычный блок" />
  <SDashboardItem gray title="Серый блок" />
  <SDashboardItem green title="Зеленый блок" />
  <SDashboardItem red title="Красный блок" />
</SDashboard>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}"/>

<script setup>
import SDashboard from '../../../../packages/startup-ui/src/components/SDashboard.vue';
import SDashboardItem from '../../../../packages/startup-ui/src/components/SDashboardItem.vue';
import STooltip from '../../../../packages/startup-ui/src/components/STooltip.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code1 = `<SDashboard>
  <SDashboardItem title="Продажи">
    Информация о продажах.
  </SDashboardItem>
  <SDashboardItem title="Списания за услуги">
    Информация о стоимости услуг.
  </SDashboardItem>
</SDashboard>
`;
const fullCode1 = `<template>
<SDashboard>
  <SDashboardItem title="Продажи">
    Информация о продажах.
  </SDashboardItem>
  <SDashboardItem title="Списания за услуги">
    Информация о стоимости услуг.
  </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard } from 'startup-ui';
<\/script>
`;

const code2 = `<SDashboardItem>
    <template #title>
        Продажи <STooltip>Только с подписанными актами</STooltip>
    </template>
    Информация о продажах.
</SDashboardItem>
`;
const fullCode2 = `<template>
<SDashboard>  
    <SDashboardItem>
        <template #title>
            Продажи <STooltip>Только с подписанными актами</STooltip>
        </template>
        Информация о продажах.
  </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard, STooltip} from 'startup-ui';
<\/script>
`;

const code3 = `<SDashboard>
    <SDashboardItem title="Мой тариф">
        <template #extra>
        <Link href="/docs/plans/">Как работают тарифы?</Link>
        </template>
        Описание работы тарифов
    </SDashboardItem>
</SDashboard>
`;
const fullCode3 = `<template>
<SDashboard>
    <SDashboardItem title="Мой тариф">
        <template #extra>
        <Link href="/docs/plans/">Как работают тарифы?</Link>
        </template>
        Описание работы тарифов
    </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard, STooltip } from 'startup-ui';
<\/script>
`;

const code4 = `<SDashboardItem title="Регистрации пользователей" :max-content-height="300">
...
</SDashboardItem>
`;
const fullCode4 = `<template>
<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard } from 'startup-ui';
<\/script>
`;

const code5 = `<SDashboardItem title="Обычный блок" />
<SDashboardItem gray title="Серый блок" />
<SDashboardItem green title="Зеленый блок" />
<SDashboardItem red title="Красный блок" />
`;
const fullCode5 = `<template>
<SDashboard>
  <SDashboardItem title="Обычный блок" />
  <SDashboardItem gray title="Серый блок" />
  <SDashboardItem green title="Зеленый блок" />
  <SDashboardItem red title="Красный блок" />
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard } from 'startup-ui';
<\/script>
`;

</script>
<style lang="scss">
.s-dashboard {
    color: var(--s-text);
    margin-bottom: 0;
}
</style>

