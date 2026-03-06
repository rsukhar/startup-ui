# SSelect

A customizable select dropdown component. It supports standard dictionary or array options, search filtering, clearable values, virtual scrolling for massive lists, and inline rendering.

## Import

```javascript
import { SSelect } from 'startup-ui';
```

## Basic Example

The `options` prop accepts either a standard object mapping (`{ value: 'label' }`) or an array of tuples (`[[value, 'label']]`). You use `v-model` to bind the selected value.

```vue
<template>
    <SSelect v-model="selectedCity" :options="cities" placeholder="Choose a city" />
</template>

<script setup>
import { ref } from 'vue';
import { SSelect } from 'startup-ui';

const selectedCity = ref(null);

// Using an object dictionary
const cities = {
    'ny': 'New York',
    'la': 'Los Angeles',
    'chi': 'Chicago'
};

// Alternatively, using an array of tuples (preserves order)
// const cities = [['ny', 'New York'], ['la', 'Los Angeles'], ['chi', 'Chicago']];
<\/script>
```

## Filterable & Clearable

You can allow users to search through the options by enabling the `filterable` prop. The component will render a text input instead of just the label. You can also allow users to reset the selection to `null` using the `clearable` prop.

```vue
<SSelect 
    v-model="country" 
    :options="countries" 
    filterable 
    clearable 
    placeholder="Type to search..." 
/>
```

## Virtual Scrolling

If you have thousands of options, rendering all them at once will severe performance. Enable the `virtual` prop to let the component only render the visible items. You can configure how many items to buffer using `virtualScrollSize` (default: 10).

```vue
<SSelect 
    v-model="bigData" 
    :options="thousandsOfItems" 
    virtual 
    :virtualScrollSize="15" 
/>
```

## Inline Rendering

If you need a select that looks like plain text or fits tightly within a sentence, you can use the `inline` prop. This removes the outer border and padding.

```vue
<p>
    Sort by: 
    <SSelect v-model="sortBy" :options="{date: 'Date', name: 'Name'}" inline />
</p>
```

## Advanced Slot Usage

You can customize how the currently selected value is displayed using the `#value` slot, and how each item inside the dropdown list is displayed using the `#option` slot.

```vue
<SSelect v-model="user" :options="users">
    <!-- Customize the selected label display -->
    <template #value="{ value }">
        <strong>Selected ID:</strong> {{ value }}
    </template>

    <!-- Customize list items -->
    <template #option="{ option }">
        <FontAwesomeIcon icon="user" /> {{ option.value }} - {{ option.label }}
    </template>
</SSelect>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `any` | `undefined` | The bound selected value. |
| options | `Record<string \| number, any> \| any[]` | `{}` | The data source. E.g. `{ val: 'Label' }` or `[['val', 'Label']]`. |
| placeholder | string | `undefined` | Text shown when no option is selected. |
| filterable | boolean | `false` | Enables a text input to filter the options array. |
| disabled | boolean | `false` | Disables interaction with the component. |
| clearable | boolean | `false` | Shows a "cross" icon to reset the `modelValue` to `null`. |
| inline | boolean | `false` | Removes borders and padding for inline usage. |
| virtual | boolean | `false` | Enables virtual scrolling to handle large arrays of options efficiently. |
| virtualScrollSize | number | `10` | The number of DOM nodes to render at once when `virtual` is true. |

## Slots

| Name | Description |
|------|-------------|
| value | Customizes the current selection label in the closed state. Provides `{ value }`. Ignored if `filterable` is true. |
| option | Customizes the rendering of each dropdown item. Provides `{ option }` where `option` is `{ label, value }`. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| change | `(value: any)` | Fired when an option is selected or the selection is cleared. |
| filter | `(value: string)` | Fired when the user types in the filter input (if `filterable` is true). |
