# SDashboard + SDashboardItem

Дешборд блоков (как правило, удобно использовать для отчетов).

## Базовый пример

<SDashboard>
  <SDashboardItem title="Продажи">
    Информация о продажах.
  </SDashboardItem>
  <SDashboardItem title="Списания за услуги">
    Информация о стоимости услуг.
  </SDashboardItem>
</SDashboard>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Кастомный заголовок

Если текста не достаточно, то для заголовка можно использовать слот:

<SDashboard>  
    <SDashboardItem>
        <template #title>
            Продажи <STooltip>Только с подписанными актами</STooltip>
        </template>
        Информация о продажах.
  </SDashboardItem>
</SDashboard>

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

## Доп.элемент справа от заголовка

Справа от заголовка часто бывает сподручно разместить дополнительную ссылку или что-то ещё. Сделать это можно в слоте #extra:

<SDashboard>
  <SDashboardItem title="Мой тариф">
    <template #extra>
      <a href="/docs/plans/">Как работают тарифы?</a>
    </template>
    Описание работы тарифов
  </SDashboardItem>
</SDashboard>

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Максимальная высота контента

Иногда динамически генерируемый контент внутри SDashboardItem может превращаться в длинную простыню. Чтобы не занимать большое пространство подобным блоком, такой контент можно ограничить по высоте, и в случае превышения в блоке появится свой внутренний горизонтальный скролл.

<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

## Цвета

По умолчанию блоки идут в самом светлом цвете акцента, но при необходимости можно использовать кастомные выделения цветом:

<SDashboard>
  <SDashboardItem title="Обычный блок" />
  <SDashboardItem gray title="Серый блок" />
  <SDashboardItem green title="Зеленый блок" />
  <SDashboardItem red title="Красный блок" />
</SDashboard>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}"/>

<script setup>
import SDashboard from '../../../packages/startup-ui/src/components/SDashboard.vue';
import SDashboardItem from '../../../packages/startup-ui/src/components/SDashboardItem.vue';
import STooltip from '../../../packages/startup-ui/src/components/STooltip.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const code1 = `
<SDashboard>
  <SDashboardItem title="Продажи">
    Информация о продажах.
  </SDashboardItem>
  <SDashboardItem title="Списания за услуги">
    Информация о стоимости услуг.
  </SDashboardItem>
</SDashboard>
`;
const fullCode1 = `
<template>
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

const code2 = `
<SDashboardItem>
    <template #title>
        Продажи <STooltip>Только с подписанными актами</STooltip>
    </template>
    Информация о продажах.
</SDashboardItem>
`;
const fullCode2 = `
<template>
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

const code3 = `
<SDashboard>
    <SDashboardItem title="Мой тариф">
        <template #extra>
        <Link href="/docs/plans/">Как работают тарифы?</Link>
        </template>
        Описание работы тарифов
    </SDashboardItem>
</SDashboard>
`;
const fullCode3 = `
<template>
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

const code4 = `
<SDashboardItem title="Регистрации пользователей" :max-content-height="300">
...
</SDashboardItem>
`;
const fullCode4 = `
<template>
<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard } from 'startup-ui';
<//script>
`;

const code5 = `
<SDashboardItem title="Обычный блок" />
<SDashboardItem gray title="Серый блок" />
<SDashboardItem green title="Зеленый блок" />
<SDashboardItem red title="Красный блок" />
`;
const fullCode5 = `
<template>
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
}
</style>

