# STag

A simple tag or badge component, often used to display statuses, categories, or labels.

## Import

```javascript
import { STag } from 'startup-ui';
```

## Basic Example

By default, the tag is rendered with a gray background. The text content is passed through the default slot.

```vue
<STag>New</STag>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <STag>New</STag>
        <STag>In Progress</STag>
    </div>
</template>

<script setup>
import { STag } from 'startup-ui';
<\/script>
```
</details>

## Colors

You can change the tag's visual appearance using the `color` attribute, which maps directly to the project's standard color palette.

```vue
<!-- Gray (Default) -->
<STag color="gray">Gray Tag</STag>

<!-- Primary Theme Colors -->
<STag color="primary">Primary</STag>
<STag color="primary-dark">Primary Dark</STag>
<STag color="primary-darkest">Primary Darkest</STag>
<STag color="primary-light">Primary Light</STag>
<STag color="primary-lightest">Primary Lightest</STag>

<!-- Red Semantic Colors -->
<STag color="red">Red</STag>
<STag color="red-dark">Red Dark</STag>
<STag color="red-light">Red Light</STag>
<STag color="red-lightest">Red Lightest</STag>

<!-- Yellow Semantic Colors -->
<STag color="yellow">Yellow</STag>
<STag color="yellow-dark">Yellow Dark</STag>
<STag color="yellow-light">Yellow Light</STag>
<STag color="yellow-lightest">Yellow Lightest</STag>

<!-- Green Semantic Colors -->
<STag color="green">Green</STag>
<STag color="green-dark">Green Dark</STag>
<STag color="green-light">Green Light</STag>
<STag color="green-lightest">Green Lightest</STag>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | `'gray'` \| `'primary'` \| `'primary-dark'` \| `'primary-darkest'` \| `'primary-light'` \| `'primary-lightest'` \| `'red'` \| `'red-dark'` \| `'red-light'` \| `'red-lightest'` \| `'yellow'` \| `'yellow-dark'` \| `'yellow-light'` \| `'yellow-lightest'` \| `'green'` \| `'green-dark'` \| `'green-light'` \| `'green-lightest'` | `'gray'` | Background color and text color theme. |

## Slots

| Name | Description |
|------|-------------|
| default | The text content or HTML inside the tag. |
