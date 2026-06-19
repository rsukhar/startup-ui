# SColumnSettings

Включение/выключение колонок в таблице.

## Базовый пример

```vue
<template>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <SColumnSettings v-model="tableColumns" :options="availableColumns" />
    </div>

    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ availableColumns[tableColumn] }}</td>
            </template>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ row[tableColumn] }}</td>
            </template>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`"
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000 },
    { username: 'Petrov', role: 'admin', plan: 'Расширенный', balance: 4500 }
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const availableColumns = {
    plan: 'Тариф',
    balance: 'Баланс',
    role: 'Роль'
}
const tableColumns = ref(Object.keys(availableColumns))
</script>
```

## Сброс колонок до значений по умолчанию

Если нужно сбрасывать колонки до набора по умолчанию, это можно сделать так:

```vue
<template>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <SColumnSettings v-model="tableColumns" :options="availableColumns" :column-presets="columnPresets" />
    </div>

    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ availableColumns[tableColumn] }}</td>
            </template>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ row[tableColumn] }}</td>
            </template>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`"
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
    </STable>
</template>
<script setup>
import { ref } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Petrov', role: 'admin', plan: 'Расширенный', balance: 4500, created_at: '2025-11-05' }
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const availableColumns = {
    plan: 'Тариф',
    balance: 'Баланс',
    role: 'Роль',
    created_at: 'Дата регистрации'
}
const tableColumns = ref(Object.keys(availableColumns))

const columnPresets = [{
    title: 'Стандартные колонки',
    columns: ['plan', 'balance', 'role', 'created_at']
}]
</script>
```

Когда набор полей всего один, по умолчанию в футере выпадающего списка выводится строка «Сбросить изменения», когда несколько — выводится название каждого набора. Это повдение можно изменить с помощью слота <strong>setpreset</strong>:

```vue
<template>
    <SColumnSettings v-model="tableColumns" :options="availableColumns" :column-presets="columnPresets">
        <template #setpreset="{ preset }">
            <FontAwesomeIcon icon="rotate-left" /> Сбросить на {{ preset.title }}
        </template>
    </SColumnSettings>
</template>
```

## Постоянные колонки

Если нужно запретить удаление определенных колонок, передайте массив с ними в атрибут <strong>permanent-columns</strong>:

```vue
<template>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <SColumnSettings v-model="tableColumns" :permanent-columns="permanentColumns" :column-presets="columnPresets" :options="availableColumns" />
    </div>

    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ availableColumns[tableColumn] }}</td>
            </template>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <template v-for="tableColumn in tableColumns" :key="tableColumn">
                <td class="center">{{ row[tableColumn] }}</td>
            </template>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`"
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
    </STable>
</template>
<script setup>
import { ref } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Petrov', role: 'admin', plan: 'Расширенный', balance: 4500, created_at: '2025-11-05' }
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const availableColumns = {
    plan: 'Тариф',
    balance: 'Баланс',
    role: 'Роль',
    created_at: 'Дата регистрации'
}
const tableColumns = ref(Object.keys(availableColumns))

const columnPresets = [{
    title: 'Стандартные колонки',
    columns: ['plan', 'balance', 'role', 'created_at']
}]

const permanentColumns = ['role']
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| modelValue / v-model | `string[]` | `[]` | Массив ключей активных колонок. |
| options | `Record<string, string>` | `{}` | Объект (словарь), сопоставляющий ключи колонок с их отображаемыми заголовками, например `{ id: 'Идентификатор' }`. |
| columnPresets | `SColumnSettingsPreset[]` | `[]` | Массив объектов `{ title: string, columns: string[] }`. Используется для быстрого сброса колонок на заданные пресеты. |
| permanentColumns | `string[]` | `[]` | Массив ключей колонок, которые пользователь не может выключить. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| label | Основное содержимое кнопки, открывающей выпадающий список. По умолчанию отображает иконку и текст "Настроить колонки". |
| setpreset | Слот для переопределения шаблона кнопки пресета в подвале выпадающего списка. Передает параментр `{ preset }`. |

<style lang="scss">
.s-custom-dropdown-container.open li + li {
    margin-top: 0;
}
</style>
