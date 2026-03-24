# SSwitch

Включатель-выключатель.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Сразу идет с кликабельным стандартизированным лейблом в качестве простого атрибута. Это унифицирует код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
</ol>
</SToggle>

## Базовый пример

<div class="docs-container">
    <SSwitch v-model="checked">Включить</SSwitch>
</div>

:::code-group
```vue [Пример]
<template>
    <SSwitch v-model="checked">Включить</SSwitch>
</template>
```
```vue [Весь код]
<template>
    <SSwitch v-model="checked">Включить</SSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
</script>
```
:::

Модель принимает значение true/false.

## Недоступное состояние

<div class="docs-container">
    <SSwitch v-model="checkedSecond" disabled>Не работает</SSwitch>
</div>

:::code-group
```vue [Пример]
<template>
    <SSwitch v-model="checked" disabled>Не работает</SSwitch>
</template>
```
```vue [Весь код]
<template>
    <SSwitch v-model="checked" disabled>Не работает</SSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const checked = ref(false);
</script>
```
:::

## Кастомные да/нет-значения

Для включенного/отключенного состояния можно задать кастомные значения:

<div class="docs-container">
    <SSwitch v-model="checkedThird" true-value="yes" false-value="no">Значение: {{ checkedThird }}</SSwitch>
</div>

:::code-group
```vue [Пример]
<template>
    <SSwitch v-model="value" true-value="yes" false-value="no">
        Значение: {{ value }}
    </SSwitch>
</template>
```
```vue [Весь код]
<template>
    <SSwitch v-model="value" true-value="yes" false-value="no">
        Значение: {{ value }}
    </SSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const value = ref(false);
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | `any` | `null` | Состояние переключателя. |
| disabled | `boolean` | `false` | Отключает возможность переключения. |
| true-value | `any` | `true` | Значение для «включенного» состояния. |
| false-value | `any` | `false` | Значение для «выключенного» состояния. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Текст лейбла (описания) рядом с переключателем. |

<script setup>
import { ref } from 'vue';
import SSwitch from '../../../../packages/startup-ui/src/components/SSwitch.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';

const checked = ref(false);
const checkedSecond = ref(false);
const checkedThird = ref('no');
</script>
