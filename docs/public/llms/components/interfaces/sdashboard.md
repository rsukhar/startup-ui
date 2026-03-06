# SDashboard / SDashboardItem

A system for creating a dashboard layout of cards or widgets (islands), typically used for reports, statistics, and modular interfaces.

## Import

```javascript
import { SDashboard, SDashboardItem } from 'startup-ui';
```

## Basic Example

Wrap `SDashboardItem` components inside an `SDashboard` container. The container automatically distributes items into 1-5 columns using CSS depending on the screen width.

```vue
<SDashboard>
  <SDashboardItem title="Sales">
    Information about recent sales.
  </SDashboardItem>
  <SDashboardItem title="Expenses">
    Information about recent expenses.
  </SDashboardItem>
</SDashboard>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
  <SDashboard>
    <SDashboardItem title="Sales">
      Information about recent sales.
    </SDashboardItem>
    <SDashboardItem title="Expenses">
      Information about recent expenses.
    </SDashboardItem>
  </SDashboard>
</template>

<script setup>
import { SDashboard, SDashboardItem } from 'startup-ui';
<\/script>
```
</details>

## Custom Title & Extra Content

If a simple string via the `title` prop is not enough, you can use the `#title` slot. 
To place elements (like buttons or links) to the right of the title, use the `#extra` slot.

```vue
<SDashboard>  
  <SDashboardItem>
    <template #title>
      Sales <STooltip>Including signed contracts</STooltip>
    </template>
    <template #extra>
      <a href="/reports" class="text-sm">View Full Report</a>
    </template>
    
    <p>Sales overview content...</p>
  </SDashboardItem>
</SDashboard>
```

## Max Content Height

If an item has potentially very tall scrolling content, you can restrict its height using `maxContentHeight`. When the content exceeds this height, a scrollbar will appear.

```vue
<SDashboardItem title="User Log" max-content-height="300">
  <ul>
    <li v-for="log in logs" :key="log.id">{{ log.text }}</li>
  </ul>
</SDashboardItem>
```

## Color Modifiers

By default, dashboard items have a subtle primary-light background. You can use boolean props to apply different background colors:

```vue
<SDashboard>
  <SDashboardItem title="Default Block" />
  <SDashboardItem gray title="Gray Block" />
  <SDashboardItem green title="Green Block" />
  <SDashboardItem red title="Red Block" />
</SDashboard>
```

## SDashboard Props

None. It serves purely as a layout wrapper container.

## SDashboardItem Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | undefined | The text title of the dashboard item. |
| maxContentHeight | string \| number | undefined | Fixed maximum height for the content area (e.g., `300` or `'300px'`). |
| gray | boolean | false | Applies a gray background color. |
| green | boolean | false | Applies a light-green background color. |
| red | boolean | false | Applies a light-red background color. |

## SDashboardItem Slots

| Name | Description |
|------|-------------|
| default | The main body content. |
| title | Replaces the header `title` prop. |
| extra | Container on the right side of the header. Useful for actions, buttons, or links. |
