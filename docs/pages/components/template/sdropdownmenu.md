# SDropdownMenu

Выпадающий список из навигационных ссылок. Выводит текст активного элемента, а если его нет, то выводит текст плейсхолдера.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Выводит в лейбле текущий активный элемент, что позволяет, например, реализовать переключение между проектами.</li>
            <li>Поддерживает интеграцию с InertiaJS для бесшовного роутинга между страницами.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Стрелочку отвязать от FontAwesome, чтобы снизить связанность.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu placeholder="Админка" :links="adminLinks" />
    </div>
</div>

<CustomCodeBlock :code="{text: code1, lang: 'vue'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

Где links — это массив в формате `[{label, url, active}, ...]`
В атрибут “placeholder” подставляем текст, который выводится в лейбле, когда ни одна из ссылок не активна.

## Фиксированный лейбл

По умолчанию, в лейбле выводится текст активной ссылки, а если ни одна из ссылок не активна, то плейсхолдер.

Когда нужно выводить фиксированный лейбл, то задаем его одноименным атрибутом `label`. При этом, если на нем должна быть ссылка, используем атрибут `labelLink`:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
    </div>
</div>

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

Когда нужно задать кастомный лейбл, используем одноименный слот `label`, при этом ссылку с лейбла также задаем через атрибут `labelLink`:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu :links="adminLinks" label-link="#">
            <template #label>
                <span class="userblock">
                    <FontAwesomeIcon icon="user" />
                    <span>Admin</span>
                </span>
            </template>
        </SDropdownMenu>
    </div>
</div>

<CustomCodeBlock :code="{text: code3, lang: 'html'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

## Задаем ссылки вручную

При желании можно задать ссылки не через links-атрибут, а через слот:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Помощь">
            <a href="#">Документация</a>
            <a href="#" target="_blank">Телеграм-группа</a>
        </SDropdownMenu>
    </div>
</div>

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

Также можно использовать комбинированный вариант, когда часть ссылок задается атрибутом, а часть — через слот:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Помощь" :links="helpLinks" labelLink="#">
            <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
        </SDropdownMenu>
    </div>
</div>

<CustomCodeBlock :code="{text: code5, lang: 'html'}" :fullCode="{text: fullCode5, lang: 'vue'}"/>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SDropdownMenu from '../../../../packages/startup-ui/src/components/SDropdownMenu.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const adminLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#' }
];

const helpLinks = [
    { label: 'Чат', url: '#' }
];

const code1 = `<SDropdownMenu placeholder="Админка" :links="adminLinks" labelLink="/admin" />
`;
const fullCode1 = `<template>
    <SDropdownMenu placeholder="Админка" :links="adminLinks" labelLink="/admin" />
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
<\/script>
`;

const code2 = `<SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
`;
const fullCode2 = `<template>
    <SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
<\/script>
`;

const code3 = `<SDropdownMenu :links="adminLinks" :label-link="\/users/\${authUser.username}/\`">
    <template #label>
        <span class="userblock">
            <FontAwesomeIcon icon="circle-user" />
            <span>\{{ authUser.username }}</span>
        </span>
    </template>
</SDropdownMenu>
`;
const fullCode3 = `<template>
    <SDropdownMenu :links="adminLinks" :label-link="\`/users/\${authUser.username}/\`">
        <template #label>
            <span class="userblock">
                <FontAwesomeIcon icon="circle-user" />
                <span>\{{ authUser.username }}</span>
            </span>
        </template>
    </SDropdownMenu>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SDropdownMenu } from 'startup-ui';
<\/script>
`;

const code4 = `<SDropdownMenu label="Помощь">
    <a href="/docs/">Документация</a>
    <a href=".." target="_blank">Телеграм-группа</a>
</SDropdownMenu>
`;
const fullCode4 = `<template>
    <SDropdownMenu label="Помощь">
        <a href="/docs/">Документация</a>
        <a href=".." target="_blank">Телеграм-группа</a>
    </SDropdownMenu>
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
<\/script>
`;

const code5 = `<SDropdownMenu label="Помощь" :links="helpLinks">
    <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
</SDropdownMenu>
`;
const fullCode5 = `<template>
    <SDropdownMenu label="Помощь" :links="helpLinks">
        <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
    </SDropdownMenu>
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';

const helpLinks = [
    { label: 'Чат', url: '#', active: true }
];
<\/script>
`;
</script>


<style lang="scss" scoped>
.menu-container {
    display: flex;
    max-width: 200px;
    line-height: 60px;
    background-color: transparent;
}

.userblock {
    display: flex;
    gap: 10px;
    height: 60px;
    line-height: 60px;
    align-items: center;
    svg {
        font-size: 16px;
    }
    @include mobile(){
        height: auto;
        line-height: unset;
        svg {
            display: none;
        }
    }
}
</style>