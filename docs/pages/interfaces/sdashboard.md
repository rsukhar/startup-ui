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

::: details Показать код
``` js
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
</script>
```
:::

## Кастомный заголовок

Если текста не достаточно, то я головка можно использовать слот:

<SDashboard>  
    <SDashboardItem>
        <template #title>
            Продажи <STooltip>Только с подписанными актами</STooltip>
        </template>
        Информация о продажах.
  </SDashboardItem>
</SDashboard>

::: details Показать код
``` js
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
</script>
```
:::

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

::: details Показать код
``` js
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
</script>
```
:::

## Максимальная высота контента

Иногда динамически генерируемый контент внутри SDashboardItem может превращаться в длинную простыню. Чтобы не занимать большое пространство подобным блоком, такой контент можно ограничить по высоте, и в случае превышения в блоке появится свой внутренний горизонтальный скролл.

<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>

::: details Показать код
``` js
<template>
<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>
</template>
<script setup>
import { SDashboardItem, SDashboard } from 'startup-ui';
</script>
```
:::

## Цвета

По умолчанию блоки идут в самом светлом цвете акцента, но при необходимости можно использовать кастомные выделения цветом:

<SDashboard>
  <SDashboardItem title="Обычный блок" />
  <SDashboardItem gray title="Серый блок" />
  <SDashboardItem green title="Зеленый блок" />
  <SDashboardItem red title="Красный блок" />
</SDashboard>

::: details Показать код
``` js
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
</script>
```
:::

<script setup>
import SDashboard from '../../../packages/startup-ui/src/components/SDashboard.vue';
import SDashboardItem from '../../../packages/startup-ui/src/components/SDashboardItem.vue';
import STooltip from '../../../packages/startup-ui/src/components/STooltip.vue';
</script>
<style lang="scss">
.s-dashboard {
    color: var(--s-text);
}
</style>

