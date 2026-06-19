# SImagePreview

Картинка, которую можно посмотреть более детально в диалоговом окне.

## Базовый пример

Выводим картинку, которая увеличивается при клике.

```vue
<template>
    <div class="preview-container">
        <SImagePreview src="/animals.webp" />
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui'
</script>
```

## Кастомное превью

Если первоначально до клика показывается другое изображение (напр.меньшего размера), то используем атрибут preview:

```vue
<template>
    <div class="preview-container">
        <SImagePreview preview="/nature.jpg" src="/animals.webp" />
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui'
</script>
```

Если нужно вставить кастомный контент, используем слот "preview":

```vue
<div class="preview-container">
    <SImagePreview src="/animals.webp">
        <template #preview>
            <img src="/nature.jpg" />
        </template>
    </SImagePreview>
</div>
```

## Кастомная иконка увеличения

В icon-атрибуте указываем название иконки:

```vue
<template>
    <div class="preview-container">
        <SImagePreview src="/animals.webp" icon="magnifying-glass-plus" />
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui'
</script>
```

Если нужно вставить кастомный контент, используем слот "icon":

```vue
<div class="preview-container">
    <SImagePreview src="/animals.webp" icon="magnifying-glass-plus">
        <template #icon>
            🔍
        </template>
    </SImagePreview>
</div>
```

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

<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
