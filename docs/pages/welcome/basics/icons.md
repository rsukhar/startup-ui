# Иконки

Для иконок мы по дефолту используем [Font Awesome](https://fontawesome.com/icons). Самая большая бесплатная библиотека — отлично подходит для стартапов!

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

<script setup>
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
