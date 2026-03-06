# SCheckboxGroup & SCheckbox

A set of components for building single checkboxes or groups of multi-selectable items. `SCheckboxGroup` manages an array of selected values, while `SCheckbox` can either act independently or as part of a group.

## Import

```javascript
import { SCheckboxGroup, SCheckbox } from 'startup-ui';
```

## Basic Single Checkbox

A standalone `SCheckbox` uses `v-model` to track a simple `boolean` state.

```vue
<template>
    <SCheckbox v-model="agreed">I agree to the Terms of Service</SCheckbox>
</template>

<script setup>
import { ref } from 'vue';
import { SCheckbox } from 'startup-ui';

const agreed = ref(false);
<\/script>
```

## Checkbox Group (Array/Object Options)

The most efficient way to render a group of checkboxes is to use `SCheckboxGroup` and pass an options list via the `options` prop. The `v-model` of the group automatically tracks an array of the selected values.
The `options` prop accepts either a dictionary object (`{value: 'Label'}`) or an array of tuples (`[[value, 'Label']]`).

```vue
<template>
    <SCheckboxGroup v-model="selectedRoles" :options="roleOptions" />
</template>

<script setup>
import { ref } from 'vue';
import { SCheckboxGroup } from 'startup-ui';

const selectedRoles = ref(['admin']);

const roleOptions = {
    'admin': 'Administrator',
    'editor': 'Editor',
    'viewer': 'Viewer'
};
<\/script>
```

## Custom Layout with Slots

If you need a more complex layout (like inserting text, links, or other components between checkboxes), you can use `SCheckboxGroup` in conjunction with manually rendered `SCheckbox` components via the default slot. 
Each internal `SCheckbox` must be provided a `value` prop. The group will automatically sync its state using Vue's `provide`/`inject` API.

```vue
<template>
    <SCheckboxGroup v-model="selectedFeatures">
        <SCheckbox value="feature_a">Enable Feature A</SCheckbox>
        <SCheckbox value="feature_b">
            Enable Feature B <STooltip>Extra details here</STooltip>
        </SCheckbox>
    </SCheckboxGroup>
</template>

<script setup>
import { ref } from 'vue';
import { SCheckboxGroup, SCheckbox, STooltip } from 'startup-ui';

const selectedFeatures = ref([]);
<\/script>
```

## Vertical Layout

By default, the checkbox group is displayed in a flexible horizontal row. You can stack them vertically using the `vertical` prop on `SCheckboxGroup`.

```vue
<SCheckboxGroup v-model="verticalSelection" :options="verticalOptions" vertical />
```

## SCheckboxGroup Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `any[]` | `[]` | The array of currently selected values. |
| options | `Record<string \| number, any> \| any[]` | `{}` | The data source. E.g. `{ val: 'Label' }` or `[['val', 'Label']]`. Auto-generates `SCheckbox` elements. |
| vertical | boolean | `false` | Stacks the checkboxes vertically instead of horizontally. |

## SCheckboxGroup Slots

| Name | Description |
|------|-------------|
| default | Area to manually place `SCheckbox` components if `options` is not used. |

## SCheckbox Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `boolean` | `false` | Standard boolean binding for standalone usage. (Ignored if inside `SCheckboxGroup`). |
| value | `string \| number \| boolean` | `undefined` | The actual underlying value of the checkbox. Must be provided when used inside `SCheckboxGroup`. |
| disabled | boolean | `false` | Disables interaction. Also changes the visual style to a faded, locked state. |

## SCheckbox Slots

| Name | Description |
|------|-------------|
| default | The textual content or HTML displayed as the label next to the checkbox icon. |

## SCheckbox Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| change | `(value: boolean \| any)` | Fired when the checkbox state changes. Returns the value. |
