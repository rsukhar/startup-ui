# SDashboard > SDashboardItem

Дешборд блоков (как правило, удобно использовать для отчетов).

<SToggle title="В чем отличие от аналогов?">
    В попурярных библиотеках компонентов для Vue3 прямого аналога нет.
</SToggle>

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

:::code-group
```vue [Пример]
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
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
<template>
    <SDashboardItem>
        <template #title>
            Продажи <STooltip>Только с подписанными актами</STooltip>
        </template>
        Информация о продажах.
    </SDashboardItem>
</template>
```
```vue [Весь код]
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

:::code-group
```vue [Пример]
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
```
```vue [Весь код]
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

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
  </SDashboardItem>
</SDashboard>
</div>

:::code-group
```vue [Пример]
<template>
    <SDashboardItem title="Регистрации пользователей" :max-content-height="300">
    ...
    </SDashboardItem>
</template>
```
```vue [Весь код]
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

<div class="docs-container">
<SDashboard>
  <SDashboardItem title="Обычный блок" />
  <SDashboardItem gray title="Серый блок" />
  <SDashboardItem green title="Зеленый блок" />
  <SDashboardItem red title="Красный блок" />
</SDashboard>
</div>

:::code-group
```vue [Пример]
<template>
    <SDashboardItem title="Обычный блок" />
    <SDashboardItem gray title="Серый блок" />
    <SDashboardItem green title="Зеленый блок" />
    <SDashboardItem red title="Красный блок" />
</template>
```
```vue [Весь код]
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

## Интерфейс компонента SDashboard

### Свойства (Props)

_Нет свойств. Это просто контейнер для обертки и автоматического позиционирования (flex/grid)._

## Интерфейс компонента SDashboardItem

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| title | string | undefined | Текстовый заголовок блока дашборда. |
| maxContentHeight | string \| number | undefined | Фиксированная максимальная высота контента (например, `300` или `'300px'`). При переполнении появится скролл. |
| gray | boolean | `false` | Применяет серый цвет фона. |
| green | boolean | `false` | Применяет светло-зеленый цвет фона. |
| red | boolean | `false` | Применяет светло-красный цвет фона. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Основное содержимое блока. |
| title | Заменяет строковый заголовок (`title`) на кастомный HTML/компоненты. |
| extra | Контейнер с правой стороны заголовка, полезен для ссылок или кнопок действий. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SDashboard from '../../../../packages/startup-ui/src/components/SDashboard.vue';
import SDashboardItem from '../../../../packages/startup-ui/src/components/SDashboardItem.vue';
import STooltip from '../../../../packages/startup-ui/src/components/STooltip.vue';
</script>

<style lang="scss">
.s-dashboard {
    color: var(--s-text);
    margin-bottom: 0;
}
</style>
