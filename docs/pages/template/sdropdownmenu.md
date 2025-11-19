# SDropdownMenu

Выпадающий список из навигационных ссылок. Выводит текст активного элемента, а если его нет, то выводит текст плейсхолдера.

## Базовый пример

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu placeholder="Админка" :links="adminLinks" />
    </div>
</div>

::: details Показать код
``` js
<template>
    <SDropdownMenu placeholder="Админка" :links="adminLinks" labelLink="/admin" />
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
</script>
```
:::

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

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
    </div>
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
</script>
```
:::

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

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SDropdownMenu :links="adminLinks" :label-link="`/users/${authUser.username}/`">
            <template #label>
                <span class="userblock">
                    <FontAwesomeIcon icon="circle-user" />
                    <span>{{ authUser.username }}</span>
                </span>
            </template>
        </SDropdownMenu>
    </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SDropdownMenu } from 'startup-ui';
</script>
```
:::

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

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SDropdownMenu label="Помощь">
            <a href="/docs/">Документация</a>
            <a href=".." target="_blank">Телеграм-группа</a>
        </SDropdownMenu>
    </div>
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';
</script>
```
:::

Также можно использовать комбинированный вариант, когда часть ссылок задается атрибутом, а часть — через слот:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Помощь" :links="helpLinks" labelLink="#">
            <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
        </SDropdownMenu>
    </div>
</div>

::: details Показать код
``` js
<template>
    <div class="menu-container">
        <SDropdownMenu label="Помощь" :links="helpLinks">
            <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
        </SDropdownMenu>
    </div>
</template>
<script setup>
import { SDropdownMenu } from 'startup-ui';

const helpLinks = [
    { label: 'Чат', url: '#', active: true }
];
</script>
```
:::

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SDropdownMenu from '../../../packages/startup-ui/src/components/SDropdownMenu.vue';

const adminLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#' }
];

const helpLinks = [
    { label: 'Чат', url: '#' }
];
</script>


<style lang="scss" scoped>
.menu-container {
    display: flex;
    max-width: 200px;
    line-height: 60px;
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