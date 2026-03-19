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
        <SDropdownMenu placeholder="Админка" :links="adminLinks" labelLink="/admin" />
    </div>
</div>

```vue
<template>
    <div class="menu-container">
        <SDropdownMenu placeholder="Админка" :links="adminLinks" labelLink="/admin" />
    </div>
</template>

<script setup>
import { SDropdownMenu } from 'startup-ui';

const adminLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#' }
];
</script>

<style scoped>
.menu-container {
    display: flex;
    max-width: 200px;
    line-height: 60px;
    background-color: transparent;
}
</style>
```

Где links — это массив в формате `[{label, url, active}, ...]`
В атрибут "placeholder" подставляем текст, который выводится в лейбле, когда ни одна из ссылок не активна.

## Фиксированный лейбл

По умолчанию, в лейбле выводится текст активной ссылки, а если ни одна из ссылок не активна, то плейсхолдер.

Когда нужно выводить фиксированный лейбл, то задаем его одноименным атрибутом `label`. При этом, если на нем должна быть ссылка, используем атрибут `labelLink`:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
    </div>
</div>

```vue
<template>
    <SDropdownMenu label="Админка" label-link="/admin/" :links="adminLinks" />
</template>
```

Когда нужно задать кастомный лейбл, используем одноименный слот `label`, при этом ссылку с лейбла также задаем через атрибут `labelLink`:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu :links="adminLinks" label-link="/users/admin/">
            <template #label>
                <span class="userblock">
                    <FontAwesomeIcon icon="circle-user" />
                    <span>Admin</span>
                </span>
            </template>
        </SDropdownMenu>
    </div>
</div>

```vue
<template>
    <SDropdownMenu :links="adminLinks" :label-link="`/users/${authUser.username}/`">
        <template #label>
            <span class="userblock">
                <FontAwesomeIcon icon="circle-user" />
                <span>{{ authUser.username }}</span>
            </span>
        </template>
    </SDropdownMenu>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SDropdownMenu } from 'startup-ui';

const authUser = { username: 'Admin' };
const adminLinks = [ /* ... */ ];
</script>

<style scoped>
.userblock {
    display: flex;
    gap: 10px;
    line-height: inherit;
    align-items: center;
}
</style>
```

## Задаем ссылки вручную

При желании можно задать ссылки не через links-атрибут, а через слот:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Помощь">
            <a href="/docs/">Документация</a>
            <a href=".." target="_blank">Телеграм-группа</a>
        </SDropdownMenu>
    </div>
</div>

```vue
<template>
    <SDropdownMenu label="Помощь">
        <a href="/docs/">Документация</a>
        <a href=".." target="_blank">Телеграм-группа</a>
    </SDropdownMenu>
</template>
```

Также можно использовать комбинированный вариант, когда часть ссылок задается атрибутом, а часть — через слот:

<div class="docs-container">
    <div class="menu-container">
        <SDropdownMenu label="Помощь" :links="helpLinks">
            <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
        </SDropdownMenu>
    </div>
</div>

```vue
<template>
    <SDropdownMenu label="Помощь" :links="helpLinks">
        <a href="mailto:support@pfpult.ru">Написать в техподдержку</a>
    </SDropdownMenu>
</template>

<script setup>
import { SDropdownMenu } from 'startup-ui';

const helpLinks = [
    { label: 'Чат', url: '#', active: true }
];
</script>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| links | `SDropdownMenuLink[]` | `[]` | Массив ссылок в формате `{ label, url, active }`. Используется для автогенерации элементов меню. |
| placeholder | string | `'Перейти к'` | Текст, отображаемый на лейбле, если не задано свойство `label`, не передан слот `#label` и нет активной ссылки. |
| label | string | `undefined` | Статический текст для лейбла. Если передано, переопределяет текст `placeholder` и активной ссылки. |
| labelLink | string | `undefined` | URL для клика по самому лейблу меню. Если передано, область лейбла работает как навигационная ссылка Inertia. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Кастомное содержимое для выпадающего списка. Помещается после элементов массива `links` (если они есть). |
| label | Кастомное содержимое для области лейбла выпадающего списка. Отрабатывает с высшим приоритетом при рендеринге лейбла (игнорируя свойства `label`, `placeholder` и текст активной ссылки). |

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SDropdownMenu from '../../../../packages/startup-ui/src/components/SDropdownMenu.vue';

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