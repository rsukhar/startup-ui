# Иконки

Для иконок мы по дефолту используем [Font Awesome](https://fontawesome.com/icons). Самая большая бесплатная библиотека — отлично подходит для стартапов! 

## Первоначальная установка

Устанавливаем через npm:

<CustomCodeBlock :code="{text: code, lang: 'sh'}" />

Создаём библиотеку иконок проекта, через которую будем подключать нужные иконки:

<CustomCodeBlock :code="{text: code2, lang: 'js'}" />

Подключаем библиотеку к приложению. Дополнительно регистрируем компонент FontAwesomeIcon, чтобы не импортить его в каждом файле, где он будет нужен.

<CustomCodeBlock :code="{text: code3, lang: 'js'}" />

## Подключение нужных иконок

1. Находим нужную иконку в [бесплатной базе](https://fontawesome.com/search?ic=free-collection) и копируем имя иконки (напр. «magnifying-glass-plus»)

2. Если иконки ещё нет в библиотеке, добавляем её туда:

<CustomCodeBlock :code="{text: code4, lang: 'js'}" />

3. Дальше можем вставлять иконку с помощью компонента FontAwesomeIcon любым из четырех способов:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <FontAwesomeIcon icon="magnifying-glass-plus" />
    <FontAwesomeIcon icon="fa-magnifying-glass-plus" />
    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass-plus" />
    <FontAwesomeIcon :icon="['fa-solid', 'fa-magnifying-glass-plus']" />
</div>

<CustomCodeBlock :code="{text: code5, lang: 'vue'}" />

4. И в таком же формате используем в компонентах Startup UI:

<div class="docs-container" style="flex-direction: row; gap: 10px; flex-wrap: wrap; align-items: center">
    <SStatus color="green" icon="check">Работает</SStatus>
    <SStatus color="yellow" icon="fa-triangle-exclamation">Есть ошибки</SStatus>
    <SStatus color="red" :icon="['fa-solid', 'fa-xmark']">Не работает</SStatus>
</div>

<CustomCodeBlock :code="{text: code6, lang: 'vue'}" />

<script setup>
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';
import SStatus from '../../../../packages/startup-ui/src/components/SStatus.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const code = `# Добавляем компонент для Vue3
npm install @fortawesome/vue-fontawesome@latest-3

# Добавляем ядро SVG
npm install @fortawesome/fontawesome-svg-core

# Устанавливаем все три пакета
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/free-brands-svg-icons`;


const code2 = `// resources/js/font-awesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as solid from '@fortawesome/free-solid-svg-icons';

library.add(
    solid.faCheck
);`;

const code3 = `// resources/js/app.js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './font-awesome.js';

// const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
// app.mount('#app')`;

const code4 = `// resources/js/font-awesome.js
library.add(
    solid.faMagnifyingGlassPlus
);`;

const code5 = `<FontAwesomeIcon icon="magnifying-glass-plus" />
<FontAwesomeIcon icon="fa-magnifying-glass-plus" />
<FontAwesomeIcon icon="fa-solid fa-magnifying-glass-plus" />
<FontAwesomeIcon :icon="['fa-solid', 'fa-magnifying-glass-plus']" />`;

const code6 = `<SStatus color="green" icon="check">Работает</SStatus>
<SStatus color="yellow" icon="fa-triangle-exclamation">Есть ошибки</SStatus>
<SStatus color="red" :icon="['fa-solid', 'fa-xmark']">Не работает</SStatus>`;

</script>

