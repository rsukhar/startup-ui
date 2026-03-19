# SHorizontalMenu

Горизонтальное меню. Обычно размещается в subheader-блоке.

## Базовый пример

<div class="docs-container">
    <div class="menu-container">
        <SHorizontalMenu :links="menuLinks" />
    </div>
</div>

```vue
<template>
    <div class="menu-container">
        <SHorizontalMenu :links="menuLinks" />
    </div>
</template>

<script setup>
import { SHorizontalMenu } from 'startup-ui';

const menuLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#', active: true }
];
</script>

<style scoped>
.menu-container {
    display: flex;
    line-height: 60px;
    background-color: var(--s-bg-gradient-light);
}
.menu-container :deep(a.s-horizontalmenu-label) {
    color: var(--s-white) !important;
    text-decoration: none;
}
</style>
```

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

<script setup>
import SHorizontalMenu from '../../../../packages/startup-ui/src/components/SHorizontalMenu.vue';

const menuLinks = [
    { label: 'Заказы', url: '#' }, 
    { label: 'Страницы', url: '#' }, 
    { label: 'Пользователи', url: '#', active: true }
];
</script>

<style lang="scss">
.menu-container {
    display: flex;
    line-height: 60px;
    background-color: var(--s-bg-gradient-light);
}

a.s-horizontalmenu-label {
    color: var(--s-white) !important;
    text-decoration: none;
}
</style>