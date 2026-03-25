# SActionIcon

Иконка действия (чаще всего используется в таблицах).

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Привязка к FontAwesome, который бесплатен и оптимально решает задачи иконок для стартапов.</li>
        <li>Упрощает запрос подтверждения перед опасными действиями (напр. удаление) с помощью одного атрибута.</li>
    </ol>
</SToggle>

## Стандартный пример

Используются стандартые иконки FontAwesome. Типовой пример с click-событием:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
    <SActionIcon :icon="['far', 'calendar']" title="Календарь" @click="greet('Hello!')" />
    <SActionIcon icon="xmark" title="Закрыть" @click="greet('Hello!')" />
    <SActionIcon icon="arrow-up-right-from-square" title="Открыть" @click="greet('Hello!')" />
    <SActionIcon icon="circle-question" title="Помощь" @click="greet('Hello!')" />
    <SActionIcon icon="copy" title="Копировать" @click="greet('Hello!')" />
    <SActionIcon icon="bars" title="Меню" @click="greet('Hello!')" />
    <SActionIcon icon="cloud-arrow-down" title="Скачать" @click="greet('Hello!')" />
    <SActionIcon icon="folder-open" title="Открыть папку" @click="greet('Hello!')" />
    <SActionIcon icon="user" title="Профиль" @click="greet('Hello!')" />
</div>

:::code-group
```vue [Пример]
<template>
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
```
```vue [Весь код]
<template>
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
</script>
```
:::

## Ссылка в иконке

Если указать href-атрибут, то по умолчанию иконка станет анкором:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SActionIcon icon="pen-to-square" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon :icon="['far', 'calendar']" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="xmark" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="arrow-up-right-from-square" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="circle-question" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="copy" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="bars" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="cloud-arrow-down" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="folder-open" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
    <SActionIcon icon="user" title="Перейти на сайт" href="https://startup-ui.suhar.ru" />
</div>

:::code-group
```vue [Пример]
<template>
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
```
```vue [Весь код]
<template>
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
</script>
```
:::

Но при необходимости также через атрибут is можно также передать Link-компонент InertiaJs:

:::code-group
```vue [Пример]
<template>
    <SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="/users/" />
</template>
```
```vue [Весь код]
<template>
    <SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="/users/" />
</template>

<script setup>
import { SActionIcon } from 'startup-ui';
</script>
```
:::

## Подтверждение действия

Для небезопасных действий выделяем иконку цветом (атрибут <strong>danger</strong>) и запрашиваем подтверждение перед выполнением (атрибут <strong>confirm</strong>):

<div class="docs-container">
    <SActionIcon title="Удалить" @click="deleteUser" icon="trash" danger confirm="Вы действительно хотите удалить пользователя?" />
</div>

:::code-group
```vue [Пример]
<template>
    <SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger
        confirm="Вы действительно хотите удалить пользователя?" />
</template>
```
```vue [Весь код]
<template>
    <SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger
        confirm="Вы действительно хотите удалить пользователя?" />
</template>

<script setup>
import { SActionIcon } from 'startup-ui';

function deleteUser() {
    ...
}
</script>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| icon | string \| string[] | required | Имя иконки FontAwesome (например, `'trash'` или `['far', 'calendar']`) |
| danger | boolean | false | Выделяет иконку красным цветом |
| confirm | string | undefined | Текст диалога подтверждения перед выполнением `@click` |
| confirmTitle | string | 'Необходимо подтверждение' | Заголовок диалога подтверждения |
| is | string \| Component | undefined | HTML-элемент или Vue-компонент для рендеринга (например, InertiaJS `Link`) |
| href | string | undefined | URL для перехода (делает иконку ссылкой) |
| title | string | undefined | Текст подсказки при наведении |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| click | none | Вызывается при клике на иконку. Срабатывает ПОСЛЕ подтверждения, если передан параметр `confirm`. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SActionIcon from '../../../../packages/startup-ui/src/components/SActionIcon.vue';
import { Link } from '@inertiajs/vue3';

function greet(msg) {
  alert(msg)
}

function deleteUser() {
  alert('Пользователь удален (эмуляция)');
}
</script>

<style lang="scss" scoped>
a {
    color: var(--s-primary);
}
</style>
