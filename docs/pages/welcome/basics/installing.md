# Установка

Добавляем Startup UI в свой проект и подключаем первый компонент.

## Добавляем в проект

Startup UI доступен в репозитории npm.

```sh
# Если используете npm
npm install startup-ui

# Если используете yarn
yarn add startup-ui
```

## Подключаем стили

```js
// app.js
import 'startup-ui/dist/index.css';
```

## Подключаем палитру

Начиная с мажорной версии библиотека **не включает** значения CSS-переменных `--s-*` в свой CSS — она их только использует (`var(--s-primary)` и т.п.). Это убирает конфликт «несколько источников одной переменной» в инструментах и даёт проекту полный контроль над палитрой.

Выберите один вариант:

```js
// Вариант А: подключить готовую палитру по умолчанию
import 'startup-ui/defaults.css';
```

```scss
/* Вариант Б: задать свою палитру (resources/css/variables.scss) */
:root {
    --s-primary: #2563eb;
    --s-primary-dark: #1e40af;
    /* ...остальные --s-* (полный список — на странице «Цвета и настройки») */
}
```

## Регистрация плагина и локализация

Можно импортировать компоненты по отдельности (как ниже), либо зарегистрировать плагин глобально. При регистрации задаётся локаль (по умолчанию — **английская**):

```js
// app.js
import StartupUI from 'startup-ui';

app.use(StartupUI, {
    locale: 'ru', // 'en' по умолчанию; 'ru' включает русскую локализацию
    // messages: { ru: { confirm: { accept: 'Подтвердить' } } } // точечное переопределение строк
});
```

Подробнее — на странице [«Локализация»](/pages/welcome/basics/localization).

## Подключение с InertiaJS

Startup UI не требует InertiaJS. Без него ссылки в меню и пагинации работают как обычные `<a>` (с перезагрузкой страницы), а формы отправляйте через событие `@submit`.

Если же проект на Inertia, передайте при регистрации плагина две вещи из `@inertiajs/vue3` — роутер `router` и компонент ссылок `Link`. После этого компоненты с навигацией начнут работать «по-Inertia», без перезагрузки страницы:

```js
// app.js
import StartupUI from 'startup-ui';
import { router, Link } from '@inertiajs/vue3';

app.use(StartupUI, {
    locale: 'ru',
    router,      // отправка SForm, пагинация SPagination, фильтры SFilterGroup (bind-to-query)
    link: Link,  // ссылки в меню (SHorizontalMenu / SVerticalMenu / SDropdownMenu) и пагинации
});
```

Что это включает:

- **SForm** — отправку формы по `method`/`action` (Inertia-визит с подстановкой ошибок валидации);
- **SPagination** и **SFilterGroup** (`bind-to-query`) — переключение страниц и фильтров без перезагрузки;
- **меню и пагинацию** — SPA-ссылки вместо обычных `<a>`.

<SNote icon="lightbulb" attention>
На стороне бэкенда: для клиента <code>@inertiajs/core</code> 3.x включите в <code>config/inertia.php</code> опцию <code>use_script_element_for_initial_page</code> — иначе начальная страница не прочитается и вы получите пустой экран без ошибок.
</SNote>

## Подключение иконок (FontAwesome или свой набор)

Сами компоненты библиотеки иконок **не требуют** — вся «обвязка» (шевроны, крестики, карет, бургер и т.п.) рисуется встроенными inline-SVG. FontAwesome нужен только там, где иконку передаёте **вы** через проп `icon`: это `SActionIcon`, `SNote`, `SStatus`, а также опциональные иконки `STooltip` и `SDatePicker`.

Дать этим компонентам рендерер иконок можно двумя способами.

**Способ А — глобальная регистрация `FontAwesomeIcon`** (классический для FA):

```js
// app.js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

app.component('FontAwesomeIcon', FontAwesomeIcon);
```

**Способ Б — инъекция рендерера при регистрации плагина.** Удобно, если не хотите глобальную регистрацию или хотите подключить **другой icon-set** (любой компонент, принимающий проп `icon`):

```js
// app.js
import StartupUI from 'startup-ui';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

app.use(StartupUI, {
    icon: FontAwesomeIcon, // или свой компонент-рендерер иконок
});
```

Если не подключить ни того, ни другого — компоненты без `icon`-пропа работают как обычно, а там, где иконку передали, она просто не отрисуется (Vue выдаст предупреждение о неразрешённом компоненте).

## Добавляем первый компонент

Чтобы убедиться, что всё работает, добавляем любой компонент в SFC-шаблон:

<div v-pre>

```vue
// Index.vue
<template>
    <SButton>Все работает!</SButton>
</template>
<script setup>
import { SButton } from 'startup-ui';
</script>
```

</div>

Должна появиться кнопка:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SButton>Все работает!</SButton>
</div>

<script setup>
import SButton from '../../../../packages/startup-ui/src/components/SButton.vue';
import SNote from '../../../../packages/startup-ui/src/components/SNote.vue';
</script>
