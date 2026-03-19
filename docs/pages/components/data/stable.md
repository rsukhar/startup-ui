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
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Сделать по дефолту выравнивания: для первой колонки — по левому краю, для последней — по правому, для остальных — по центру. Прописать в документацию классы выравниваний.</li>
    </ol>
    </SToggle>
    <SToggle title="Утилиты выравнивания">
        <p>Компонент поставляется со встроенными CSS-классами для выравнивания, которые можно применять к <code>&lt;td&gt;</code>:</p>
        <ul>
            <li><code>.center</code> — по центру.</li>
            <li><code>.right</code> — по правому краю.</li>
            <li><code>.nowrap</code> — запрет переноса строк.</li>
        </ul>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <STable :data="users">
        <template #header>
            <td>Пользователь</td>
            <td class="center">Тариф</td>
            <td class="center">Баланс</td>
            <td class="center">Роль</td>
            <td class="center">Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td class="center">{{ row.plan }}</td>
            <td class="center">{{ row.balance }}</td>
            <td class="center">{{ row.role }}</td>
            <td class="center">{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td class="center"></td>
            <td class="center">{{ totalBalance }}</td>
            <td class="center"></td>
            <td class="center"></td>
            <td></td>
        </template>
    </STable>
</div>

```vue
<template>
<STable :data="users">
    <template #header>
        <td>Пользователь</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td class="center">{{ row.plan }}</td>
        <td class="center">{{ row.balance }}</td>
        <td class="center">{{ row.role }}</td>
        <td class="center">{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</template>

<script setup>
import { ref, computed } from 'vue'; 
import { STable, SActionIcon } from 'startup-ui';

const users = ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }
]);

function deleteUser(username) {
    users.value = users.value.filter(user => user.username !== username);
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```

## Подсветка строк при наведении

Для подсветки при наведении добавляем атрибут <strong>hoverable</strong>

<div class="docs-container">
    <STable :data="users" hoverable>
        <template #header>
            <td>Пользователь</td>
            <td class="center">Тариф</td>
            <td class="center">Баланс</td>
            <td class="center">Роль</td>
            <td class="center">Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td class="center">{{ row.plan }}</td>
            <td class="center">{{ row.balance }}</td>
            <td class="center">{{ row.role }}</td>
            <td class="center">{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td class="center"></td>
            <td class="center">{{ totalBalance }}</td>
            <td class="center"></td>
            <td class="center"></td>
            <td></td>
        </template>
    </STable>
</div>

```vue
<template>
<STable :data="users" hoverable>
    <!-- ... -->
</STable>
</template>
```

## Явные границы по краям ячеек

Для отрисовки границ добавляем атрибут <strong>bordered</strong>

<div class="docs-container">
    <STable :data="users" bordered>
        <template #header>
            <td>Пользователь</td>
            <td class="center">Тариф</td>
            <td class="center">Баланс</td>
            <td class="center">Роль</td>
            <td class="center">Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td class="center">{{ row.plan }}</td>
            <td class="center">{{ row.balance }}</td>
            <td class="center">{{ row.role }}</td>
            <td class="center">{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td class="center"></td>
            <td class="center">{{ totalBalance }}</td>
            <td class="center"></td>
            <td class="center"></td>
            <td></td>
        </template>
    </STable>
</div>

```vue
<template>
<STable :data="users" bordered>
    <!-- ... -->
</STable>
</template>
```

## Выделение четных строк

Для выделения четных строк добавляем атрибут <strong>striped</strong>

<div class="docs-container">
    <STable :data="users" striped>
        <template #header>
            <td>Пользователь</td>
            <td class="center">Тариф</td>
            <td class="center">Баланс</td>
            <td class="center">Роль</td>
            <td class="center">Дата регистрации</td>
            <td></td>
        </template>
        <template #row="{ row }">
            <td>{{ row.username }}</td>
            <td class="center">{{ row.plan }}</td>
            <td class="center">{{ row.balance }}</td>
            <td class="center">{{ row.role }}</td>
            <td class="center">{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                    @click="deleteUser(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td class="center"></td>
            <td class="center">{{ totalBalance }}</td>
            <td class="center"></td>
            <td class="center"></td>
            <td></td>
        </template>
    </STable>
</div>

```vue
<template>
<STable :data="users" striped>
    <!-- ... -->
</STable>
</template>
```

## Фиксированная шапка

Чтобы зафиксировать шапку, устанавливаем высоту таблицы в атрибуте `height`.

<div class="docs-container">
    <div class="table-container">
        <STable :data="users10" height="300px">
            <template #header>
                <td>Пользователь</td>
                <td class="center">Имя</td>
                <td class="center">Фамилия</td>
                <td class="center">Дата рождения</td>
                <td class="center">Рост</td>
                <td class="center">Вес</td>
                <td class="center">Тариф</td>
                <td class="center">Баланс</td>
                <td class="center">Роль</td>
                <td class="center">Дата регистрации</td>
                <td></td>
            </template>
            <template #row="{ row }">
                <td>{{ row.username }}</td>
                <td class="center">{{ row.name }}</td>
                <td class="center">{{ row.secondname }}</td>
                <td class="center">{{ row.birthdate }}</td>
                <td class="center">{{ row.height }}</td>
                <td class="center">{{ row.weight }}</td>
                <td class="center">{{ row.plan }}</td>
                <td class="center">{{ row.balance }}</td>
                <td class="center">{{ row.role }}</td>
                <td class="center">{{ row.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                        @click="deleteUser(row.username)" icon="trash" danger />
                </td>
            </template>
            <template #footer>
                <td>ИТОГО</td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center">{{ totalBalance }}</td>
                <td class="center"></td>
                <td class="center"></td>
                <td></td>
            </template>
        </STable>
    </div>
</div>

```vue
<template>
<STable :data="users" height="300px">
    <template #header>
        <td>Пользователь</td>
        <td class="center">Имя</td>
        <td class="center">Фамилия</td>
        <td class="center">Дата рождения</td>
        <td class="center">Рост</td>
        <td class="center">Вес</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td class="center">{{ row.name }}</td>
        <td class="center">{{ row.secondname }}</td>
        <td class="center">{{ row.birthdate }}</td>
        <td class="center">{{ row.height }}</td>
        <td class="center">{{ row.weight }}</td>
        <td class="center">{{ row.plan }}</td>
        <td class="center">{{ row.balance }}</td>
        <td class="center">{{ row.role }}</td>
        <td class="center">{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center">{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</template>

<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

function deleteUser(username) {
    // ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```

<SNote icon="lightbulb" attention>
Для высоты таблицы с фиксированной шапкой удобно использовать <code>80vh</code>, чтобы таблица занимала 80% от высоты экрана.
</SNote>

## Горизонтальный скролл сверху

<div class="docs-container">
    <div class="table-container">
        <STable :data="users2" top-scroll>
            <template #header>
                <td>Пользователь</td>
                <td class="center">Имя</td>
                <td class="center">Фамилия</td>
                <td class="center">Дата рождения</td>
                <td class="center">Рост</td>
                <td class="center">Вес</td>
                <td class="center">Тариф</td>
                <td class="center">Баланс</td>
                <td class="center">Роль</td>
                <td class="center">Дата регистрации</td>
                <td></td>
            </template>
            <template #row="{ row }">
                <td>{{ row.username }}</td>
                <td class="center">{{ row.name }}</td>
                <td class="center">{{ row.secondname }}</td>
                <td class="center">{{ row.birthdate }}</td>
                <td class="center">{{ row.height }}</td>
                <td class="center">{{ row.weight }}</td>
                <td class="center">{{ row.plan }}</td>
                <td class="center">{{ row.balance }}</td>
                <td class="center">{{ row.role }}</td>
                <td class="center">{{ row.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                        @click="deleteUser(row.username)" icon="trash" danger />
                </td>
            </template>
            <template #footer>
                <td>ИТОГО</td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center">{{ totalBalance }}</td>
                <td class="center"></td>
                <td class="center"></td>
                <td></td>
            </template>
        </STable>
    </div>
</div>

```vue
<template>
<STable :data="users" top-scroll>
    <!-- ... -->
</STable>
</template>
```

## Кастомный контент внутри tbody

Если нужно задать явные строки в tbody вместо перебора #row, то используем дефолтный слот (в нем для отдельных строк нужно явно указать `<tr>`).

<div class="docs-container">
<STable>
    <template #header>
        <td>Пользователь</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
        <tr v-for="user_item in users" :key="user_item.username">
            <td>{{ user_item.username }}</td>
            <td class="center">{{ user_item.plan }}</td>
            <td class="center">{{ user_item.balance }}</td>
            <td class="center">{{ user_item.role }}</td>
            <td class="center">{{ user_item.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${user_item.username}»?`" 
                    @click="deleteUser(user_item.username)" icon="trash" danger />
            </td>
        </tr>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</div>

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
    // ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
</script>
```

## Несколько строк в header / footer

Если это нужно, просто используем отдельные слоты headers / footers (добавляется в конце “s”), в которые уже добавляем `<tr>`.

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

<div class="docs-container">
<STable :data="users3" nodata="Пользователи не найдены">
    <template #header>
        <td>Пользователь</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td class="center">{{ row.plan }}</td>
        <td class="center">{{ row.balance }}</td>
        <td class="center">{{ row.role }}</td>
        <td class="center">{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</div>

```vue
<template>
<STable :data="users" nodata="Пользователи не найдены">
    <!-- ... -->
</STable>
</template>
```

или

<div class="docs-container">
<STable :data="users3">
    <template #header>
        <td>Пользователь</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
    <template #nodata>
        <SNote>По заданным критериям поиска ничего не нашлось</SNote>
    </template>
    <template #row="{ row }">
        <td>{{ row.username }}</td>
        <td class="center">{{ row.plan }}</td>
        <td class="center">{{ row.balance }}</td>
        <td class="center">{{ row.role }}</td>
        <td class="center">{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${row.username}»?`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</div>

```vue
<template>
<STable :data="users">
    <template #nodata>
        <SNote>По заданным критериям поиска ничего не нашлось</SNote>
    </template>
</STable>
</template>
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

<script setup>
import { ref, computed } from 'vue';
import SNote from '../../../../packages/startup-ui/src/components/SNote.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STable from '../../../../packages/startup-ui/src/components/STable.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';

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

const users10 =  ref([ 
    ...users2.value,
    ...users2.value,
    ...users2.value
]);
</script>

<style lang="scss">
.vp-doc table {
    overflow-x: visible;
}

.vp-doc td {
    border: none;
}

.vp-doc .s-table tbody tr:nth-child(2n) {
    background-color: transparent;
}

.vp-doc table h3 {
    margin: 0;
}

.docs-container .s-table,
.docs-container .s-table table {
    margin: 0 !important;
}
.docs-container .s-table tr {
    border-top: 0 !important;
}
.docs-container .s-table tr {
    background-color: transparent;
}
.docs-container .s-table td {
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