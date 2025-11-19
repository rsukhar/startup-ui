# SAlert

Оповещение о произошедшем событии.

## Базовый пример

Информационное оповещение:

<div class="docs-container">
    <SButton @click="SAlert.info('Информация')">Информация</SButton>
</div>

:::details Открыть код 
``` js
<template>
<SButton @click="SAlert.info('Информация')">Информация</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

Оповещение об успешном действии:
<div class="docs-container">
    <SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</div>

:::details Открыть код 
``` js
<template>
<SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

Оповещение об ошибке:
<div class="docs-container">
    <SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</div>

:::details Открыть код 
``` js
<template>
<SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

## Увеличенное время до закрытия

По умолчанию оповещения закрываются через 5 секунд. Другое время закрытия можно задать параметром closeAfter:
<div class="docs-container">
    <SButton color="red" @click="closeWithDelay">Ошибка</SButton>
</div>

:::details Открыть код 
``` js
<template>
    <SButton color="red" @click="closeWithDelay">Ошибка</SButton>
</template>
<script setup>
import { SButton, SAlert} from 'startup-ui';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}
</script>
```
:::

<script setup>
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../packages/startup-ui/src/components/SAlert';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}
</script>