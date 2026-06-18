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

:::example
```vue
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
</script>
```
```vue
<SForm v-model="form" method="post" action="/users/login">
    <SFormRow title="Логин" name="login">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>
```
:::

Для компонентов внутри `<SFormRow />` не нужно отдельно прописывать модель — она автоматически берется из модели `<SForm />` по имени.

Аналогично не нужно как-то обрабатывать loading-состояние и отдельно выводить ошибки валидации — при необходимости этот функционал уже реализован в форме.

## С собственным submit-методом

Если по какой-то причине нам нужно вместо атрибутов method/action задать собственный submit-метод, сделать это можно следующим образом:

:::demo
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
import { ref } from 'vue'
const isLoading = ref(false)
const errors = ref({})
const form = ref({ login: '', password: '' })

function submit() {
    isLoading.value = true
    // Your request logic here
    setTimeout(() => (isLoading.value = false), 1500)
}
</script>
```
```vue
<SForm v-model="form" @submit="submit" :errors="errors" :loading="isLoading">
    <SFormRow title="Логин" name="login">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>
```
:::

Так как мы используем собственный метод, то для показа состояния загрузки формы может понадобиться задавать свой набор ошибок (errors), а также loading-состояние, которое показывает, находится ли сейчас форма в процессе отправки (чтобы избежать повторной отправки по ошибке)

## Подсказки под полями

Если под полем нужно выводить подсказку, это делается в `<SFormRow>`:

:::demo
```vue
<template>
    <SForm v-model="form">
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
import { ref } from 'vue'
const form = ref({ login: '', password: '' })
</script>
```
```vue
<SForm v-model="form">
    <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>
```
:::

## Заголовки слева

По умолчанию заголовки выводятся над полями формы, но иногда бывает нужно показать их слева от полей. Сделать это можно с помощью пропса `titles-at-left`. Ширину этих полей можно задать через `titles-width`.

:::demo
```vue
<template>
    <SForm v-model="form" titles-at-left :titles-width="80">
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
import { ref } from 'vue'
const form = ref({ login: '', password: '' })
</script>
```
```vue
<SForm v-model="form" titles-at-left :titles-width="80">
    <SFormRow title="Логин" name="login" hint="Имя пользователя или email">
        <SInput />
    </SFormRow>
    <SFormRow title="Пароль" name="password">
        <SInput type="password" />
    </SFormRow>
    <SButton>Войти</SButton>
</SForm>
```
:::

## Установка моделей инпутов напрямую

По дефолту `<SFormRow />` привязывает модели вложенных компонентов к соответствующему полю из модели `<SForm />`. Но это делается исключительно для удобства и не является обязательным. Иногда, когда нужно задать модели вручную это возможно сделать напрямую:

:::demo
```vue
<template>
    <SForm v-model="form">
        <SFormRow>
            <SSwitch v-model="form.hasAgreement">Согласен с правилами</SSwitch>
            <SSwitch v-model="form.hasNotifications">Согласен получать оповещения</SSwitch>
        </SFormRow>
    </SForm>
</template>
<script setup>
import { ref } from 'vue'
const form = ref({ hasAgreement: false, hasNotifications: false })
</script>
```
```vue
<SForm v-model="form">
    <SFormRow>
        <SSwitch v-model="form.hasAgreement">Согласен с правилами</SSwitch>
        <SSwitch v-model="form.hasNotifications">Согласен получать оповещения</SSwitch>
    </SFormRow>
</SForm>
```
:::

## Вывод ошибок из кастомных ключей

Иногда бывает нужно выводить ошибки из кастомных ключей errors-массива (или вложенных путей). Сделать это можно с помощью атрибута `error-key`:

:::demo
```vue
<template>
    <SForm v-model="form" :errors="errors" @submit.prevent="submit">
        <SFormRow title="Кол-во заказов" :error-key="['orders.minCount', 'orders.maxCount']">
            <div class="order-formrow">
                <label class="order-formrow-item">
                    <span>Минимум</span>
                    <SInput v-model="form.minCount" type="number" min="0" style="max-width: 80px;" />
                </label>
                <label class="order-formrow-item">
                    <span>Максимум</span>
                    <SInput v-model="form.maxCount" type="number" min="0" style="max-width: 80px;" />
                </label>
            </div>
        </SFormRow>
        <SButton>Отправить</SButton>
    </SForm>
</template>
<script setup>
import { ref } from 'vue'
const errors = ref({})
const form = ref({ minCount: '', maxCount: '' })

function submit() {
    errors.value = {}
    if (!form.value.minCount) errors.value['orders.minCount'] = 'Минимальное количество не может быть меньше 1'
    if (!form.value.maxCount) errors.value['orders.maxCount'] = 'Максимальное количество не может быть меньше 1'
}
</script>
```
```vue
<SForm v-model="form" :errors="errors" @submit.prevent="submit">
    <SFormRow title="Кол-во заказов" :error-key="['orders.minCount', 'orders.maxCount']">
        <div class="order-formrow">
            <label class="order-formrow-item">
                <span>Минимум</span>
                <SInput v-model="form.minCount" type="number" min="0" style="max-width: 80px;" />
            </label>
            <label class="order-formrow-item">
                <span>Максимум</span>
                <SInput v-model="form.maxCount" type="number" min="0" style="max-width: 80px;" />
            </label>
        </div>
    </SFormRow>
    <SButton>Отправить</SButton>
</SForm>
```
:::

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
