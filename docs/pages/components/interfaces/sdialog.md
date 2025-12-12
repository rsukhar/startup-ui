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

<CustomCodeBlock :code="{text: code1, lang: 'js'}" :fullCode="{text: fullCode1, lang: 'vue'}"/>

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

<CustomCodeBlock :code="{text: code2, lang: 'js'}" :fullCode="{text: fullCode2, lang: 'vue'}"/>

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

<CustomCodeBlock :code="{text: code3, lang: 'js'}" :fullCode="{text: fullCode3, lang: 'vue'}"/>

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

<CustomCodeBlock :code="{text: code4, lang: 'vue'}" :fullCode="{text: fullCode4, lang: 'vue'}"/>

<script setup>
import { ref, reactive } from 'vue';
import SDialog from '../../../../packages/startup-ui/src/components/SDialog.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';
import SForm from '../../../../packages/startup-ui/src/components/SForm.vue';
import SFormRow from '../../../../packages/startup-ui/src/components/SFormRow.vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import SSwitch from '../../../../packages/startup-ui/src/components/SSwitch.vue';

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

const form1 = useForm({
    login: '',
    password: '',
});

const form2 = useForm({
    login: '',
    password: '',
});

const form3 = useForm({
    login: '',
    password: '',
});

const form4 = useForm({
    login: '',
    password: '',
});

const code1 = `<SDialog v-model="isShown" title="Войти в личный кабинет">
    ...
</SDialog>`;
const fullCode1 = `<template>
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
<\/script>`;

const code2 = `<SDialog v-model="isShown" title="Войти в личный кабинет" width="500px">
    ...
</SDialog>`;
const fullCode2 = `<template>
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
<\/script>`;

const code3 = `<SDialog v-model="isShown" title="Войти в личный кабинет" not-modal>
    ...
</SDialog>`;
const fullCode3 = `<template>
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
<\/script>`;

const code4 = `<SDialog v-model="isShown" title="Войти в личный кабинет" @overlay-click.stop.prevent>
    ...
</SDialog>`;
const fullCode4 = `<template>
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
<\/script>`;
</script>
<style lang="scss">
.s-dialog {
    color: var(--s-text);
}
</style>