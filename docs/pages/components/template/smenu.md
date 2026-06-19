# SMenu

Горизонтальное меню с выпадающими подменю. Подходит для шапки (`header`) и подшапки (`subheader`) — объединяет в одном компоненте плоскую навигацию и дропдауны.

Меню рассчитано на тёмную полосу (как `subheader`), поэтому в примерах ниже оно обёрнуто в контейнер с фоном `--s-bg-subheader`.

## Базовый пример

Пункт с массивом `children` раскрывает выпадающее подменю при наведении. Активный пункт отмечается «уголком».

:::demo
```vue
<template>
    <div style="background: var(--s-bg-subheader); color: var(--s-white); padding: 0 1rem; border-radius: var(--s-border-radius)">
        <SMenu :items="items" />
    </div>
</template>

<script setup>
import { SMenu } from 'startup-ui'

const items = [
    { label: 'Главная', url: '/', active: true },
    { label: 'Проекты', url: '/projects' },
    { label: 'Помощь', url: '/help' },
    {
        label: 'Аккаунт',
        children: [
            { label: 'Профиль', url: '/profile' },
            { label: 'Настройки', url: '/settings' },
            { label: 'Выйти', url: '/logout', method: 'post' },
        ],
    },
]
</script>
```
```vue
<SMenu :items="items" />
```
:::

## Иконки, счётчики и аватары

У пунктов могут быть иконки (`icon`), числовые бейджи (`counter`) и круглые аватары (`avatar`). Иконки берутся из FontAwesome — см. [«Иконки»](/pages/welcome/basics/icons).

:::demo
```vue
<template>
    <div style="background: var(--s-bg-subheader); color: var(--s-white); padding: 0 1rem; border-radius: var(--s-border-radius)">
        <SMenu :items="items" />
    </div>
</template>

<script setup>
import { SMenu } from 'startup-ui'

const items = [
    { label: 'Профиль', url: '/profile', icon: 'user' },
    { label: 'Сообщения', url: '/messages', icon: 'envelope', counter: 5 },
    { label: 'Внешний сайт', url: 'https://startup-ui.ru' },
    { label: 'Иван Иванов', url: '/account', avatar: '/nature.jpg' },
]
</script>
```
```vue
<SMenu :items="items" />
```
:::

Внешние ссылки (абсолютный URL на другой домен) открываются в новой вкладке; локальные ссылки используют SPA-навигацию, если при подключении плагина передан `link`-компонент (напр. Inertia `Link`) — см. [«Установка»](/pages/welcome/basics/installing).

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| items | `SMenuItem[]` | `[]` | Пункты меню. |

### Объект пункта (SMenuItem)

| Поле | Тип | Описание |
|------|-----|----------|
| label | string | Текст пункта. |
| url | string | Ссылка. Внешние URL открываются в новой вкладке. |
| icon | string \| string[] | Имя иконки FontAwesome (если не задан `avatar`). |
| avatar | string | URL картинки-аватара (круглая, вместо иконки). |
| counter | string \| number | Бейдж со счётчиком (напр. число непрочитанного). |
| active | boolean | Подсветить как активный (жирный + «уголок» снизу). |
| method | string | HTTP-метод для ссылки (напр. `'post'` для пункта «Выйти»). |
| class | string | Дополнительный класс на пункт. |
| children | `SMenuItem[]` | Вложенные пункты — раскрываются выпадающим подменю при наведении. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Произвольный контент в конце меню (после всех пунктов). |
