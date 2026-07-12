# Иконки

Для иконок мы по дефолту используем [Font Awesome](https://fontawesome.com/icons). Самая большая бесплатная библиотека — отлично подходит для стартапов!

FontAwesome **опциональна**. Внутренняя «обвязка» компонентов — стрелки календаря, крестики, карет, бургер и т.п. — в 1.x рисуется **только встроенными inline-SVG и не требует ни одной регистрации `library.add()`**. FontAwesome нужна исключительно для иконок, которые вы передаёте **сами** через проп `icon`: `SActionIcon`, `SNote`, `SStatus`, `SMenu`, а также опциональные иконки `STooltip` и `SDatePicker`.

Если после обновления где-то пропала обвязка (стрелки, крестики, календарь) — это баг библиотеки, а не ваш пропуск в `library.add()`: в 1.x обвязка от FontAwesome не зависит. Внутри библиотеки этот контракт защищён проверкой `lint:chrome-icons` (падает на сборке/публикации, если в «хром» компонента просачивается FontAwesome-иконка).

## Первоначальная установка

Устанавливаем через npm:

```sh
# Добавляем компонент для Vue3
npm install @fortawesome/vue-fontawesome@latest-3

# Добавляем ядро SVG
npm install @fortawesome/fontawesome-svg-core

# Устанавливаем все три пакета
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/free-brands-svg-icons
```

Создаём библиотеку иконок проекта, через которую будем подключать нужные иконки:

```js
// resources/js/font-awesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as solid from '@fortawesome/free-solid-svg-icons';

library.add(
    solid.faCheck
);
```

Подключаем библиотеку к приложению. Дополнительно регистрируем компонент FontAwesomeIcon, чтобы не импортить его в каждом файле, где он будет нужен.

```js
// resources/js/app.js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './font-awesome.js';

// const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
// app.mount('#app')
```

Альтернатива глобальной регистрации — прокинуть рендерер иконок при подключении плагина. Удобно, если не хотите регистрировать `FontAwesomeIcon` глобально или хотите подключить **другой icon-set** (любой компонент, принимающий проп `icon`):

```js
// resources/js/app.js
import StartupUI from 'startup-ui';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

app.use(StartupUI, {
    icon: FontAwesomeIcon, // или свой компонент-рендерер иконок
});
```

Если не подключить ни одного из способов — компоненты без `icon`-пропа работают как обычно, а там, где иконку передали, она просто не отрисуется (Vue выдаст предупреждение о неразрешённом компоненте).

## Подключение нужных иконок

1. Находим нужную иконку в [бесплатной базе](https://fontawesome.com/search?ic=free-collection) и копируем имя иконки (напр. «magnifying-glass-plus»)

2. Если иконки ещё нет в библиотеке, добавляем её туда:

```js
// resources/js/font-awesome.js
library.add(
    solid.faMagnifyingGlassPlus
);
```

3. Дальше можем вставлять иконку с помощью компонента FontAwesomeIcon любым из четырех способов:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <FontAwesomeIcon icon="magnifying-glass-plus" />
    <FontAwesomeIcon icon="fa-magnifying-glass-plus" />
    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass-plus" />
    <FontAwesomeIcon :icon="['fa-solid', 'fa-magnifying-glass-plus']" />
</div>

<div v-pre>

```vue
<FontAwesomeIcon icon="magnifying-glass-plus" />
<FontAwesomeIcon icon="fa-magnifying-glass-plus" />
<FontAwesomeIcon icon="fa-solid fa-magnifying-glass-plus" />
<FontAwesomeIcon :icon="['fa-solid', 'fa-magnifying-glass-plus']" />
```

</div>

4. И в таком же формате используем в компонентах Startup UI:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SStatus color="green" icon="check">Работает</SStatus>
    <SStatus color="yellow" icon="fa-triangle-exclamation">Есть ошибки</SStatus>
    <SStatus color="red" :icon="['fa-solid', 'fa-xmark']">Не работает</SStatus>
</div>

<div v-pre>

```vue
<SStatus color="green" icon="check">Работает</SStatus>
<SStatus color="yellow" icon="fa-triangle-exclamation">Есть ошибки</SStatus>
<SStatus color="red" :icon="['fa-solid', 'fa-xmark']">Не работает</SStatus>
```

</div>

## Legacy 0.x

В версиях **0.x** (до 1.0) обвязка компонентов рисовалась через FontAwesome и **молча** требовала, чтобы приложение само зарегистрировало эти иконки в `library.add()` — иначе стрелки, крестики и календарь просто не отображались, без ошибок в консоли. В 1.x это исправлено (обвязка — inline-SVG), поэтому лучшее решение — обновиться до 1.x.

Как временный обходной путь на 0.x — зарегистрировать недостающие иконки. Для `SDatePicker` минимально нужно:

```js
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
library.add(faChevronLeft, faChevronRight, faCalendar);
```

<script setup>
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
