# SActionBar

Полоска действия (обычно, для выбранных элементов).

<SToggle title="В чем отличие от аналогов?">В популярных библиотеках прямого аналога нет.</SToggle>

## Базовый пример

:::demo
```vue
<template>
    <SCheckboxGroup v-model="users" :options="userOptions" />
    <SActionBar v-if="users.length">
        <SSelect v-model="massAction" :options="massActions" style="width: 250px" />
        <SButton @click="applyMassAction">Применить</SButton>
    </SActionBar>
</template>
<script setup>
import { ref } from 'vue'
import { SAlert } from 'startup-ui'

const userOptions = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' }
const users = ref([])

const massActions = { sendBonus: 'Отправить бонус', greet: 'Поприветствовать', delete: 'Удалить' }
const massAction = ref('sendBonus')

function applyMassAction() {
    users.value = []
    SAlert.success('Действие выполнено')
}
</script>
```
```vue
<SCheckboxGroup v-model="users" :options="userOptions" />
<SActionBar v-if="users.length">
    <SSelect v-model="massAction" :options="massActions" style="width: 250px" />
    <SButton @click="applyMassAction">Применить</SButton>
</SActionBar>
```
:::

## Интерфейс компонента

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Интерактивные элементы, кнопки или формы для отображения в панели действий. Контент использует flexbox, элементы располагаются в ряд. |
