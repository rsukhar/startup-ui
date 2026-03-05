# SStatus

A textual status component, typically accompanied by an icon.

## Import

```javascript
import { SStatus } from 'startup-ui';
```

## Basic Example

Use the `icon` property to display a FontAwesome icon, the `color` property to set the text/icon color, and the default slot for the text content.

```vue
<div style="display: flex; gap: 20px;">
    <SStatus color="green" icon="check">Running</SStatus>
    <SStatus color="red-dark" icon="triangle-exclamation">Stopped</SStatus>
    <SStatus color="text-light" icon="pause">Not started</SStatus>
</div>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="display: flex; gap: 20px;">
        <SStatus color="green" icon="check">Running</SStatus>
        <SStatus color="red-dark" icon="triangle-exclamation">Stopped</SStatus>
        <SStatus color="text-light" icon="pause">Not started</SStatus>
    </div>
</template>

<script setup>
import { SStatus } from 'startup-ui';
<\/script>
```
</details>

## Colors

You can customize the status color using the standard palette colors via the `color` attribute:

```vue
<!-- Typography / Core -->
<SStatus color="text-light" icon="info-circle">Text Light</SStatus>
<SStatus color="gray" icon="circle">Gray</SStatus>

<!-- Primary Theme Colors -->
<SStatus color="primary" icon="circle">Primary</SStatus>
<SStatus color="primary-dark" icon="circle">Primary Dark</SStatus>
<SStatus color="primary-darkest" icon="circle">Primary Darkest</SStatus>
<SStatus color="primary-light" icon="circle">Primary Light</SStatus>
<SStatus color="primary-lightest" icon="circle">Primary Lightest</SStatus>

<!-- Red Semantic Colors -->
<SStatus color="red" icon="circle">Red</SStatus>
<SStatus color="red-dark" icon="circle">Red Dark</SStatus>
<SStatus color="red-light" icon="circle">Red Light</SStatus>
<SStatus color="red-lightest" icon="circle">Red Lightest</SStatus>

<!-- Yellow Semantic Colors -->
<SStatus color="yellow" icon="circle">Yellow</SStatus>
<SStatus color="yellow-dark" icon="circle">Yellow Dark</SStatus>
<SStatus color="yellow-light" icon="circle">Yellow Light</SStatus>
<SStatus color="yellow-lightest" icon="circle">Yellow Lightest</SStatus>

<!-- Green Semantic Colors -->
<SStatus color="green" icon="circle">Green</SStatus>
<SStatus color="green-dark" icon="circle">Green Dark</SStatus>
<SStatus color="green-light" icon="circle">Green Light</SStatus>
<SStatus color="green-lightest" icon="circle">Green Lightest</SStatus>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | `'text-light'` \| `'gray'` \| `'primary'` \| `'primary-dark'` \| `'primary-darkest'` \| `'primary-light'` \| `'primary-lightest'` \| `'red'` \| `'red-dark'` \| `'red-light'` \| `'red-lightest'` \| `'yellow'` \| `'yellow-dark'` \| `'yellow-light'` \| `'yellow-lightest'` \| `'green'` \| `'green-dark'` \| `'green-light'` \| `'green-lightest'` | undefined | The text and icon color based on the standard palette. |
| icon | string \| string[] | undefined | FontAwesome icon name (e.g., `'check'`, `'triangle-exclamation'`). |

## Slots

| Name | Description |
|------|-------------|
| default | The textual content to display alongside the icon. |
