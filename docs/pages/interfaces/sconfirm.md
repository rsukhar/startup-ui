# SConfirm

Диалоговое окно подтверждения действия.

## Базовый пример

<div class="docs-container">
<SButton @click="deleteUser">Удалить пользователя</SButton>
</div>

::: details Показать код
``` js
<template>
<SButton @click="deleteUser">Удалить пользователя</SButton>
</template>
<script setup>
import { SConfirm,  SAlert, SButton } from 'startup-ui';

function deleteUser(){
  SConfirm.open('Вы действительно хотите удалить пользователя?', {
    title: 'Подтверждение удаления',
    onAccept: () => SAlert.success('Пользователь удален')
  });
}
</script>
```
:::

<script setup>
import { SConfirm } from '../../../packages/startup-ui/src/components/SConfirm';
import { SAlert } from '../../../packages/startup-ui/src/components/SAlert';
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';

function deleteUser(){
  SConfirm.open('Вы действительно хотите удалить пользователя?', {
    title: 'Подтверждение удаления',
    onAccept: () => SAlert.success('Пользователь удален'),
  });
}
</script>