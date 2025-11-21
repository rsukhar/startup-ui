# STable

Таблица.

## Базовый пример

<div class="docs-container">
    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</div>

::: details Показать код
``` js
<template>
    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.balance }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable, SActionIcon } from 'startup-ui';

const users =  ref([ { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```
:::

## Подсветка строк при наведении

<div class="docs-container">
    <STable :data="users" hoverable>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</div>

::: details Показать код
``` js
<template>
    <STable :data="users" hoverable>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

const users =  ref([ { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```
:::

## Явные границы по краям ячеек

<div class="docs-container">
    <STable :data="users" bordered>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</div>

::: details Показать код
``` js
<template>
    <STable :data="users" bordered>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

const users =  ref([ { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
</script>
```
:::

## Выделение четных строк

<div class="docs-container">
    <STable :data="users" striped>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</div>

::: details Показать код
``` js
<template>
    <STable :data="users" striped>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td>{{ row.plan }}</td>
            <td>{{ row.balance }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```
:::

## Горизонтальный скролл сверху

<div class="docs-container">
    <div class="table-container">
        <STable :data="users2" scroll="top">
            <template #header>
                <td>Пользователь</td>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>Дата рождения</td>
                <td>Рост</td>
                <td>Вес</td>
                <td>Тариф</td>
                <td>Баланс</td>
                <td>Роль</td>
                <td>Дата регистрации</td>
                <td></td>
            </template>
            <template #row="{ row }">
                <td>{{ row.username }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.secondname }}</td>
                <td>{{ row.birthdate }}</td>
                <td>{{ row.height }}</td>
                <td>{{ row.weight }}</td>
                <td>{{ row.plan }}</td>
                <td>{{ row.balance }}</td>
                <td>{{ row.role }}</td>
                <td>{{ row.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                        @click="deleteUser(row.username)" icon="trash" danger />
                </td>
            </template>
            <template #footer>
                <td>ИТОГО</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ totalBalance }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </template>
        </STable>
    </div>
</div>

::: details Показать код
``` js
<template>
    <div class="table-container">
        <STable :data="users2" scroll="top">
            <template #header>
                <td>Пользователь</td>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>Дата рождения</td>
                <td>Рост</td>
                <td>Вес</td>
                <td>Тариф</td>
                <td>Баланс</td>
                <td>Роль</td>
                <td>Дата регистрации</td>
                <td></td>
            </template>
            <template #row="{ row }">
                <td>{{ row.username }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.secondname }}</td>
                <td>{{ row.birthdate }}</td>
                <td>{{ row.height }}</td>
                <td>{{ row.weight }}</td>
                <td>{{ row.plan }}</td>
                <td>{{ row.balance }}</td>
                <td>{{ row.role }}</td>
                <td>{{ row.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                        @click="deleteUser2(row.username)" icon="trash" danger />
                </td>
            </template>
            <template #footer>
                <td>ИТОГО</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ totalBalance2 }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </template>
        </STable>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```
:::

## Кастомный контент внутри tbody

Если нужно задать явные строки в tbody вместо перебора #row, то используем дефолтный слот (в нем для отдельных строк нужно явно указать `<tr>`).

``` js
<template>
    <STable>
        <template #header>
            <td>Пользователь</td>
            <td>Тариф</td>
            <td>Баланс</td>
            <td>Роль</td>
            <td>Дата регистрации</td>
            <td></td>
        </template>
            <tr v-for="user in users" :key="user.username">
                <td>{{ user.username }}</td>
                <td>{{ user.plan }}</td>
                <td>{{ user.balance }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${user.username}»?`" 
                        @click="deleteUser(user.username)" icon="trash" danger />
                </td>
            </tr>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>{{ totalBalance }}</td>
            <td></td>
            <td></td>
            <td></td>
        </template>
    </STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```

<STable>
    <template #header>
        <td>Пользователь</td>
        <td>Тариф</td>
        <td>Баланс</td>
        <td>Роль</td>
        <td>Дата регистрации</td>
        <td></td>
    </template>
        <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.plan }}</td>
            <td>{{ user.balance }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${user.username}»?`" 
                    @click="deleteUser(user.username)" icon="trash" danger />
            </td>
        </tr>
    <template #footer>
        <td>ИТОГО</td>
        <td></td>
        <td>{{ totalBalance }}</td>
        <td></td>
        <td></td>
        <td></td>
    </template>
</STable>

## Несколько строк в header / footer

Если это нужно, просто используем отдельные слоты headers / footers (добавляется в конце “s”), в которые уже добавляем `<tr>`.

``` js
<template>
    <div class="docs-container">
        <STable>
            <template #headers>
                <tr><td>...</td></tr>
                <tr><td>...</td></tr>
            </template>
            ...
            <template #footers>
                <tr><td>...</td></tr>
                <tr><td>...</td></tr>
            </template>
        </STable>
    </div>
</template>
```

## Сообщение о том, что нет данных

Когда задаем data и перебираем его через `<template #row>`, то часто (например, когда есть фильтры страницы) бывает нужно показать состояние «Ничего не найдено», когда в data ноль строк. По умолчанию в таком случае выводится сообщение «Ничего не найдено», которое можно заменить на кастомное через пропс/слот nodata:

<STable :data="users3" nodata="Пользователи не найдены">
    <template #header>
        <td>Пользователь</td>
        <td>Тариф</td>
        <td>Баланс</td>
        <td>Роль</td>
        <td>Дата регистрации</td>
        <td></td>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td>{{ row.plan }}</td>
        <td>{{ row.balance }}</td>
        <td>{{ row.role }}</td>
        <td>{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td></td>
        <td>0</td>
        <td></td>
        <td></td>
        <td></td>
    </template>
</STable>

::: details Показать код
``` js
<STable :data="users" nodata="Пользователи не найдены">
    ...
</STable>
```
:::

или

<STable :data="users3" nodata="Пользователи не найдены">
    <template #header>
        <td>Пользователь</td>
        <td>Тариф</td>
        <td>Баланс</td>
        <td>Роль</td>
        <td>Дата регистрации</td>
        <td></td>
    </template>
    <template #nodata>
        <h3>Пользователи не найдены!</h3>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td>{{ row.plan }}</td>
        <td>{{ row.balance }}</td>
        <td>{{ row.role }}</td>
        <td>{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td></td>
        <td>0</td>
        <td></td>
        <td></td>
        <td></td>
    </template>
</STable>

::: details Показать код
``` js
<STable :data="users">
    <template #nodata>
        <h3>Пользователи не найдены!</h3>
    </template>
    ...
</STable>
```
:::

<script setup>
import { ref, computed } from 'vue'; 
import STable from '../../../packages/startup-ui/src/components/STable.vue';
import SActionIcon from '../../../packages/startup-ui/src/components/SActionIcon.vue';

const users =  ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username);
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));

const users2 =  ref([ 
    { "username": "Ivanov", 'name': 'Иван', 'secondname': 'Иванов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", 'name': 'Степан', 'secondname': 'Степанов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Админ", "plan": "-", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", 'name': 'Петр', 'secondname': 'Петров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Премиум", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", 'name': 'Сергей', 'secondname': 'Сидоров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", 'name': 'Алексей', 'secondname': 'Алексеев', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Редактор", "plan": "-", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

const totalBalance2 = computed(() => users2.value.reduce((acc, user) => acc + user.balance, 0));

function deleteUser2(username) {
    users2.value = users2.value.filter(user => user.username !== username);
}

const users3 = ref([]);
</script>
<style lang="scss">
.vp-doc table {
    overflow-x: visible;
}

.vp-doc td {
    border: none;
}

.vp-doc tr:nth-child(2n) {
    background-color: transparent;
}

.vp-doc table h3 {
    margin: 0;
}

.table-container {
    max-width: 550px;
}

.docs-container {
    padding: 20px;
    border: 1px solid #4c4d4f;
    border-radius: 6px;
}
</style>