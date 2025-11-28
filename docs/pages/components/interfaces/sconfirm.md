# SConfirm

Диалоговое окно подтверждения действия.

## Базовый пример

<div class="docs-container">
<SButton @click="deleteUser">Удалить пользователя</SButton>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

<script setup>
import { SConfirm } from '../../../../packages/startup-ui/src/components/SConfirm';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

function deleteUser(){
  SConfirm.open('Вы действительно хотите удалить пользователя?', {
    title: 'Подтверждение удаления',
    onAccept: () => SAlert.success('Пользователь удален'),
  });
}

const code1 = `SConfirm.open('Вы действительно хотите удалить пользователя?', {
    title: 'Подтверждение удаления',
    onAccept: () => SAlert.success('Пользователь удален')
});
`;
const fullCode1 = `<template>
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
<\/script>
`;
</script>
<style lang="scss">
.s-confirm {
    color: var(--s-text);
}
</style>