# SNote

Текстовая заметка.

## Базовый пример

<div class="docs-container">
    <SNote>Стандартный стиль (основной цвет)</SNote>
    <SNote gray>В сером цвете</SNote>
    <SNote attention>Привлечение внимания</SNote>
    <SNote success>Успешное действие</SNote>
    <SNote error>Описание ошибки</SNote>
</div>

::: details Показать код
```js
<SNote>Стандартный стиль (основной цвет)</SNote>
<SNote gray>В сером цвете</SNote>
<SNote attention>Привлечение внимания</SNote>
<SNote success>Успешное действие</SNote>
<SNote error>Описание ошибки</SNote>
<script setup>
import { SNote } from 'startup-ui';
</script>
```
:::

## С иконкой и заголовком

<div class="docs-container">
    <SNote icon="circle-info" title="В проекте ещё нет ключевиков" />
    <ol>
        <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
        <li>Сервис оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
    </ol>
</div>

::: details Показать код
```js
<SNote icon="circle-info" title="В проекте ещё нет ключевиков" />
<ol>
    <li>Добавьте как можно больше запросов, заходы по которым из поиска приносят вам наибольший доход.</li>
    <li>ПФПульт оценит конкуренцию, шанс выхода в топ и бюджет по каждому ключевику.</li>
</ol>
<script setup>
import SNote from 'startup-ui';
</script>
```
:::

В качестве иконок используются названия иконок font-awesome.

<script setup>
import SNote from '../../../packages/startup-ui/src/components/SNote.vue';
</script>