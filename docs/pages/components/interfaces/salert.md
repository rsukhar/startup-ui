# SAlert

Оповещение о произошедшем событии.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Упрощено до одного метода, не требует добавлять элемент в шаблон.</li>
        </ol>
    </SToggle>
    <SToggle title="Что будет ценно улучшить">
    <ol>
        <li>Добавить возможность собирать серию оповещений друг под другом.</li>
    </ol>
    </SToggle>
</SToggleGroup>

## Базовый пример

Информационное оповещение:

<div class="docs-container">
    <SButton @click="SAlert.info('Информация')">Информация</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SButton @click="SAlert.info('Информация')">Информация</SButton>
</template>
```
```vue [Весь код]
<template>
    <SButton @click="SAlert.info('Информация')">Информация</SButton>
</template>

<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

Оповещение об успешном действии:

<div class="docs-container">
    <SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</template>
```
```vue [Весь код]
<template>
    <SButton color="green" @click="SAlert.success('Успех')">Успех</SButton>
</template>

<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

Оповещение об ошибке:

<div class="docs-container">
    <SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</template>
```
```vue [Весь код]
<template>
    <SButton color="red" @click="SAlert.error('Ошибка')">Ошибка</SButton>
</template>

<script setup>
import { SButton, SAlert} from 'startup-ui';
</script>
```
:::

## Увеличенное время до закрытия

По умолчанию оповещения закрываются через 5 секунд. Другое время закрытия можно задать параметром closeAfter:

<div class="docs-container">
    <SButton @click="closeWithDelay">Информация</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SButton @click="closeWithDelay">Информация</SButton>
</template>
```
```vue [Весь код]
<template>
    <SButton @click="closeWithDelay">Информация</SButton>
</template>

<script setup>
import { SButton, SAlert} from 'startup-ui';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}
</script>
```
:::

## Интерфейс компонента

### Методы

- `SAlert.info(text: string, options?: AlertOptions)` — информационное оповещение
- `SAlert.success(text: string, options?: AlertOptions)` — оповещение об успехе
- `SAlert.error(text: string, options?: AlertOptions)` — оповещение об ошибке
- `SAlert.open(text: string, options?: AlertOptions)` — базовый метод (тип задаётся в `options`)

### AlertOptions

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| type | `'success'` \| `'info'` \| `'error'` | `'info'` | Визуальный стиль оповещения. |
| closeAfter | number | `3000` | Время в миллисекундах до автозакрытия. |

<script setup>
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import { SAlert } from '../../../../packages/startup-ui/src/components/SAlert';

function closeWithDelay() {
    SAlert.info('Закроется через 5 секунд', {
        closeAfter: 5000,
    });
}
</script>
