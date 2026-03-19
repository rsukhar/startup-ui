# SImagePreview

Картинка, которую можно посмотреть более детально в диалоговом окне.

## Базовый пример

Выводим картинку, которая увеличивается при клике:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview :src="animals" />
    </div>
</div>

<div v-pre>

```vue
<template>
    <SImagePreview src="/img/animals.webp" />
</template>
```

</div>

## Кастомное превью

Если первоначально до клика показывается другое изображение (напр. меньшего размера), используйте атрибут `preview`:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview :preview="nature" :src="animals" />
    </div>
</div>

<div v-pre>

```vue
<template>
    <SImagePreview preview="/img/nature.jpg" src="/img/animals.webp" />
</template>
```

</div>

Если нужен полностью кастомный контент превью, используйте слот `#preview`:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview :src="animals">
            <template #preview>
                <img :src="nature" />
            </template>
        </SImagePreview>
    </div>
</div>

<div v-pre>

```vue
<template>
    <SImagePreview src="/img/animals.webp">
        <template #preview>
            <img src="/img/nature.jpg" />
        </template>
    </SImagePreview>
</template>
```

</div>

## Кастомная иконка увеличения

В атрибуте `icon` указываем название иконки FontAwesome:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview :src="animals" icon="magnifying-glass-plus" />
    </div>
</div>

<div v-pre>

```vue
<template>
    <SImagePreview src="/img/animals.webp" icon="magnifying-glass-plus" />
</template>
```

</div>

Для полностью кастомной иконки используйте слот `#icon`:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview :src="animals" icon="magnifying-glass-plus">
            <template #icon>
                🔍
            </template>
        </SImagePreview>
    </div>
</div>

<div v-pre>

```vue
<template>
    <SImagePreview src="/img/animals.webp">
        <template #icon>
            🔍
        </template>
    </SImagePreview>
</template>
```

</div>

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| src | string | undefined | URL полноразмерного изображения, показываемого в модальном окне. |
| preview | string | undefined | URL миниатюры. Если не указан, используется `src`. |
| icon | string \| string[] | `'magnifying-glass'` | Имя иконки FontAwesome для оверлея при наведении. |

### Слоты (Slots)

| Название | Описание |
|----------|----------|
| preview | Полностью заменяет стандартный элемент `<img>` миниатюры. |
| icon | Заменяет иконку увеличения, появляющуюся при наведении. |

<script setup>
import SImagePreview from '../../../../packages/startup-ui/src/components/SImagePreview.vue';
import animals from '../../../resources/img/animals.webp';
import nature from '../../../resources/img/nature.jpg';
</script>

<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>