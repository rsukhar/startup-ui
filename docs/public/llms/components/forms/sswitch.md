# SSwitch

A boolean toggle switch component. Often used as an alternative to a single checkbox for turning settings on and off.

## Import

```javascript
import { SSwitch } from 'startup-ui';
```

## Basic Example

The component uses `v-model` to track its state. By default, it manages a simple `boolean` (`true` or `false`). The text label is provided via the default slot.

```vue
<template>
    <SSwitch v-model="notificationsEnabled">
        Enable email notifications
    </SSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { SSwitch } from 'startup-ui';

const notificationsEnabled = ref(false);
<\/script>
```

## Custom Values

Sometimes the backend doesn't expect boolean values (`true`/`false`), but rather specific strings or numbers like `'yes'`/`'no'` or `1`/`0`. You can configure what the `v-model` outputs and expects using `trueValue` and `falseValue`.

```vue
<template>
    <SSwitch 
        v-model="publishStatus" 
        trueValue="published" 
        falseValue="draft"
    >
        Make page public
    </SSwitch>
</template>

<script setup>
import { ref } from 'vue';

// Initial state is 'draft'
const publishStatus = ref('draft');
<\/script>
```

## Disabled State

You can use the `disabled` prop to make the switch read-only and grayed out.

```vue
<SSwitch v-model="strictMode" disabled>
    Strict Mode (Locked by Administrator)
</SSwitch>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `any` | `undefined` | The bound value of the switch. |
| disabled | boolean | `false` | Disables interaction and reduces opacity. |
| trueValue | `boolean \| string \| number` | `true` | The value assigned to `v-model` when the switch is in the "On" position. |
| falseValue | `boolean \| string \| number` | `false` | The value assigned to `v-model` when the switch is in the "Off" position. |

## Slots

| Name | Description |
|------|-------------|
| default | The textual label or HTML content displayed next to the switch. |
