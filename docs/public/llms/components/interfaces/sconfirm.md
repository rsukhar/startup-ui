# SConfirm

A programmatic confirmation dialog component. Unlike standard Vue components, `SConfirm` is invoked via a JavaScript function call and does not need to be added to the `<template>`.

## Import

```javascript
import { SConfirm } from 'startup-ui';
```

## Basic Example

To show a confirmation dialog, call `SConfirm.open()` with the confirmation message and an options object containing callbacks.

```javascript
SConfirm.open('Are you sure you want to delete this user?', {
    title: 'Confirm Deletion',
    onAccept: () => {
        console.log('User deleted');
    }
});
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SButton @click="deleteUser" color="red">Delete User</SButton>
</template>

<script setup>
import { SConfirm, SButton } from 'startup-ui';

function deleteUser() {
    SConfirm.open('Are you sure you want to delete this user?', {
        title: 'Confirm Deletion',
        acceptLabel: 'Yes, delete',
        cancelLabel: 'Cancel',
        onAccept: () => {
            console.log('User deleted successfully');
        },
        onCancel: () => {
            console.log('Deletion cancelled');
        }
    });
}
<\/script>
```
</details>

## Global Configuration Component
Note: For `SConfirm.open()` to work, its internal component is usually rendered globally at the root layout level (e.g., via a plugin or inside `App.vue`). The `SConfirm.open` method dynamically controls this global instance.

## Arguments

`SConfirm.open(message: string, options?: ConfirmOptions)`

| Argument | Type | Description |
|----------|------|-------------|
| message | string | Required. The main text/HTML content of the confirmation dialog. |
| options | object | Optional configuration object (see `ConfirmOptions` below). |

## ConfirmOptions (TemplateData)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | string | `'Необходимо подтверждение'` | The header title of the dialog. |
| acceptLabel | string | `'Да'` | Text for the "Confirm" / "Accept" button. |
| cancelLabel | string | `'Нет'` | Text for the "Cancel" button. |
| onAccept | function | `() => {}` | Callback triggered when the confirm button is clicked. |
| onCancel | function | `() => {}` | Callback triggered when the cancel button or background overlay is clicked. |
