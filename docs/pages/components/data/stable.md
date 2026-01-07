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

<CustomCodeBlock :code="{text: code1, lang: 'html'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code10, lang: 'vue'}" :fullCode="{text: fullCode10, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

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
        <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td class="center">{{ user.plan }}</td>
            <td class="center">{{ user.balance }}</td>
            <td class="center">{{ user.role }}</td>
            <td class="center">{{ user.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="`Вы действительно хотите удалить пользователя «${user.username}»?`" 
                    @click="deleteUser(user.username)" icon="trash" danger />
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

<CustomCodeBlock :code="{text: code6, lang: 'html'}" :fullCode="{text: fullCode6, lang: 'vue'}" />

## Несколько строк в header / footer

Если это нужно, просто используем отдельные слоты headers / footers (добавляется в конце “s”), в которые уже добавляем `<tr>`.

<CustomCodeBlock :code="{text: code7, lang: 'html'}" />

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

<CustomCodeBlock :code="{text: code8, lang: 'vue'}" :fullCode="{text: fullCode8, lang: 'vue'}"/>

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

<CustomCodeBlock :code="{text: code9, lang: 'html'}" :fullCode="{text: fullCode9, lang: 'vue'}"/>

<script setup>
import { ref, computed } from 'vue';
import SNote from '../../../../packages/startup-ui/src/components/SNote.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STable from '../../../../packages/startup-ui/src/components/STable.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

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

const code1 = `<STable :data="users">
    <template #header>
        <td>Пользователь</td>
        <td class="center">Тариф</td>
        <td class="center">Баланс</td>
        <td class="center">Роль</td>
        <td class="center">Дата регистрации</td>
        <td></td>
    </template>
    <template #row="{ row }">
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">\{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
`;
const fullCode1 = `<template>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">\{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable, SActionIcon } from 'startup-ui';

const users =  ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }
]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
<\/script>
`;

const code2 = `<STable :data="users" hoverable>
    ...
</STable>
`;
const fullCode2 = `<template>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">\{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

const users =  ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" },
    { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" },
    { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }
]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
<\/script>
`;

const code3 = `<STable :data="users" bordered>
    ...
</STable>
`;
const fullCode3 = `<template>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">\{{ totalBalance }}</td>
        <td class="center"></td>
        <td class="center"></td>
        <td></td>
    </template>
</STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable } from 'startup-ui';

const users =  ref([ 
    { "username": "Ivanov", "role": "customer", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", "role": "customer", "plan": "Базовый", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", "role": "customer", "plan": "Базовый", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", "role": "customer", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", "role": "customer", "plan": "Базовый", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }
]);

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
<\/script>
`;

const code4 = `<STable :data="users" striped>
   ...
</STable>
`;
const fullCode4 = `<template>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td class="center"></td>
        <td class="center">\{{ totalBalance }}</td>
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
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
<\/script>`;

const code5 = `<STable :data="users" top-scroll>
    ...
</STable>`;
const fullCode5 = `<template>
<STable :data="users" top-scroll>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.name }}</td>
        <td class="center">\{{ row.secondname }}</td>
        <td class="center">\{{ row.birthdate }}</td>
        <td class="center">\{{ row.height }}</td>
        <td class="center">\{{ row.weight }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser2(row.username)" icon="trash" danger />
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
        <td class="center">\{{ totalBalance2 }}</td>
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
<\/script>`;

const code6 = `<STable>
    <template #header>
        <td>...</td>
    </template>
    <template>
        <tr><td>...</td></tr>
    </template>
    <template #footer>
        <td>...</td>
    </template>
</STable>
`;
const fullCode6 = `<template>
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
                <td>\{{ user.username }}</td>
                <td>\{{ user.plan }}</td>
                <td>\{{ user.balance }}</td>
                <td>\{{ user.role }}</td>
                <td>\{{ user.created_at }}</td>
                <td class="right">
                    <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${user.username}»?\`" 
                        @click="deleteUser(user.username)" icon="trash" danger />
                </td>
            </tr>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>\{{ totalBalance }}</td>
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
<\/script>`;

const code7 = `<STable>
    <template #headers>
        <tr><td>...</td></tr>
        <tr><td>...</td></tr>
    </template>
    ...
    <template #footers>
        <tr><td>...</td></tr>
        <tr><td>...</td></tr>
    </template>
</STable>`;

const code8 = `<STable :data="users" nodata="Пользователи не найдены">
    ...
</STable>`;

const fullCode8 = `<template>
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
            <td>\{{ row.username }}</td>
            <td>\{{ row.plan }}</td>
            <td>\{{ row.balance }}</td>
            <td>\{{ row.role }}</td>
            <td>\{{ row.created_at }}</td>
            <td class="right">
                <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                    @click="deleteUser2(row.username)" icon="trash" danger />
            </td>
        </template>
        <template #footer>
            <td>ИТОГО</td>
            <td></td>
            <td>\{{ totalBalance2 }}</td>
            <td></td>
            <td></td>
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
<\/script>
`;

const code9 = `<STable :data="users">
    <template #nodata>
        <SNote>По заданным критериям поиска ничего не нашлось</SNote>
    </template>
    ...
</STable>
`;

const fullCode9 = `<template>
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
        <td>\{{ row.username }}</td>
        <td>\{{ row.plan }}</td>
        <td>\{{ row.balance }}</td>
        <td>\{{ row.role }}</td>
        <td>\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser2(row.username)" icon="trash" danger />
        </td>
    </template>
    <template #footer>
        <td>ИТОГО</td>
        <td></td>
        <td>\{{ totalBalance2 }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </template>
</STable>
</template>
<script setup>
import { ref, computed } from 'vue'; 
import { STable, SNote } from 'startup-ui';

function deleteUser(username) {
    ...
}

const totalBalance = computed(() => users.value.reduce((acc, user) => acc + user.balance, 0));
<\/script>`;


const users10 =  ref([ 
    { "username": "Ivanov", 'name': 'Иван', 'secondname': 'Иванов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", 'name': 'Степан', 'secondname': 'Степанов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Админ", "plan": "-", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", 'name': 'Петр', 'secondname': 'Петров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Премиум", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", 'name': 'Сергей', 'secondname': 'Сидоров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", 'name': 'Алексей', 'secondname': 'Алексеев', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Редактор", "plan": "-", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" },
    { "username": "Ivanov", 'name': 'Иван', 'secondname': 'Иванов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", 'name': 'Степан', 'secondname': 'Степанов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Админ", "plan": "-", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", 'name': 'Петр', 'secondname': 'Петров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Премиум", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", 'name': 'Сергей', 'secondname': 'Сидоров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", 'name': 'Алексей', 'secondname': 'Алексеев', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Редактор", "plan": "-", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" },
    { "username": "Ivanov", 'name': 'Иван', 'secondname': 'Иванов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 3000, "projects_count": 1, "created_at": "2025-11-04" }, 
    { "username": "Stepanov", 'name': 'Степан', 'secondname': 'Степанов', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Админ", "plan": "-", "balance": 4500, "projects_count": 0, "created_at": "2025-11-05" }, 
    { "username": "Petrov", 'name': 'Петр', 'secondname': 'Петров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Премиум", "balance": 1716, "projects_count": 2, "created_at": "2025-11-05" }, 
    { "username": "Sidorov", 'name': 'Сергей', 'secondname': 'Сидоров', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Пользователь", "plan": "Базовый", "balance": 6000, "projects_count": 1, "created_at": "2025-11-06" }, 
    { "username": "Alexeev", 'name': 'Алексей', 'secondname': 'Алексеев', 'birthdate': '1995.06.06', 'height': '175', 'weight': '80', "role": "Редактор", "plan": "-", "balance": 2000, "projects_count": 1, "created_at": "2025-11-09" }]);

const code10 = `<STable :data="users" height="300px">
    ...
</STable>`;
const fullCode10 = `<template>
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
        <td>\{{ row.username }}</td>
        <td class="center">\{{ row.name }}</td>
        <td class="center">\{{ row.secondname }}</td>
        <td class="center">\{{ row.birthdate }}</td>
        <td class="center">\{{ row.height }}</td>
        <td class="center">\{{ row.weight }}</td>
        <td class="center">\{{ row.plan }}</td>
        <td class="center">\{{ row.balance }}</td>
        <td class="center">\{{ row.role }}</td>
        <td class="center">\{{ row.created_at }}</td>
        <td class="right">
            <SActionIcon title="Удалить" :confirm="\`Вы действительно хотите удалить пользователя «\${row.username}»?\`" 
                @click="deleteUser2(row.username)" icon="trash" danger />
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
        <td class="center">\{{ totalBalance2 }}</td>
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
<\/script>`;

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

.docs-container .s-table,
.docs-container .s-table table {
    margin: 0 !important;
}
.docs-container .s-table tr {
    border-top: 0 !important;
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