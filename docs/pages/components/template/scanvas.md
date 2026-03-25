# SCanvas + SFooter

Общий шаблон страницы.

## Базовый пример

:::code-group
```vue [Пример]
<template>
    <SCanvas>
        <template #header>
            Шапка
        </template>
        <template #subheader>
            Второй блок шапки
        </template>
        <template #sidebar>
            Боковой блок страницы
        </template>
        <template #content>
            <slot />
        </template>
    </SCanvas>
    <SFooter>
        <div>&copy; suhar.ru, 2025. Все права защищены</div>
    </SFooter>
</template>
```
```vue [Весь код]
<template>
    <SCanvas>
        <template #header>
            Шапка
        </template>
        <template #subheader>
            Второй блок шапки
        </template>
        <template #sidebar>
            Боковой блок страницы
        </template>
        <template #content>
            <slot />
        </template>
    </SCanvas>
    <SFooter>
        <div>&copy; suhar.ru, 2025. Все права защищены</div>
    </SFooter>
</template>

<script setup>
import { SCanvas, SFooter } from 'startup-ui';
</script>
```
:::

## Утилиты SFooter

У компонента `SFooter` нет собственных свойств, но его CSS включает класс `.s-footer-h`, специально созданный для центрирования контента с максимальной шириной (`1200px`):

```vue
<template>
    <SFooter>
        <div class="s-footer-h">
            <!-- Контент будет центрирован с max-width и отступами (gap) -->
            <div>Колонка 1</div>
            <div>Колонка 2</div>
        </div>
    </SFooter>
</template>
```

## Интерфейс компонента SCanvas

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| header | Самая верхняя навигационная панель. Элементы с классом `.right` будут выровнены по правому краю на десктопе. |
| subheader | Вторичная шапка под основной. Часто используется для хлебных крошек или подзаголовка. |
| sidebar | Левая боковая панель навигации. На мобильных устройствах по умолчанию скрыта и доступна через бургер-меню. |
| content | Основная область для контента страницы. Занимает оставшееся пространство рядом с сайдбаром. |
| default | Рендерится между подшапкой и блоками `sidebar`/`content`. Часто используется для плашек (alerts) на всю ширину или для размещения `SFooter` в низу интерфейса. |

## Интерфейс компонента SFooter

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое подвала (футера). |
