# SRadioGroup & SRadio

Components for rendering a set of mutually exclusive radio buttons. `SRadioGroup` manages the state of the selected value, while `SRadio` represents the individual buttons.

## Import

```javascript
import { SRadioGroup, SRadio } from 'startup-ui';
```

## Basic Usage with Options

The simplest way to use these components is to supply an `options` object or array to `SRadioGroup`. It will automatically generate the `SRadio` components internally. The group uses `v-model` to track the currently selected value.

```vue
<template>
    <SRadioGroup v-model="selectedColor" :options="colors" />
</template>

<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const selectedColor = ref('red');

const colors = {
    red: 'Red Color',
    blue: 'Blue Color',
    green: 'Green Color'
};
<\/script>
```

## Manual Layout with Slots

If you need a more intricate layout (like splitting radios across different grid columns or inserting other HTML blocks between them), you can place `SRadio` components manually inside the `SRadioGroup` default slot.

The `SRadioGroup` uses `provide/inject` to synchronize the active state with all nested `SRadio` elements automatically.

```vue
<template>
    <SRadioGroup v-model="deliveryMethod">
        <div class="row">
            <SRadio value="courier">Courier Delivery</SRadio>
            <p>Delivered next day to your door.</p>
        </div>
        <div class="row">
            <SRadio value="pickup">Self Pickup</SRadio>
            <p>Pick up from our store anytime.</p>
        </div>
    </SRadioGroup>
</template>

<script setup>
import { ref } from 'vue';
import { SRadioGroup, SRadio } from 'startup-ui';

const deliveryMethod = ref('courier');
<\/script>
```

## Button Style "Tabs"

By adding the `buttons` prop to `SRadioGroup`, the standard circular radio icons are hidden, and the options are rendered as a connected row of clickable tabs (segmented control).

```vue
<template>
    <SRadioGroup v-model="period" :options="periods" buttons />
</template>

<script setup>
import { ref } from 'vue';
import { SRadioGroup } from 'startup-ui';

const period = ref('day');
const periods = { day: 'Today', week: 'This Week', month: 'This Month' };
<\/script>
```

You can also stack these buttons vertically by combining the `buttons` and `vertical` props:

```vue
<SRadioGroup v-model="period" :options="periods" buttons vertical />
```

## Placeholder (Clear Option)

If you provide a `placeholder` string to `SRadioGroup`, it automatically creates an extra `SRadio` at the beginning of the list with an empty string value (`""`). This allows users to reset their selection.

```vue
<SRadioGroup 
    v-model="filter" 
    :options="{ active: 'Active', disabled: 'Disabled' }" 
    placeholder="Any Status" 
/>
```

## SRadioGroup Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `any` | `undefined` | The currently selected value. |
| options | `Record<string \| number, any> \| any[]` | `{}` | Automatically generates radio buttons from a dictionary or an array of tuples (e.g. `[[val, title]]`). |
| buttons | boolean | `false` | Modifies the layout to look like segmented button tabs rather than traditional circular radios. |
| vertical | boolean | `false` | Stacks the standard radios (or segmented buttons) vertically. |
| placeholder | string | `undefined` | Adds a leading radio button with an empty string value for resetting the selection. |

## SRadioGroup Slots

| Name | Description |
|------|-------------|
| default | Slot to manually place custom `SRadio` elements if you aren't using the `options` prop. |

## SRadio Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `number \| string \| boolean` | `undefined` | Required. The value assigned to the `v-model` when this specific radio is selected. |
| disabled | boolean | `false` | Disables the radio button, graying it out and preventing clicks. |
| labelClass | string | `undefined` | Optional CSS classes to add to the wrapper `<label>`. |

## SRadio Slots

| Name | Description |
|------|-------------|
| default | The textual content or HTML displayed next to the radio circle (or inside the button in `buttons` mode). |
