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

```vue
<template>
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
</template>

<script setup>
function greet(msg) {
    alert(msg)
}
</script>
```

## Ссылка в иконке

Если указать href-атрибут, то по умолчанию иконка станет анкором:

```vue
<template>
    <SActionIcon icon="pen-to-square" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon :icon="['far', 'calendar']" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="xmark" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="arrow-up-right-from-square" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="circle-question" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="copy" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="bars" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="cloud-arrow-down" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="folder-open" title="Перейти на сайт" href="https://startup-ui.ru" />
    <SActionIcon icon="user" title="Перейти на сайт" href="https://startup-ui.ru" />
</template>

<script setup>
import { SActionIcon } from 'startup-ui'
</script>
```

Но при необходимости также через атрибут is можно также передать Link-компонент InertiaJs:

```vue
<template>
    <SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="/users/" />
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
```

## Подтверждение действия

Для небезопасных действий выделяем иконку цветом (атрибут <strong>danger</strong>) и запрашиваем подтверждение перед выполнением (атрибут <strong>confirm</strong>):

```vue
<template>
    <SActionIcon title="Удалить" @click="deleteUser" icon="trash" danger
        confirm="Вы действительно хотите удалить пользователя?" />
</template>

<script setup>
function deleteUser() {
    alert('Пользователь удален (эмуляция)')
}
</script>
```

Подписи и цвет кнопок диалога настраиваются через `confirm-options` (пробрасываются в `SConfirm`):

```vue
<SActionIcon
    icon="trash"
    confirm="Удалить запись?"
    :confirm-options="{ acceptLabel: 'Удалить', variant: 'danger' }"
    @click="remove"
/>
```

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| icon | string \| string[] | required | Имя иконки FontAwesome (например, `'trash'` или `['far', 'calendar']`) |
| danger | boolean | false | Выделяет иконку красным цветом |
| confirm | string | undefined | Текст диалога подтверждения перед выполнением `@click` |
| confirmTitle | string | 'Необходимо подтверждение' | Заголовок диалога подтверждения |
| confirmOptions | object | undefined | Опции, пробрасываемые в `SConfirm.open` (`acceptLabel`, `cancelLabel`, `variant`, …) |
| is | string \| Component | undefined | HTML-элемент или Vue-компонент для рендеринга (например, InertiaJS `Link`) |
| href | string | undefined | URL для перехода (делает иконку ссылкой) |
| title | string | undefined | Текст подсказки при наведении |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| click | none | Вызывается при клике на иконку. Срабатывает ПОСЛЕ подтверждения, если передан параметр `confirm`. |

<style lang="scss" scoped>
a {
    color: var(--s-primary);
}
</style>
