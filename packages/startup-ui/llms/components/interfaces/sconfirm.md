# SConfirm

Диалоговое окно подтверждения действия.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Упрощено до одного метода, не требует добавлять элемент в шаблон.</li>
    </ol>
</SToggle>

## Базовый пример

```vue
<template>
    <SButton @click="deleteUser">Удалить пользователя</SButton>
</template>

<script setup>
import { SConfirm, SAlert } from 'startup-ui'

function deleteUser() {
    SConfirm.open('Вы действительно хотите удалить пользователя?', {
        title: 'Подтверждение удаления',
        onAccept: () => SAlert.success('Пользователь удален')
    })
}
</script>
```

## Интерфейс компонента

`SConfirm.open(message: string, options?: ConfirmOptions)`

### Аргументы

| Название | Тип | Описание |
|----------|-----|----------|
| message | string | Обязательный. Основной текст/HTML диалога подтверждения. |
| options | object | Необязательный объект конфигурации (см. ConfirmOptions ниже). |

### ConfirmOptions

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| title | string | `'Необходимо подтверждение'` | Заголовок диалогового окна. |
| acceptLabel | string | `'Да'` | Текст кнопки подтверждения. |
| cancelLabel | string | `'Нет'` | Текст кнопки отмены. |
| variant | `'primary' \| 'danger'` | `'danger'` | Цвет кнопки подтверждения: `danger` (красная) для разрушающих действий, `primary` — для неразрушающих (move и т.п.). |
| onAccept | function | `() => {}` | Коллбэк при нажатии кнопки подтверждения. |
| onCancel | function | `() => {}` | Коллбэк при нажатии кнопки отмены или фонового оверлея. |

<style lang="scss">
.s-confirm {
    color: var(--s-text);
}
</style>
