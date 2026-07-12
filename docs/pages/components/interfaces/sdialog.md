# SDialog

Диалоговое окно.

## Базовый пример

:::demo
```vue
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет">
        <SForm v-model="form" @submit.prevent="submit">
            <SFormRow title="Логин" name="login">
                <SInput />
            </SFormRow>
            <SFormRow title="Пароль" name="password">
                <SInput type="password" />
            </SFormRow>
            <SButton>Войти</SButton>
        </SForm>
    </SDialog>

    <SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue'

const isShown = ref(false)
const form = ref({ login: '', password: '' })

function submit() {
    isShown.value = false
}
</script>
```
```vue
<SDialog v-model="isShown" title="Войти в личный кабинет">
    <SForm v-model="form" @submit.prevent="submit">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
```
:::

Окно можно перетаскивать по экрану, зажав его шапку (заголовок с названием и крестиком).

## Фиксированная ширина

:::demo
```vue
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" width="500px">
        <SForm v-model="form" @submit.prevent="submit">
            <SFormRow title="Логин" name="login">
                <SInput />
            </SFormRow>
            <SFormRow title="Пароль" name="password">
                <SInput type="password" />
            </SFormRow>
            <SButton>Войти</SButton>
        </SForm>
    </SDialog>

    <SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue'

const isShown = ref(false)
const form = ref({ login: '', password: '' })

function submit() {
    isShown.value = false
}
</script>
```
```vue
<SDialog v-model="isShown" title="Войти в личный кабинет" width="500px">
    <SForm v-model="form" @submit.prevent="submit">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
```
:::

## Не-модальное окно

По умолчанию окно модальное (нельзя взаимодействовать с другими объектами при открытом окне). Но если нужно отключить модальность, это можно сделать вот так:

:::demo
```vue
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" not-modal>
        <SForm v-model="form" @submit.prevent="submit">
            <SFormRow title="Логин" name="login">
                <SInput />
            </SFormRow>
            <SFormRow title="Пароль" name="password">
                <SInput type="password" />
            </SFormRow>
            <SButton>Войти</SButton>
        </SForm>
    </SDialog>

    <SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue'

const isShown = ref(false)
const form = ref({ login: '', password: '' })

function submit() {
    isShown.value = false
}
</script>
```
```vue
<SDialog v-model="isShown" title="Войти в личный кабинет" not-modal>
    <SForm v-model="form" @submit.prevent="submit">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
```
:::

Немодальные окна можно открывать несколько одновременно и перекрывать между собой — клик по любому месту окна поднимает его над остальными. Модальное окно всегда отображается поверх немодальных.

## Не закрывать по клику на оверлей

По умолчанию при клике на оверлей окно закрывается, если надо перехватывать-останавливать событие, то:

:::demo
```vue
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" @overlay-click.stop.prevent>
        <SForm v-model="form" @submit.prevent="submit">
            <SFormRow title="Логин" name="login">
                <SInput />
            </SFormRow>
            <SFormRow title="Пароль" name="password">
                <SInput type="password" />
            </SFormRow>
            <SButton>Войти</SButton>
        </SForm>
    </SDialog>

    <SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue'

const isShown = ref(false)
const form = ref({ login: '', password: '' })

function submit() {
    isShown.value = false
}
</script>
```
```vue
<SDialog v-model="isShown" title="Войти в личный кабинет" @overlay-click.stop.prevent>
    <SForm v-model="form" @submit.prevent="submit">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShown = true">Открыть окно</SButton>
```
:::

## Кастомная шапка, футер и фиксированный футер

Слот `#header` заменяет содержимое заголовка (крестик и перетаскивание за шапку сохраняются), слот `#footer` добавляет футер — например, кнопки действий.

По умолчанию футер прокручивается вместе с содержимым. Пропс `fixed-footer` закрепляет шапку и футер, оставляя прокрутку только в теле — удобно для длинных окон, чтобы кнопки действий всегда были на виду.

:::demo
```vue
<template>
    <SDialog v-model="isShown" width="500px" fixed-footer>
        <template #header>
            <h2>Условия использования</h2>
        </template>

        <p v-for="n in 15" :key="n">
            {{ n }}. Длинный текст соглашения, который не помещается в окно и прокручивается в теле, пока шапка и футер остаются на месте.
        </p>

        <template #footer>
            <SButton transparent @click="isShown = false">Отмена</SButton>
            <SButton @click="isShown = false">Принять</SButton>
        </template>
    </SDialog>

    <SButton @click="isShown = true">Открыть окно</SButton>
</template>
<script setup>
import { ref } from 'vue'

const isShown = ref(false)
</script>
```
```vue
<SDialog v-model="isShown" width="500px" fixed-footer>
    <template #header>
        <h2>Условия использования</h2>
    </template>

    <!-- длинный контент, который прокручивается только в теле -->

    <template #footer>
        <SButton transparent @click="isShown = false">Отмена</SButton>
        <SButton @click="isShown = false">Принять</SButton>
    </template>
</SDialog>
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| modelValue (v-model) | boolean | false | Управляет видимостью диалога. |
| title | string | undefined | Текст заголовка в шапке окна. |
| width | string | undefined | Кастомная ширина окна (например, `'500px'`, `'80vw'`). |
| notModal | boolean | false | Если `true`, убирает фоновый оверлей (не-модальное окно). |
| fixedFooter | boolean | false | Закрепляет футер: шапка и футер остаются на месте, прокручивается только тело. Без него футер прокручивается вместе с содержимым. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| update:modelValue | boolean | Срабатывает при изменении v-model. |
| overlay-click | — | Срабатывает при клике на фоновый оверлей. Окно закрывается, если не предотвращено (`.stop.prevent`). |
| hide | — | Срабатывает при закрытии окна (крестиком или кликом на оверлей). |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Основное содержимое диалогового окна (тело). |
| header | Кастомное содержимое заголовка (вместо `title`). Крестик закрытия и перетаскивание за шапку сохраняются. |
| footer | Футер окна, например кнопки действий. Рендерится, только если передан. |

<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>
