# SHorizontalMenu

A simple horizontal navigation menu typically used in page headers or subheaders. It automatically renders links using Inertia's `<Link>` component and supports marking items as active.

## Import

```javascript
import { SHorizontalMenu } from 'startup-ui';
```

## Basic Example

Provide an array of link objects to the `links` prop. Each object can define a label, a URL, and whether it is currently active.

```vue
<SHorizontalMenu :links="navigationItems" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="background: var(--s-primary); padding-top: 20px;">
        <SHorizontalMenu :links="navigationItems" />
    </div>
</template>

<script setup>
import { SHorizontalMenu } from 'startup-ui';

const navigationItems = [
    { label: 'Overview', url: '/dashboard', active: true },
    { label: 'Users', url: '/users' },
    { label: 'Settings', url: '/settings' }
];
<\/script>
```
</details>

## Submenus (Children)

The component supports a nested `children` array within link objects. However, note that the default CSS for `.s-horizontalmenu-children` has `display: none;`, so out of the box, submenus might require additional styling to be visible (e.g., via CSS hover states).

```vue
<script setup>
const navigationItems = [
    { 
        label: 'Reports', 
        url: '/reports',
        children: [
            { label: 'Daily', url: '/reports/daily' },
            { label: 'Weekly', url: '/reports/weekly' }
        ]
    }
];
<\/script>
```

## Props

The component accepts a single property `links` which is an array of objects.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| links | `SHorizontalMenuLink[]` | `[]` | Array of objects defining the menu items. |

### SHorizontalMenuLink Interface

When defining the `links` array, each object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| label | string | **Required**. The text displayed for the menu item. |
| url | string | Optional. The destination URL. If provided, the item renders as an Inertia `<Link>`. If omitted, it renders as a `<div>`. |
| active | boolean | Optional. If `true`, applies the `.active` CSS class, drawing an active indicator (like an arrow/triangle pointing up). |
| className | string | Optional. Custom CSS classes to append to the item's wrapper div. |
| stat | string \| number | Optional. Intended for displaying statistic badges (note: currently requires custom implementation in templates, as it's defined in the interface but not used in the default template). |
| children | `SHorizontalMenuLink[]` | Optional. Allows nesting of menus by recursively calling `SHorizontalMenu`. |

## Slots

This component does not use slots. UI is driven entirely by the `links` prop.
