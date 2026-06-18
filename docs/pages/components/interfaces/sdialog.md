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

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| modelValue (v-model) | boolean | false | Управляет видимостью диалога. |
| title | string | undefined | Текст заголовка в шапке окна. |
| width | string | undefined | Кастомная ширина окна (например, `'500px'`, `'80vw'`). |
| notModal | boolean | false | Если `true`, убирает фоновый оверлей (не-модальное окно). |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| update:modelValue | boolean | Срабатывает при изменении v-model. |
| overlay-click | — | Срабатывает при клике на фоновый оверлей. Окно закрывается, если не предотвращено (`.stop.prevent`). |
| hide | — | Срабатывает при закрытии окна (крестиком или кликом на оверлей). |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Основное содержимое диалогового окна. |

<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>
