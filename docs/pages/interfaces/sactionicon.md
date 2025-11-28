# SActionIcon

Иконка действия (чаще всего используется в таблицах).

## Стандартный пример

Используются стандартые иконки FontAwesome. Типовой пример с click-событием:

<div class="docs-container">
<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

## Ссылка в иконке

Если указать href-атрибут, то по умолчанию иконка станет анкором:
<div class="docs-container">
<SActionIcon icon="pen-to-square" title="Редактировать" href="https://suhar.ru" />
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

Но при необходимости также через атрибут is можно также передать Link-компонент InertiaJs:

<CustomCodeBlock :code="{text: code3, lang: 'vue'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

## Подтверждение действия

Для небезопасных действий выделяем иконку цветом (атрибут danger) и запрашиваем подтверждение перед выполнением (атрибут confirm):
<div class="docs-container">
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="`Вы действительно хотите удалить пользователя?`" />
</div>

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

<script setup>
import SActionIcon from '../../../packages/startup-ui/src/components/SActionIcon.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

function greet(msg) {
  alert(msg)
}

const user = {
    username: 'User'
};

function deleteUser() {

}

const code1 = `
<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
`;

const fullCode1 = `
<template>
<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';

function greet(msg) {
  alert(msg)
}
<\/script>
`;

const code2 = `
<SActionIcon icon="pen-to-square" title="Редактировать" href="https://suhar.ru" />
`;

const fullCode2 = `
<template>
<SActionIcon icon="pen-to-square" title="Редактировать" href="https://suhar.ru" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';
<\/script>
`;

const code3 = `
<SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="https://suhar.ru" />
`;

const fullCode3 = `
<template>
<SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="https://suhar.ru" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';
<\/script>
`;

const code4 = `
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="\`Вы действительно хотите удалить пользователя?\`" />
`;

const fullCode4 = `
<template>
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="\`Вы действительно хотите удалить пользователя?\`" />
</template>
<script setup>
import { SActionIcon } from 'startup-ui';

function deleteUser() {
    ...
}
<\/script>
`;
</script>