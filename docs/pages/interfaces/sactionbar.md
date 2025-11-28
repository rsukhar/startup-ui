# SActionBar

Полоска действия (обычно, для выбранных элементов).

## Базовый пример

<div class="docs-container">
    <SCheckboxGroup v-model="users" :options="userOptions" />
    <SActionBar v-if="users.length">
        <SSelect v-model="massAction" :options="massActions" />
        <SButton @click="applyMassAction">Применить</SButton>
    </SActionBar>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

<script setup>
import { ref } from 'vue';
import SActionBar from '../../../packages/startup-ui/src/components/SActionBar.vue';
import SCheckboxGroup from '../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SSelect from '../../../packages/startup-ui/src/components/SSelect.vue';
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../packages/startup-ui/src/components/SAlert';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const massActions = { sendBonus: 'Отправить бонус', greet: 'Поприветствовать', delete: 'Удалить' };
const massAction = ref('sendBonus');

function applyMassAction() {
    users.value = [];
    SAlert.success('Действие выполнено');
}

const users = ref([]);
const userOptions = {
    1: 'Иванов',
    2: 'Петров',
    3: 'Сидоров'
};

const code1 = `
<SCheckboxGroup v-model="users" :options="userOptions" />
<SActionBar v-if="users.length">
    <SSelect v-model="massAction" :options="massActions" />
    <SButton @click="applyMassAction">Применить</SButton>
</SActionBar>
`;
const fullCode1 = `
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
    <SActionBar v-if="users.length">
        <SSelect v-model="massAction" :options="massActions" />
        <SButton @click="applyMassAction">Применить</SButton>
    </SActionBar>
</template>
<script setup>
import { SCheckboxGroup, SActionBar, SSelect, SButton} from 'startup-ui';

const massActions = { sendBonus: 'Отправить бонус', greet: 'Поприветствовать', delete: 'Удалить' };
const massAction = ref('sendBonus');

function applyMassAction() {
    ...
    SAlert.success('Действие выполнено');
}

const users = ref([]);
const userOptions = {
    1: 'Иванов',
    2: 'Петров',
    3: 'Сидоров'
}; 
<\/script>
`;
</script>