# SDialog

Диалоговое окно.

## Базовый пример


<div class="docs-container">
<SDialog v-model="isShownFirst" title="Войти в личный кабинет">
    <SForm v-model="form1" method="post" action="/users/login" @submit.prevent="form1.post('/users/login')">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShownFirst = true">Открыть окно</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет">
        ...
    </SDialog>
</template>
```
```vue [Весь код]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет">
        <SForm v-model="form" method="post" action="/users/login" @submit.prevent="form.post('/users/login')">
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
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Фиксированная ширина


<div class="docs-container">
<SDialog v-model="isShownSecond" title="Войти в личный кабинет" width="500px">
    <SForm v-model="form2" method="post" action="/users/login" @submit.prevent="form2.post('/users/login')">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShownSecond = true">Открыть окно</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" width="500px">
        ...
    </SDialog>
</template>
```
```vue [Весь код]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" width="500px">
        <SForm v-model="form" method="post" action="/users/login" @submit.prevent="form.post('/users/login')">
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
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Не-модальное окно

По умолчанию окно модальное (нельзя взаимодействовать с другими объектами при открытом окне). Но если нужно отключить модальность, это можно сделать вот так:

<div class="docs-container">
<SDialog v-model="isShownThird" title="Войти в личный кабинет" not-modal>
    <SForm v-model="form3" method="post" action="/users/login" @submit.prevent="form3.post('/users/login')">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShownThird = true">Открыть окно</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" not-modal>
        ...
    </SDialog>
</template>
```
```vue [Весь код]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" not-modal>
        <SForm v-model="form" method="post" action="/users/login" @submit.prevent="form.post('/users/login')">
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
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
```
:::

## Не закрывать по клику на оверлей

По умолчанию при клике на оверлей окно закрывается, если надо перехватывать-останавливать событие, то:

<div class="docs-container">
<SDialog v-model="isShownFourth" title="Войти в личный кабинет" @overlay-click.stop.prevent>
    <SForm v-model="form4" method="post" action="/users/login" @submit.prevent="form4.post('/users/login')">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</SDialog>

<SButton @click="isShownFourth = true">Открыть окно</SButton>
</div>

:::code-group
```vue [Пример]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" @overlay-click.stop.prevent>
        ...
    </SDialog>
</template>
```
```vue [Весь код]
<template>
    <SDialog v-model="isShown" title="Войти в личный кабинет" @overlay-click.stop.prevent>
        <SForm v-model="form" method="post" action="/users/login" @submit.prevent="form.post('/users/login')">
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
import { ref } from 'vue';
import { SDialog, SButton } from 'startup-ui';

const isShown = ref(false);
</script>
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

<script setup>
import { ref, reactive } from 'vue';
import SDialog from '../../../../packages/startup-ui/src/components/SDialog.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SForm from '../../../../packages/startup-ui/src/components/SForm.vue';
import SFormRow from '../../../../packages/startup-ui/src/components/SFormRow.vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';

const useForm = (initialValues) => {
    const original = JSON.parse(JSON.stringify(initialValues));
    const form = reactive({ ...original });

    form.post = (url) => {
        alert(`Отправили POST-запрос на адрес ${url}\n${JSON.stringify(form, null, 2)}`)
    };

    form.reset = (...fields) => {
        if (fields.length === 0) {
            Object.assign(form, JSON.parse(JSON.stringify(original)))
        } else {
            fields.forEach((key) => (form[key] = original[key]))
        }
    };

    return form
};

const isShownFirst = ref(false);
const isShownSecond = ref(false);
const isShownThird = ref(false);
const isShownFourth = ref(false);

const form1 = useForm({ login: '', password: '' });
const form2 = useForm({ login: '', password: '' });
const form3 = useForm({ login: '', password: '' });
const form4 = useForm({ login: '', password: '' });
</script>

<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>
