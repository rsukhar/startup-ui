# SColumnSettings

Включение/выключение колонок в таблице.

## Базовый пример

<div class="s-columnsettingspage-container">
<SColumnSettings v-model="tableColumns" :options="availableColumns"/>
</div>

<div class="docs-container">
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
</div>

<div v-pre>

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
import { ref, computed } from 'vue';
import { STable, SActionIcon, SColumnSettings } from 'startup-ui';

const users = ref([
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000 },
    { "username": "Petrov", "role": "admin", "plan": "Расширенный", "balance": 4500 }
]);

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username);
}

const initialColumns = {
    'plan': 'Тариф',
    'balance': 'Баланс',
    'role': 'Роль'
};

const availableColumns = computed(() => initialColumns);
const tableColumns = ref(Object.keys(initialColumns));
</script>
```

</div>

## Сброс колонок до значений по умолчанию

Если нужно сбрасывать колонки до набора по умолчанию, это можно сделать так:

<div class="s-columnsettingspage-container">
<SColumnSettings v-model="tableColumns2" :options="availableColumns" :column-presets="columnPresets" />
</div>

<div class="docs-container">
    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <template v-for="tableColumn in tableColumns2" :key="tableColumn">
                <td class="center">{{ availableColumns[tableColumn] }}</td>
            </template>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <template v-for="tableColumn in tableColumns2" :key="tableColumn">
                <td class="center">{{ row[tableColumn] }}</td>
            </template>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
    </STable>
</div>

<div v-pre>

```vue
<template>
    <SColumnSettings v-model="tableColumns" :options="availableColumns" :column-presets="columnPresets"/>
</template>

<script setup>
const columnPresets = [{
    title: 'Стандартные колонки',
    columns: [ 'plan', 'balance', 'role', 'created_at'],
}];
</script>
```

</div>

Когда набор полей всего один, по умолчанию в футере выпадающего списка выводится строка «Сбросить изменения», когда несколько — выводится название каждого набора. Это повдение можно изменить с помощью слота <strong>setpreset</strong>:

<div v-pre>

```vue
<template>
    <SColumnSettings v-model="tableColumns" :options="availableColumns" :column-presets="columnPresets">
        <template #setpreset="{ preset }">
            <FontAwesomeIcon icon="rotate-left" /> Сбросить на {{ preset.title }}
        </template>
    </SColumnSettings>
</template>
```

</div>

## Постоянные колонки

Если нужно запретить удаление определенных колонок, передайте массив с ними в атрибут <strong>permanent-columns</strong>:

<div class="s-columnsettingspage-container">
<SColumnSettings v-model="tableColumns3" :options="availableColumns" :column-presets="columnPresets" :permanentColumns="permanentColumns"/>
</div>

<div class="docs-container">
    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <template v-for="tableColumn in tableColumns3" :key="tableColumn">
                <td class="center">{{ availableColumns[tableColumn] }}</td>
            </template>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <template v-for="tableColumn in tableColumns3" :key="tableColumn">
                <td class="center">{{ row[tableColumn] }}</td>
            </template>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
    </STable>
</div>

<div v-pre>

```vue
<template>
    <SColumnSettings 
        v-model="tableColumns" 
        :options="availableColumns" 
        :permanent-columns="['role']" 
    />
</template>
```

</div>

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

<script setup>
import { ref, computed } from 'vue';
import STable from '../../../../packages/startup-ui/src/components/STable.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SColumnSettings from '../../../../packages/startup-ui/src/components/SColumnSettings.vue';

const users =  ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, { "username": "Stepanov", "role": "admin", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username);
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));

const initialColumns = {
    'plan': 'Тариф',
    'balance': 'Баланс',
    'role': 'Роль',
    'created_at': 'Дата регистрации',
};

const availableColumns = computed(() => initialColumns);
const tableColumns = ref(Object.keys(initialColumns));
const tableColumns2 = ref(Object.keys(initialColumns));
const tableColumns3 = ref(Object.keys(initialColumns));

const columnPresets = [{
    title: 'Стандартные колонки',
    columns: [ 'plan', 'balance', 'role', 'created_at'],
}];

const permanentColumns = ['role'];
</script>

<style lang="scss">
.s-columnsettingspage-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.s-custom-dropdown-container.open li + li {
    margin-top: 0;
}
</style>