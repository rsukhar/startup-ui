#  Обновление документации

## Локальный запуск документации для разработки

<CustomCodeBlock :code="{text: code, lang: 'sh'}" />

## Обновляем документацию

<CustomCodeBlock :code="{text: code2, lang: 'sh'}" />

По FTP копируем docs/.vitepress/dist/* в ftp://priceclub.beget.tech/

Коммитим и пушим изменения


<script setup>
import CustomCodeBlock from '../../../resources/components/CustomCodeBlock.vue';

const code = `cd docs
npm run docs:dev`;

const code2 = `cd docs
npm run docs:build`;

</script>