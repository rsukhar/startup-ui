# SImagePreview

An image component that displays a preview thumbnail and opens a full-size version in a draggable modal dialog when clicked.

## Import

```javascript
import { SImagePreview } from 'startup-ui';
```

## Basic Example

By default, the `src` attribute is used for both the preview thumbnail and the full-sized image in the modal.

```vue
<SImagePreview src="/img/animals.webp" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 200px">
        <SImagePreview src="/img/animals.webp" />
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
```
</details>

## Custom Preview Source

If you want to eagerly load a low-resolution thumbnail before the user clicks to see the high-resolution version, use the `preview` attribute:

```vue
<!-- 'preview' determines the thumbnail, 'src' determines the full image in modal -->
<SImagePreview preview="/img/nature-thumbnail.jpg" src="/img/nature-full.webp" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 200px">
        <SImagePreview preview="/img/nature-thumbnail.jpg" src="/img/nature-full.webp" />
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
```
</details>

## Custom Preview Slot

If you need complete control over the thumbnail block (e.g., you want to use a specific `<img>` element with custom classes or another component), use the `#preview` slot.
Note: You must still provide the `src` attribute so the component knows what image to show in the modal.

```vue
<SImagePreview src="/img/animals.webp">
    <template #preview>
        <img src="/img/nature.jpg" class="custom-thumbnail" alt="Nature thumbnail" />
    </template>
</SImagePreview>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 200px">
        <SImagePreview src="/img/animals.webp">
            <template #preview>
                <img src="/img/nature.jpg" class="custom-thumbnail" />
            </template>
        </SImagePreview>
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
```
</details>

## Custom Magnify Icon Slot

By default, an overlay with a FontAwesome "magnifying glass" icon appears on hover. You can replace this icon using the `#icon` slot.

```vue
<SImagePreview src="/img/animals.webp">
    <template #icon>
        <span>🔍 View Full</span>
    </template>
</SImagePreview>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 200px">
        <SImagePreview src="/img/animals.webp">
            <template #icon>
                🔍
            </template>
        </SImagePreview>
    </div>
</template>

<script setup>
import { SImagePreview } from 'startup-ui';
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| src | string | undefined | The URL of the full-resolution image shown in the modal dialog. |
| preview | string | undefined | Optional URL of the image thumbnail shown before clicking. If omitted, `src` is used. |

## Slots

| Name | Description |
|------|-------------|
| preview | Replaces the default `<img>` thumbnail element completely. |
| icon | Replaces the FontAwesome magnifying glass icon that appears on hover. |
