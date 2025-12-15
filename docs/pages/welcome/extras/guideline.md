#  Гайдлайн разработки

## Локальная установка для разработки

1. Устанавливаем зависимости startup-ui

<CustomCodeBlock :code="{text: code, lang: 'sh'}" />

2. Устанавливаем зависимости vite-press

<CustomCodeBlock :code="{text: code2, lang: 'sh'}" />

## Публикация обновлений

1. Делаем новый билд

<CustomCodeBlock :code="{text: code3, lang: 'sh'}" />

2. Если не залогинены в npm, логинимся

<CustomCodeBlock :code="{text: code4, lang: 'sh'}" />

3. Повышаем версию

<CustomCodeBlock :code="{text: code5, lang: 'sh'}" />

4. Публикуем изменения

<CustomCodeBlock :code="{text: code6, lang: 'sh'}" />

5. <a href="/pages/welcome/extras/docs-update.html">Обновляем документацию</a>

<script setup>
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code = `npm install --prefix ./packages/startup-ui`;

const code2 = `cd docs
npm install`;

const code3 = `cd packages/startup-ui
npm run build`;

const code4 = `npm login`;

const code5 = `# Если патч, то:
npm version patch

# Если новая функциональность без изменения API, то:
npm version minor

# Если изменение API, то:
npm version major`;

const code6 = `npm publish --access public`;

</script>