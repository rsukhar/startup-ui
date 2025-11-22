# SForm + SFormRow

Компоненты используются для того, чтобы задавать формы.

## С формой InertiaJS

InertiaJS предлагает useForm-компонент, который мы используем по дефолту для всех форм.
<CustomCodeBlock :code="code1" :fullCode="fullCode1" />

<div class="docs-container">
    <SForm v-model="formFirst" method="post" action="/users/login" @submit.prevent="formFirst.post('/users/login')">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</div>

Для компонентов внутри `<SFormRow />` не нужно отдельно прописывать модель — она автоматически берется из модели `<SForm />` по имени.

Аналогично не нужно как-то обрабатывать loading-состояние и отдельно выводить ошибки валидации — при необходимости этот функционал уже реализован в форме.

## С собственным submit-методом

Если по какой-то причине нам нужно вместо атрибутов method/action задать собственный submit-метод, сделать это можно следующим образом:

<div class="docs-container">
    <SForm v-model="formSecond" @submit="submit" :errors="errors" :loading="isLoading">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</div>

::: details Показать код
```js
<template>
    <SForm v-model="form" @submit="submit" :errors="errors" :loading="isLoading">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</template>
<script setup>
import { useForm } from '@inertiajs/vue3';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

const form = useForm({
  login: '',
  password: '',
});

function submit() {
    form.submit('post', `/projects/1/keywords`, {
        onSuccess: () => {form.reset('login', 'password')},
    });
}
</script>
<style lang="scss">
</style> 
```
:::

Так как мы используем собственный метод, то для показа состояния загрузки формы может понадобиться задавать свой набор ошибок (errors), а также loading-состояние, которое показывает, находится ли сейчас форма в процессе отправки (чтобы избежать повторной отправки по ошибке)

## Подсказки под полями

Если под полем нужно выводить подсказку, это делается в `<SFormRow>`:

<div class="docs-container">
    <SForm v-model="formThird" method="post" action="/users/login" @submit.prevent="formThird.post('/users/login')">
        <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</div>

::: details Показать код
```js
<template>
    <SForm v-model="form" method="post" action="/users/login">
        <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</template>
<script setup>
import { useForm } from '@inertiajs/vue3';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

const form = useForm({
  login: '',
  password: '',
});
</script>
<style lang="scss">
</style> 
```
:::


## Заголовки слева

По умолчанию заголовки выводятся над полями формы, но иногда бывает нужно показать их слева от полей. Сделать это можно следующим образом:

<div class="docs-container">
    <SForm v-model="formFourth" titles-at-left titles-width="170" method="post" action="/users/login" @submit.prevent="formFourth.post('/users/login')">
        <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</div>

::: details Показать код
```js
<template>
    <SForm v-model="form" titles-at-left titles-width="170" method="post" action="/users/login">
        <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</template>
<script setup>
import { useForm } from '@inertiajs/vue3';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

const form = useForm({
  login: '',
  password: '',
});
</script>
<style lang="scss">
</style> 
```
:::

Дополнительный параметр titles-width позволяет задать ширину заголовков.

## Установка моделей инпутов напрямую

По дефолту `<SFormRow />` привязывает модели вложенных компонентов к соответствующему полю из модели `<SForm />`. Но это делается исключительно для удобства и не является обязательным. Иногда, когда нужно задать модели вручную это возможно сделать напрямую:

<div class="docs-container">
    <SForm v-model="formFifth">
        <SFormRow>
            <SSwitch v-model="formFifth.hasAgreement">Согласен с правилами</SSwitch>
            <SSwitch v-model="formFifth.hasNotifications">Согласен получать оповещения</SSwitch>
        </SFormRow>
    </SForm>
</div>

::: details Показать код
```js
<template>
    <SForm v-model="form">
        <SFormRow>
            <SSwitch v-model="form.hasAgreement">Согласен с правилами</SSwitch>
            <SSwitch v-model="form.hasNotifications">Согласен получать оповещения</SSwitch>
        </SFormRow>
    </SForm>
</template>
<script setup>
import { useForm } from '@inertiajs/vue3';
import { SForm, SFormRow, SSwitch } from 'startup-ui';

const form = useForm({
    hasAgreement: false,
    hasNotifications: false,
});
</script>
```
:::

<script setup>
import { reactive, ref } from 'vue';
import SForm from '../../../packages/startup-ui/src/components/SForm.vue';
import SFormRow from '../../../packages/startup-ui/src/components/SFormRow.vue';
import SInput from '../../../packages/startup-ui/src/components/SInput.vue';
import SButton from '../../../packages/startup-ui/src/components/SButton.vue';
import SSwitch from '../../../packages/startup-ui/src/components/SSwitch.vue';
import CustomCodeBlock from '../../resources/components/CustomCodeBlock.vue';

const useForm = (initialValues) => {
    const original = JSON.parse(JSON.stringify(initialValues))
    const form = reactive({ ...original })

    form.post = (url) => {
        alert(`Отправили POST-запрос на адрес ${url}\n${JSON.stringify(form, null, 2)}`)
    }

    form.reset = (...fields) => {
        if (fields.length === 0) {
            Object.assign(form, JSON.parse(JSON.stringify(original)))
        } else {
            fields.forEach((key) => (form[key] = original[key]))
        }
    }

    return form
}

const errors = {};

const formFirst = useForm({
  login: '',
  password: '',
});

const formSecond = useForm({
  login: '',
  password: '',
});

const isLoading = ref(false);
const submit = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        formSecond.post('/users/logins');
        formSecond.reset();
    }, 2000);
};

const formThird = useForm({
  login: '',
  password: '',
});

const formFourth= useForm({
  login: '',
  password: '',
});

const formFifth = useForm({
    hasAgreement: '',
    hasNotifications: '',
});


const code1 = `
<SForm v-model="form" method="post" action="/users/login">
    <SFormRow title="Логин" name="login">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>`;

const fullCode1 = `
<template>
    <SForm v-model="form" method="post" action="/users/login">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
        <SFormRow title="Пароль" name="password">
            <SInput type="password" />
        </SFormRow>
        <SButton>Войти</SButton>
    </SForm>
</template>
<script setup>
import { useForm } from '@inertiajs/vue3';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

const form = useForm({
    login: '',
    password: '',
});
<\/script>`;

</script>
<style lang="scss">
</style>