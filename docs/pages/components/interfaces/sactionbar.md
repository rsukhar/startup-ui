# SActionBar

Полоска действия (обычно, для выбранных элементов).

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках прямого аналога нет.</SToggle>

## Базовый пример

<div class="docs-container">
    <SCheckboxGroup v-model="users" :options="userOptions" />
    <SActionBar v-if="users.length">
        <SSelect v-model="massAction" :options="massActions" style="width: 250px" />
        <SButton @click="applyMassAction">Применить</SButton>
    </SActionBar>
</div>

:::code-group
```vue [Пример]
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
    <SActionBar v-if="users.length">
        <SSelect v-model="massAction" :options="massActions" />
        <SButton @click="applyMassAction">Применить</SButton>
    </SActionBar>
</template>
```
```vue [Весь код]
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
</script>
```
:::

## Интерфейс компонента

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Интерактивные элементы, кнопки или формы для отображения в панели действий. Контент использует flexbox, элементы располагаются в ряд. |

<script setup>
import { ref } from 'vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SActionBar from '../../../../packages/startup-ui/src/components/SActionBar.vue';
import SCheckboxGroup from '../../../../packages/startup-ui/src/components/SCheckboxGroup.vue';
import SSelect from '../../../../packages/startup-ui/src/components/SSelect.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';

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
</script>
