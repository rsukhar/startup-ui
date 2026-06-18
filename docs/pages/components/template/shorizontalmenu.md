# SHorizontalMenu

Горизонтальное меню. Обычно размещается в subheader-блоке.

## Базовый пример

:::demo
```vue
<template>
    <SHorizontalMenu :links="menuLinks" />
</template>

<script setup>
const menuLinks = [
    { label: 'Заказы', url: '#' },
    { label: 'Страницы', url: '#' },
    { label: 'Пользователи', url: '#', active: true }
]
</script>
```
```vue
<SHorizontalMenu :links="menuLinks" />
```
:::

Где menuLinks — это массив в формате `[{label, url, active}, ...]`

## Интерфейс компонента SHorizontalMenu

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| links | `SHorizontalMenuLink[]` | `[]` | Массив навигационных ссылок. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | По умолчанию слоты отсутствуют, меню генерируется автоматически по пропсу `links`. |

## Интерфейс объекта SHorizontalMenuLink

| Свойство | Тип | Описание |
|----------|-----|----------|
| label | string | **Обязательное.** Текст пункта меню. |
| url | string | URL для перехода. Если указан, рендерится как `<Link>` (Inertia). Иначе как `<div>`. |
| active | boolean | Если `true`, пункт помечается как активный. |
| className | string | Кастомные CSS классы для обертки пункта. |
| stat | string \| number | Значение для бейджа со статистикой (требует доп. стилизации). |
| children | `SHorizontalMenuLink[]` | Массив дочерних ссылок (подменю). |
