# SForm > SFormRow

SForm и SFormRow позволяют быстро собирать функциональные формы.

<SToggleGroup>
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
</SToggleGroup>

## С формой InertiaJS

InertiaJS предлагает [useForm-компонент](https://inertiajs.com/docs/v2/data-props/remembering-state#form-helper), который мы используем по дефолту для всех форм.

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

<div v-pre>

```vue
<template>
    <SForm v-model="form" method="post" action="/users/login" @submit.prevent="form.post('/users/login')">
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
</script>
```

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

<div v-pre>

```vue
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
import { ref } from 'vue';
import { SForm, SFormRow, SInput, SButton } from 'startup-ui';

const isLoading = ref(false);
const errors = ref({});
const form = ref({ login: '', password: '' });

function submit() {
    isLoading.value = true;
    // Ваша логика запроса
}
</script>
```

</div>

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

<div v-pre>

```vue
<template>
    <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
        <SInput />
    </SFormRow>
</template>
```

</div>

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

<div v-pre>

```vue
<template>
    <SForm v-model="form" titles-at-left titles-width="170">
        <SFormRow title="Логин" name="login">
            <SInput />
        </SFormRow>
    </SForm>
</template>
```

</div>

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

<div v-pre>

```vue
<template>
    <SFormRow>
        <SSwitch v-model="form.hasAgreement">Согласен с правилами</SSwitch>
        <SSwitch v-model="form.hasNotifications">Согласен получать оповещения</SSwitch>
    </SFormRow>
</template>
```

</div>

## Вывод ошибок из кастомных ключей

Иногда бывает нужно выводить ошибки из кастомных ключей errors-массива (или вложенных путей). Сделать это можно с помощью атрибута **error-key**:

<div class="docs-container">
    <SForm v-model="formSixth" :errors="errors6" @submit.prevent="submit6">
         <SFormRow title="Кол-во заказов" :error-key="['orders.minCount', 'orders.maxCount']">
                <div class="order-formrow">
                    <label class="order-formrow-item">
                        <span>Минимум</span>
                        <SInput v-model="formSixth.minCount" type="number" min="0" style="max-width: 80px;"/>
                    </label>
                    <label class="order-formrow-item">
                        <span>Максимум</span>
                        <SInput v-model="formSixth.maxCount" type="number" min="0" style="max-width: 80px;"/>
                    </label>
                </div>
            </SFormRow>
            <SButton>Отправить</SButton>
    </SForm>
</div>

<div v-pre>

```vue
<template>
    <SFormRow title="Кол-во заказов" :error-key="['orders.minCount', 'orders.maxCount']">
        <!-- Инпуты с ручной привязкой v-model -->
    </SFormRow>
</template>
```

</div>

Поддерживаются:
- Пути через точку: `orders.0`
- Звездочка для всех вложенных ключей: `orders.*`
- Массивы: `['orders.0', 'orders.1']`

## Интерфейс компонента SForm

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| form | object | - | Объект формы InertiaJS (рекомендуется). |
| method | string | `'post'` | HTTP-метод: `post`, `put`, `patch`, `delete`, `get`. |
| action | string | - | URL для отправки формы. |
| preserveScroll | boolean | `true` | Сохранять ли позицию скролла после отправки. |
| isDirty | boolean | `false` | Состояние «изменено» (предупреждение при уходе со страницы). |
| loading | boolean | `undefined` | Состояние загрузки (переопределяет внутреннее состояние формы). |
| summaryErrors | boolean | `false` | Показывать ли список всех ошибок вверху формы. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое формы (инпуты, кнопки и т.д.). |

## Интерфейс компонента SFormRow

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| title | string | - | Заголовок (лейбл) поля. |
| hint | string | - | Текст-подсказка под заголовоком. |
| error | string \| string[] | - | Текст ошибки или массив ошибок. |
| errorKey | string | - | Ключ ошибки в объекте `form.errors` (если используется пропс `errorKey`). |
| required | boolean | `false` | Помечает поле как обязательное (добавляет красную звездочку). |
| side | boolean | `false` | Располагает заголовок слева от поля (горизонтальный лейаут). |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое строки (обычно компонент ввода — инпут, селект и т.д.). |
| title | Кастомный заголовок (вместо пропса title). |
| hint | Кастомная подсказка (вместо пропса hint). |

<script setup>
import { reactive, ref } from 'vue';
import SForm from '../../../../packages/startup-ui/src/components/SForm.vue';
import SFormRow from '../../../../packages/startup-ui/src/components/SFormRow.vue';
import SInput from '../../../../packages/startup-ui/src/components/SInput.vue';
import SToggleGroup from '../../../../packages/startup-ui/src/components/SToggleGroup.vue';
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SSwitch from '../../../../packages/startup-ui/src/components/SSwitch.vue';

const useForm = (initialValues) => {
    const original = JSON.parse(JSON.stringify(initialValues))
    const form = reactive({ ...original })
    form.post = (url) => {
        alert(`Отправили POST-запрос на адрес ${url}\n${JSON.stringify(form, null, 2)}`);
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

const formFirst = useForm({ login: '', password: '' });
const formSecond = useForm({ login: '', password: '' });
const isLoading = ref(false);
const submit = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        formSecond.post('/users/logins');
        formSecond.reset();
    }, 2000);
};

const formThird = useForm({ login: '', password: '' });
const formFourth = useForm({ login: '', password: '' });
const formFifth = useForm({ hasAgreement: false, hasNotifications: false });
const formSixth = useForm({ minCount: '', maxCount: '' });

const initialErrors = {
    'orders.minCount': 'Минимальное количество заказов не может быть меньше 1',
    'orders.maxCount': 'Максимальное количество заказов не может быть меньше 1'
};
const errors6 = ref({});

function submit6() {
    if (!formSixth.minCount) {
        errors6.value['orders.minCount'] = initialErrors['orders.minCount'];
    } else {
        delete errors6.value['orders.minCount']
    }
    if (!formSixth.maxCount) {
        errors6.value['orders.maxCount'] = initialErrors['orders.maxCount'];
    } else {
        delete errors6.value['orders.maxCount']
    }
}
</script>

<style lang="scss">
.order-formrow {
    display: flex;
    flex-direction: row;
    gap: var(--s-base-margin);
    &-item {
        display: flex;
        align-items: center;
        gap: 5px;
    }
}
</style>