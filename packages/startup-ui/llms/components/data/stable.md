# STable

Таблица.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Семантика  поддерживает и итератор строк-значений, и просто вставку строк как есть.</li>
            <li>Позволяет задать состояние, когда нет данных, одним атрибутом.</li>
            <li>Позволяет сделать горизонтальный скролл сверху таблицы, что полезно для длинных таблиц с большим кол-вом колонок.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

```vue
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
            <td>{{ row.created_at }}</td>
            <td>
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
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', role: 'customer', plan: 'Базовый', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', role: 'customer', plan: 'Базовый', balance: 1716, created_at: '2025-11-05' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Утилиты выравнивания

По умолчанию ячейки выравниваются по позиции колонки: первая — по левому краю, последняя — по правому, остальные — по центру. Выравнивание конкретной ячейки можно переопределить классами на `<td>` — `.left`, `.center`, `.right`, а `.nowrap` запрещает перенос строки:

```vue
<template>
    <STable :data="rows">
        <template #header>
            <td>Товар</td>
            <td class="right">Цена</td>
            <td class="left">Остаток</td>
            <td class="nowrap">Артикул</td>
        </template>
        <template #row="{ row }">
            <td>{{ row.name }}</td>
            <td class="right">{{ row.price }}</td>
            <td class="left">{{ row.stock }}</td>
            <td class="nowrap">{{ row.sku }}</td>
        </template>
    </STable>
</template>
<script setup>
import { ref } from 'vue'

const rows = ref([
    { name: 'Кофемолка', price: '3 200 ₽', stock: 12, sku: 'KF-001-XL' },
    { name: 'Чайник', price: '1 850 ₽', stock: 4, sku: 'CH-204' },
])
</script>
```

## Подсветка строк при наведении

Для подсветки при наведении добавляем атрибут <strong>hoverable</strong>

```vue
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
            <td>
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
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', role: 'customer', plan: 'Базовый', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', role: 'customer', plan: 'Базовый', balance: 1716, created_at: '2025-11-05' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Явные границы по краям ячеек

Для отрисовки границ добавляем атрибут <strong>bordered</strong>

```vue
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
            <td>
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
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', role: 'customer', plan: 'Базовый', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', role: 'customer', plan: 'Базовый', balance: 1716, created_at: '2025-11-05' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Выделение четных строк

Для выделения четных строк добавляем атрибут <strong>striped</strong>

```vue
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
            <td>
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
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', role: 'customer', plan: 'Базовый', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', role: 'customer', plan: 'Базовый', balance: 1716, created_at: '2025-11-05' },
    { username: 'Sidorov', role: 'customer', plan: 'Базовый', balance: 6000, created_at: '2025-11-06' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Фиксированная шапка

Чтобы зафиксировать шапку, устанавливаем высоту таблицы в атрибуте `height`.

```vue
<template>
    <div class="table-container">
        <STable :data="users" height="300px">
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
                <td>
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
            </template>
        </STable>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const base = [
    { username: 'Ivanov', name: 'Иван', secondname: 'Иванов', birthdate: '1995.06.06', height: '175', weight: '80', role: 'Пользователь', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', name: 'Степан', secondname: 'Степанов', birthdate: '1990.02.14', height: '182', weight: '88', role: 'Админ', plan: '-', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', name: 'Петр', secondname: 'Петров', birthdate: '1988.09.21', height: '178', weight: '76', role: 'Пользователь', plan: 'Премиум', balance: 1716, created_at: '2025-11-05' },
    { username: 'Sidorov', name: 'Сергей', secondname: 'Сидоров', birthdate: '1993.12.01', height: '170', weight: '72', role: 'Пользователь', plan: 'Базовый', balance: 6000, created_at: '2025-11-06' },
    { username: 'Alexeev', name: 'Алексей', secondname: 'Алексеев', birthdate: '1996.03.30', height: '185', weight: '90', role: 'Редактор', plan: '-', balance: 2000, created_at: '2025-11-09' },
]
const users = ref([...base, ...base.map(u => ({ ...u, username: u.username + '2' }))])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

<SNote icon="lightbulb" attention>
Для высоты таблицы с фиксированной шапкой удобно использовать <code>80vh</code>, чтобы таблица занимала 80% от высоты экрана.
</SNote>

## Горизонтальный скролл сверху

```vue
<template>
    <div class="table-container">
        <STable :data="users" top-scroll>
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
                <td>
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
            </template>
        </STable>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', name: 'Иван', secondname: 'Иванов', birthdate: '1995.06.06', height: '175', weight: '80', role: 'Пользователь', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', name: 'Степан', secondname: 'Степанов', birthdate: '1990.02.14', height: '182', weight: '88', role: 'Админ', plan: '-', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', name: 'Петр', secondname: 'Петров', birthdate: '1988.09.21', height: '178', weight: '76', role: 'Пользователь', plan: 'Премиум', balance: 1716, created_at: '2025-11-05' },
    { username: 'Sidorov', name: 'Сергей', secondname: 'Сидоров', birthdate: '1993.12.01', height: '170', weight: '72', role: 'Пользователь', plan: 'Базовый', balance: 6000, created_at: '2025-11-06' },
    { username: 'Alexeev', name: 'Алексей', secondname: 'Алексеев', birthdate: '1996.03.30', height: '185', weight: '90', role: 'Редактор', plan: '-', balance: 2000, created_at: '2025-11-09' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Кастомный контент внутри tbody

Если нужно задать явные строки в tbody вместо перебора #row, то используем дефолтный слот (в нем для отдельных строк нужно явно указать `<tr>`).

```vue
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
            <td>
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
import { ref, computed } from 'vue'

const users = ref([
    { username: 'Ivanov', role: 'customer', plan: 'Базовый', balance: 3000, created_at: '2025-11-04' },
    { username: 'Stepanov', role: 'customer', plan: 'Базовый', balance: 4500, created_at: '2025-11-05' },
    { username: 'Petrov', role: 'customer', plan: 'Базовый', balance: 1716, created_at: '2025-11-05' },
])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0))
</script>
```

## Несколько строк в header / footer

Если это нужно, просто используем отдельные слоты headers / footers (добавляется в конце "s"), в которые уже добавляем `<tr>`.

```vue
<template>
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
</template>
```

## Сообщение о том, что нет данных

Когда задаем data и перебираем его через `<template #row>`, то часто (например, когда есть фильтры страницы) бывает нужно показать состояние «Ничего не найдено», когда в data ноль строк. По умолчанию в таком случае выводится сообщение «Ничего не найдено», которое можно заменить на кастомное через пропс/слот nodata:

```vue
<template>
    <STable :data="users" nodata="Пользователи не найдены">
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
            <td>
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
        </template>
    </STable>
</template>
<script setup>
import { ref } from 'vue'

const users = ref([])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}
</script>
```

или

```vue
<template>
    <STable :data="users">
        <template #nodata>
            <SNote>По заданным критериям поиска ничего не нашлось</SNote>
        </template>
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
            <td>
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
        </template>
    </STable>
</template>
<script setup>
import { ref } from 'vue'

const users = ref([])

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username)
}
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| data | `T[] \| Record<string \| number, T>` | `undefined` | Массив или объект данных для итерации (используется вместе со слотом `#row`). |
| hoverable | boolean | `false` | Подсветка строки при наведении курсора. |
| striped | boolean | `false` | Чередование цвета фона строк (выделение четных строк). |
| bordered | boolean | `false` | Отрисовка границ (бордеров) у всех ячеек. |
| nodata | string | `'Ничего не найдено'` | Текст, выводимый, когда `data` пустое. |
| fixedHeader | boolean | `false` | Фиксированная шапка (принудительно), если не задана `height`. |
| height | string | `undefined` | Фиксированная высота таблицы (например, `300px` или `80vh`). Автоматически включает `fixedHeader`. |
| topScroll | boolean | `false` | Переносит горизонтальный скролл наверх таблицы. |

### Слоты (Slots)

| Название | Описание |
|----------|-------------|
| header | Содержимое `<tr/>` внутри `<thead>`. Подходит для большинства таблиц (без rowspan/colspan в шапке). |
| headers | Полный контроль над `<thead>` (вместо `header`). Нужно явно писать теги `<tr>`. |
| row | Слот с областью видимости `{ row, index }`. Отрисовывается для каждого элемента из `data`. Внутри нужно писать только `<td>`. |
| default | Переопределяет содержимое `<tbody>`. Используется, если не передан `data`. Нужно явно писать теги `<tr>`. |
| footer | Содержимое `<tr/>` внутри `<tfoot>`. |
| footers | Полный контроль над `<tfoot>` (содержит теги `<tr>`). |
| nodata | Кастомный HTML для пустого состояния, заменяет пропс `nodata`. |

<style lang="scss">
.vp-doc table {
    overflow-x: visible;
}

.vp-doc td {
    border: none;
}

.vp-doc table h3 {
    margin: 0;
}

.s-demo-preview .s-table,
.s-demo-preview .s-table table {
    margin: 0 !important;
}
.s-demo-preview .s-table tr {
    border-top: 0 !important;
    background-color: transparent;
}
.s-demo-preview .s-table td {
    border-bottom: 1px solid var(--s-border) !important;
}

.s-table tfoot {
    color: var(--s-text) !important;
}

.table-container .s-table > table {
    width: 120%;
}

.dark .s-table.striped {
    tbody tr:nth-of-type(even) {
        background-color: #282828 !important;
    }
}
</style>
