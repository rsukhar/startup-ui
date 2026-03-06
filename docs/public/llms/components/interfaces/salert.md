# SAlert

A programmatic alert/toast notification component. Like `SConfirm`, it is invoked via JavaScript function calls and does not need to be added to the `<template>`.

## Import

```javascript
import { SAlert } from 'startup-ui';
```

## Basic Examples

You can call specific methods based on the type of alert you want to show: `info`, `success`, or `error`.

```javascript
SAlert.info('Information message');
SAlert.success('Action successful!');
SAlert.error('An error occurred');
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-col">
        <SButton @click="showInfo">Show Info</SButton>
        <SButton @click="showSuccess" color="green">Show Success</SButton>
        <SButton @click="showError" color="red">Show Error</SButton>
    </div>
</template>

<script setup>
import { SAlert, SButton } from 'startup-ui';

function showInfo() {
    SAlert.info('Here is some information');
}

function showSuccess() {
    SAlert.success('The operation was successful');
}

function showError() {
    SAlert.error('Failed to save data');
}
<\/script>
```
</details>

## Custom Duration (Delayed Close)

By default, an alert closes automatically after 3 seconds (3000ms). You can override this using the `closeAfter` option:

```javascript
SAlert.info('This will close after 5 seconds', {
    closeAfter: 5000
});
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SButton @click="showLongAlert">Show Long Alert</SButton>
</template>

<script setup>
import { SAlert, SButton } from 'startup-ui';

function showLongAlert() {
    SAlert.info('I will stay here for 5 seconds.', {
        closeAfter: 5000,
    });
}
<\/script>
```
</details>

## Global Configuration Component
Note: For `SAlert` methods to work, its internal component is usually rendered globally at the root layout level (e.g., via a plugin or inside `App.vue`). The methods dynamically control this global instance.

## Arguments & Methods

The component exports the following methods:

- `SAlert.info(text: string, options?: AlertOptions)`
- `SAlert.success(text: string, options?: AlertOptions)`
- `SAlert.error(text: string, options?: AlertOptions)`
- `SAlert.open(text: string, options?: AlertOptions)` - Base method where you must specify the `type` inside the `options` object if needed.

## AlertOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| type | `'success'` \| `'info'` \| `'error'` | `'info'` (when using `.open()`) | Visual style of the alert. |
| closeAfter | number | `3000` | Time in milliseconds before the alert auto-closes. |
