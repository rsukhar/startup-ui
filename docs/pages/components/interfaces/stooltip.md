# STooltip

Иконка вопроса со всплывающей подсказкой.

<SToggle title="В чем отличие от аналогов?">
    <p>В отличие от популярных библиотек компонентов для Vue3:</p>
    <ol>
        <li>Текст подсказки в слоте, так что там можно размещать HTML-контент и ссылки на расширенную информацию.</li>
        <li>Событийная логика сделана так, что мышку можно перевести с иконки на текст подсказки и кликнуть по ссылке, которая в ней.</li>
    </ol>
</SToggle>

## Базовый пример

Текст подсказки передается в основной слот компонента:

<div class="docs-container" style="display:block;">
Показы
<STooltip>Кол-во показов поискового сниппета. Данные из вебмастера за последний день, когда они есть для запроса</STooltip>
</div>

<div v-pre>

```vue
<template>
    Показы 
    <STooltip>
        Кол-во показов поискового сниппета. 
        Данные из вебмастера за последний день, когда они есть для запроса
    </STooltip>
</template>
```

</div>

## Фиксированное положение

По умолчанию положение подсказки выбирается автоматически исходя из свободного места на экране. Чтобы указать положение явно, используйте атрибут `at`:

<div class="docs-container" style="gap: 20px">
    <div>Сверху <STooltip at="top">Подсказка сверху</STooltip></div>
    <div>Справа <STooltip at="right">Подсказка справа</STooltip></div>
    <div>Снизу <STooltip at="bottom">Подсказка снизу</STooltip></div>
    <div>Слева <STooltip at="left">Подсказка слева</STooltip></div>
</div>

<div v-pre>

```vue
<template>
    <STooltip at="top">Подсказка сверху</STooltip>
    <STooltip at="right">Подсказка справа</STooltip>
    <STooltip at="bottom">Подсказка снизу</STooltip>
    <STooltip at="left">Подсказка слева</STooltip>
</template>
```

</div>

## Кастомная иконка

Если нужна другая иконка, её можно заменить атрибутом `icon`:

<div class="docs-container">
    <div>Подсказка с другой иконкой <STooltip icon="circle-info">Используем иконку circle-info</STooltip></div>
</div>

<div v-pre>

```vue
<template>
    <STooltip icon="circle-info">Используем иконку circle-info</STooltip>
</template>
```

</div>

Для совсем нестандартных триггеров (эмодзи, текст, другие компоненты) используйте слот `#icon`:

<div class="docs-container">
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</div>

<div v-pre>

```vue
<template>
    <STooltip>
        <template #icon>❓</template>
        Используем в качестве иконки эмодзи
    </STooltip>
</template>
```

</div>

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| at | `'top'` \| `'bottom'` \| `'right'` \| `'left'` \| `null` | `null` | Принудительно задает положение подсказки. По умолчанию рассчитывается автоматически. |
| icon | string \| string[] | `'circle-question'` | Имя иконки FontAwesome для триггера подсказки. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| default | Содержимое внутри пузыря подсказки. Поддерживает HTML. |
| icon | Переопределяет стандартную иконку FontAwesome. Позволяет разместить эмодзи, текст или кастомные элементы. |

<script setup>
import SToggle from '../../../../packages/startup-ui/src/components/SToggle.vue';
import STooltip from '../../../../packages/startup-ui/src/components/STooltip.vue';
</script>

<style lang="scss" scoped>
.s-tooltip {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}
</style>