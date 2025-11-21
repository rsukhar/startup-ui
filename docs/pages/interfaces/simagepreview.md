# SImagePreview

Картинка, которую можно посмотреть более детально в диалоговом окне.

## Базовый пример

Выводим картинку, которая увеличивается при клике.

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../resources/img/animals.webp" />
    </div>
</div>

::: details Показать код
```js
<template>
<div class="preview-container">
    <SImagePreview src="../../resources/img/animals.webp" />
</div>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
```
:::

## Кастомное превью

Если первоначально до клика показывается другое изображение (напр.меньшего размера), то используем атрибут preview:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview preview="../../resources/img/nature.jpg" src="../../resources/img/animals.webp" />
    </div>
</div>

::: details Показать код
```js
<template>
<div class="preview-container">
    <SImagePreview preview="../../resources/img/nature.jpg" src="../../resources/img/animals.webp" />
</div>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
```
:::

Если нужно вставить кастомный контент, используем слот “preview”:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../resources/img/animals.webp">
            <template #preview>
                <img src="../../resources/img/nature.jpg" />
            </template>
        </SImagePreview>
    </div>
</div>

::: details Показать код
```js
<template>
<div class="preview-container">
    <SImagePreview src="../../resources/img/animals.webp">
        <template #preview>
            <img src="../../resources/img/nature.jpg" />
        </template>
    </SImagePreview>
</div>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
```
:::

## Кастомная иконка увеличения

В icon-атрибуте указываем название иконки:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus" />
    </div>
</div>

::: details Показать код
```js
<template>
<div class="preview-container">
    <SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus" />
</div>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
```
:::

Если нужно вставить кастомный контент, используем слот “icon”:

<div class="docs-container">
    <div class="preview-container">
        <SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus">
            <template #icon>
                🔍
            </template>
        </SImagePreview>
    </div>
</div>

::: details Показать код
```js
<template>
<div class="preview-container">
    <SImagePreview src="../../resources/img/animals.webp" icon="magnifying-glass-plus">
        <template #icon>
            🔍
        </template>
    </SImagePreview>
</div>
</template>
<script setup>
import { SImagePreview } from 'startup-ui';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>
```
:::

<script setup>
import SImagePreview from '../../../packages/startup-ui/src/components/SImagePreview.vue';
</script>
<style lang="scss">
.preview-container {
    max-width: 200px;
}
</style>