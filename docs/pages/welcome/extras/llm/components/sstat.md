# SStat

A key-value statistics row component, typically used to display forms of metrics, properties, or aggregated values aligned by titles.

## Import

```javascript
import { SStat } from 'startup-ui';
```

## Basic Example

You can pass the title via the `title` prop and the value via the default slot.

```vue
<SStat title="Total Payments">112</SStat>
<SStat title="Total Revenue">777,000 $</SStat>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div>
        <SStat title="Total Payments">{{ totalPayments }}</SStat>
        <SStat title="Total Revenue">{{ totalRevenue }} $</SStat>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SStat } from 'startup-ui';

const totalPayments = ref(112);
const totalRevenue = ref(777000);
<\/script>
```
</details>

## Custom Title

If you need to place HTML or other components (like an `STooltip`) inside the title, use the `#title` slot instead of the prop:

```vue
<SStat>
    <template #title>
        Total Revenue <STooltip>For the selected period</STooltip>
    </template>
    777,000 $
</SStat>
```

## Modifiers

Through boolean props, you can modify the appearance of the stat row:

```vue
<!-- large text value -->
<SStat title="Revenue" large>777,000 $</SStat>

<!-- nowrap forces the value to truncate using ellipsis if it overflows -->
<SStat title="Description" nowrap>A very long description that might not fit...</SStat>

<!-- wide puts title and value at opposite ends (space-between) -->
<SStat title="Items" wide>10</SStat>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | `undefined` | The label text for the statistic. |
| value | string \| number | `undefined` | An alternative to the default slot for providing the value. |
| nowrap | boolean | `false` | Prevents text wrapping and uses an ellipsis for overflowing values. |
| large | boolean | `false` | Increases the font size and line height of the value. |
| wide | boolean | `false` | Uses `justify-content: space-between` to push the value to the far right. |

## Slots

| Name | Description |
|------|-------------|
| default | The main value content of the statistic. Takes priority over the `value` prop. |
| title | For custom title layouts (e.g. adding icons or tooltips). Takes priority over the `title` prop. |
