# SDialog

A draggable modal dialog window component. It uses `v-model` for visibility control and `<Teleport>` to render directly in the body.

## Import

```javascript
import { SDialog } from 'startup-ui';
```

## Basic Example

Use `v-model` to control the open/close state. It supports a default slot for the body content.

```vue
<SDialog v-model="isShown" title="Login">
    <SForm>
        <SFormRow title="Username" name="login"><SInput /></SFormRow>
        <SFormRow title="Password" name="password"><SInput type="password" /></SFormRow>
        <SButton>Sign In</SButton>
    </SForm>
</SDialog>

<SButton @click="isShown = true">Open Dialog</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SDialog v-model="isShown" title="Log into your account">
        <SForm>
            <SFormRow title="Username" name="login">
                <SInput />
            </SFormRow>
            <SFormRow title="Password" name="password">
                <SInput type="password" />
            </SFormRow>
            <SButton>Sign In</SButton>
        </SForm>
    </SDialog>

    <SButton @click="isShown = true">Open Dialog</SButton>
</template>

<script setup>
import { ref } from 'vue';
import { SDialog, SButton, SForm, SFormRow, SInput } from 'startup-ui';

const isShown = ref(false);
<\/script>
```
</details>

## Fixed Width

You can specify a custom width parameter using the `width` prop:

```vue
<SDialog v-model="isShown" title="Login" width="500px">
    <p>Dialog content</p>
</SDialog>
```

## Non-Modal Dialog

By default, the dialog is modal (blocks interaction with the background using an overlay). To make it non-modal (removes the backdrop overlay), use the `not-modal` flag:

```vue
<SDialog v-model="isShown" title="Login" not-modal>
    <p>You can interact with the background behind this dialog.</p>
</SDialog>
```

## Prevent Closing on Overlay Click

By default, clicking the background overlay closes the window. To prevent this, add an event modifier to the `@overlay-click` event emitted by the component:

```vue
<SDialog v-model="isShown" title="Login" @overlay-click.stop.prevent>
    <p>This dialog will not close when you click outside of it.</p>
</SDialog>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue (v-model) | boolean | false | Controls the visibility of the dialog. |
| title | string | undefined | Title text displayed in the header. |
| width | string | undefined | Custom width for the dialog window (e.g., `'500px'`, `'80vw'`). |
| notModal | boolean | false | If `true`, the background overlay is completely removed. |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| update:modelValue | boolean | Emitted when v-model changes (to support two-way binding). |
| overlay-click | none | Emitted when the user clicks the background overlay. Dialog closes unless prevented (e.g. `@overlay-click.stop.prevent`). |
| hide | none | Emitted when the dialog is closed either via the X icon or overlay click. |

## Slots

| Name | Description |
|------|-------------|
| default | Main content body of the dialog window. |
