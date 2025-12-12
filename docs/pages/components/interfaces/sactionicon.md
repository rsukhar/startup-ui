# SActionIcon

Иконка действия (чаще всего используется в таблицах).

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Привязка к FontAwesome, который бесплатен и оптимально решает задачи иконок для стартапов.</li>
        <li>Упрощает запрос подтверждения перед опасными действиями (напр.удаление) с помощью одного атрибута.</li>
    </ol>
</SToggle>

## Стандартный пример

Используются стандартые иконки FontAwesome. Типовой пример с click-событием:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon :icon="['far', 'calendar']" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="xmark" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="arrow-up-right-from-square" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="circle-question" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="copy" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="bars" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="cloud-arrow-down" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="folder-open" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon icon="user" title="Редактировать" @click="greet('Hello!')" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Ссылка в иконке

Если указать href-атрибут, то по умолчанию иконка станет анкором:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SActionIcon icon="pen-to-square" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon :icon="['far', 'calendar']" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="xmark" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="arrow-up-right-from-square" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="circle-question" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="copy" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="bars" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="cloud-arrow-down" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="folder-open" title="Перейти на сайт" href="https://suhar.ru" />
    <SActionIcon icon="user" title="Перейти на сайт" href="https://suhar.ru" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

Но при необходимости также через атрибут is можно также передать Link-компонент InertiaJs:

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Подтверждение действия

Для небезопасных действий выделяем иконку цветом (атрибут <strong>danger</strong>) и запрашиваем подтверждение перед выполнением (атрибут <strong>confirm</strong>):
<div class="docs-container">
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="Вы действительно хотите удалить пользователя?" />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

function greet(msg) {
  alert(msg)
}

const user = {
    username: 'User'
};

function deleteUser() {

}

const code1 = `<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon :icon="['far', 'calendar']" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="xmark" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="arrow-up-right-from-square" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="circle-question" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="copy" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="bars" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="cloud-arrow-down" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="folder-open" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="user" title="Редактировать" @click="greet('Hello!')" />`;

const fullCode1 = `<template>
<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon :icon="['far', 'calendar']" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="xmark" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="arrow-up-right-from-square" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="circle-question" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="copy" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="bars" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="cloud-arrow-down" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="folder-open" title="Редактировать" @click="greet('Hello!')" />
<SActionIcon icon="user" title="Редактировать" @click="greet('Hello!')" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';

function greet(msg) {
  alert(msg)
}
<\/script>`;

const code2 = `<SActionIcon icon="pen-to-square" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon :icon="['far', 'calendar']" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="xmark" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="arrow-up-right-from-square" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="circle-question" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="copy" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="bars" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="cloud-arrow-down" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="folder-open" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="user" title="Перейти на сайт" href="https://suhar.ru" />`;

const fullCode2 = `<template>
<SActionIcon icon="pen-to-square" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon :icon="['far', 'calendar']" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="xmark" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="arrow-up-right-from-square" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="circle-question" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="copy" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="bars" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="cloud-arrow-down" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="folder-open" title="Перейти на сайт" href="https://suhar.ru" />
<SActionIcon icon="user" title="Перейти на сайт" href="https://suhar.ru" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';
<\/script>`;

const code3 = `<SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="/users/" />`;

const fullCode3 = `<template>
<SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="/users/" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';
<\/script>`;

const code4 = `<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger
    confirm="Вы действительно хотите удалить пользователя?" />`;

const fullCode4 = `<template>
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger
    confirm="Вы действительно хотите удалить пользователя?" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';

function deleteUser() {
    ...
}
<\/script>`;
</script>
<style lang="scss" scoped>
a {
    color: var(--s-primary);
}
</style>