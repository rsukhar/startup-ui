# SDropdownMenu

A dropdown menu component that appears when hovering over its label. It can be populated either via an array of links or by using slots. 

## Import

```javascript
import { SDropdownMenu } from 'startup-ui';
```

## Basic Example using Props

The easiest way to create a dropdown menu is to pass an array of links to the `links` prop. The component automatically uses Inertia's `Link` internally for these items.

```vue
<SDropdownMenu :links="menuLinks" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="display: flex; justify-content: flex-end;">
        <SDropdownMenu :links="menuLinks" />
    </div>
</template>

<script setup>
import { SDropdownMenu } from 'startup-ui';

const menuLinks = [
    { label: 'Profile', url: '/profile' },
    { label: 'Settings', url: '/settings', active: true },
    { label: 'Logout', url: '/logout' }
];
<\/script>
```
</details>

## Custom Label and Links via Slots

If you need more control over the label content or the dropdown items (for instance, to use buttons instead of links), you can use the `#label` and `default` slots.

```vue
<SDropdownMenu>
    <!-- Custom label content -->
    <template #label>
        <FontAwesomeIcon icon="user" /> 
        <span>My Account</span>
    </template>
    
    <!-- Custom dropdown items -->
    <a href="/profile">View Profile</a>
    <button @click="logout">Sign Out</button>
</SDropdownMenu>
```

## Label Behavior

The text shown on the dropdown label is determined in this order:
1. `#label` slot content (if provided)
2. `label` prop (if provided, it is always shown regardless of selection)
3. The `label` of the currently `active` link from the `links` array
4. The `placeholder` text 

If `labelLink` is provided, the label itself becomes a clickable Inertia link.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| links | `SDropdownMenuLink[]` | `[]` | Array of link objects containing `{ label, url, active }`. Used to auto-generate the dropdown items. |
| placeholder | string | `'Перейти к'` | Text shown on the label if no `label` prop is set, no `#label` slot is used, and no `active` link exists. |
| label | string | `undefined` | Static text for the label. If set, it overrides the `placeholder` and `active` link text. |
| labelLink | string | `undefined` | URL for the label. If provided, the label area itself acts as an Inertia `Link`. |

## Slots

| Name | Description |
|------|-------------|
| default | Custom content for the dropdown list. Placed after the items from the `links` prop (if any). |
| label | Custom content for the clickable dropdown label area. Takes highest priority for rendering the label content. |
