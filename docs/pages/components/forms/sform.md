# SForm > SFormRow

SForm и SFormRow позволяют быстро собирать функциональные формы.

<SToggle title="В чем отличие от аналогов?">
<p>В отличие от популярных библиотек компонентов для Vue3:</p>
<ol>
<li>Унифицирует и упрощает вспомогательные элементы (напр. подсказки под полями) и часто используемые состояния (напр. заголовки слева) до простых атрибутов. Это обеспечивает одинаковую реализацию разными программистами, избавляет от визуальных отличий, упрощает дальнейшую поддержку и сохраняет взаимозаменяемость между проектами.</li>
<li>Сразу из коробки связывает форму с InertiaJS-формами и/или Laravel FormRequest-ами, одинаково и аккуратно выводя ошибки валидации</li>
<li>Минимизируют синтаксис и связанность до одной модели на уровне SForm, что делает код чище, упрощает его написание, чтение и поддержку.</li>
</ol>
</SToggle>

<SToggle title="Что будет ценно улучшить">
<ol>
<li>Сразу привязывать лейблы правильным образом к соответствующим input-полям, что обеспечит поддержку <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" target="_blank">ARIA</a> — это будет ценно для проектов на европейский рынок, т.к. там это требование законодательства.</li>
</ol>
</SToggle>

## С формой InertiaJS

InertiaJS предлагает <a href="https://inertiajs.com/docs/v2/data-props/remembering-state#form-helper" target="_blank">useForm-компонент</a>, который мы используем по дефолту для всех форм.

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

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code2, lang: 'vue'}" :fullCode="{text: fullCode2, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}" />

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

Дополнительный параметр titles-width позволяет задать ширину заголовков.

<CustomCodeBlock :code="{text: code4, lang: 'js'}" :fullCode="{text: fullCode4, lang: 'vue'}" />

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

<CustomCodeBlock :code="{text: code5, lang: 'js'}" :fullCode="{text: fullCode5, lang: 'vue'}" />

<script setup>
import { reactive, ref } from 'vue';
import SForm from '../../../../packages/startup-ui/src/components/SForm.vue';
import SFormRow from '../../../../packages/startup-ui/src/components/SFormRow.vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SSwitch from '../../../../packages/startup-ui/src/components/SSwitch.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

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


const code1 = `<SForm v-model="form" method="post" action="/users/login">
    <SFormRow title="Логин" name="login">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>`;

const fullCode1 = `<template>
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

const code2 = `<SForm @submit="submit" \:errors="errors" \:loading="isLoading">
  ...
</SForm>`;

const fullCode2 = `<template>
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
    form.submit('post', \`/projects/1/keywords\`, {
        onSuccess: () => {form.reset('login', 'password')},
    });
}
<\/script>`
const code3 = `<SFormRow title="Логин" name="login" hint="Имя пользователя или email">
    <SInput />
</SFormRow>`;

const fullCode3 = `<template>
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
<\/script>`;

const code4 = `<SForm titles-at-left titles-width="170">
  ...
</SForm>`;

const fullCode4 = `<template>
    <SForm v-model="form" titles-at-left titles-width="170" method="post" action="/users/login">
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

const code5 = `<SForm v-model="form">
    <SFormRow>
        <SSwitch v-model="form.hasAgreement">Согласен с правилами</SSwitch>
        <SSwitch v-model="form.hasNotifications">Согласен получать оповещения</SSwitch>
    </SFormRow>
</SForm>`;

const fullCode5 = `<template>
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
<\/script>`;
</script>