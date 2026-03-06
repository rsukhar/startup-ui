# SVerticalMenu

A collapsible vertical navigation menu component, typically used in sidebars. It supports nested children, active states, and persisting the expanded/collapsed state of menus in `localStorage`.

## Import

```javascript
import { SVerticalMenu } from 'startup-ui';
```

## Basic Example

Provide an array of link objects to the `links` prop. Nested items should be placed in the `children` array.

```vue
<SVerticalMenu :links="sidebarMenu" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="width: 250px;">
        <SVerticalMenu :links="sidebarMenu" />
    </div>
</template>

<script setup>
import { SVerticalMenu } from 'startup-ui';

const sidebarMenu = [
    { id: 'home', label: 'Dashboard', url: '/dashboard', active: true },
    { 
        id: 'settings', 
        label: 'Settings', 
        children: [
            { id: 'profile', label: 'Profile', url: '/settings/profile' },
            { id: 'security', label: 'Security', url: '/settings/security' }
        ]
    }
];
<\/script>
```
</details>

## Expanding Items

By default, the menu automatically expands any nodes that contain the currently `active` link. 
You can manually force nodes to be open on mount by passing an array of their IDs to `expandedKeys`:

```vue
<!-- Forces the 'settings' node to be open initially -->
<SVerticalMenu :links="sidebarMenu" :expandedKeys="['settings']" />
```

## Persisting State

If you want the menu to remember which folders the user left open across page reloads, use the `storeExpandedKeysTo` prop. Pass a unique string key that will be used for `localStorage`.

```vue
<SVerticalMenu 
    :links="sidebarMenu" 
    storeExpandedKeysTo="myAppSidebarState" 
/>
```

## Types and Publication Status

Links in `SVerticalMenuLink` support a few special flags:
- `type: 'section'`: Marks the link as a section header (makes the text bolder, adds vertical margins).
- `isPublished: false`: Adds a strikethrough/opacity effect and a "hidden" eye icon (`fa-eye-slash`) next to the label, indicating that the item is a draft or not visible to regular users.

```vue
<script setup>
const advancedMenu = [
    { id: 'sec1', label: 'MAIN MENU', type: 'section' }, // Section Header
    { id: 'p1', label: 'Published Page', url: '/page1', isPublished: true },
    { id: 'p2', label: 'Draft Page', url: '/draft', isPublished: false } // Shows eye-slash icon
];
<\/script>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| links | `SVerticalMenuLink[]` | `[]` | Array of objects defining the menu hierarchy. |
| expandedKeys | `(string \| number)[]` | `[]` | Array of IDs for nodes that should be forcefully expanded on initial render. |
| storeExpandedKeysTo | string | `undefined` | A `localStorage` key. If provided, the array of expanded node IDs is persisted in the browser storage. |

### SVerticalMenuLink Interface

When defining the `links` array, each object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | string \| number | **Required**. A unique identifier for the node. Used for tracking open/closed states. |
| label | string | **Required**. The text displayed for the menu item. |
| url | string | Optional. The destination URL. If provided, renders an Inertia `<Link>`. If omitted, acts purely as a toggler for children. |
| active | boolean | Optional. If `true`, applies the `.active` CSS class to highlight the item. |
| className | string | Optional. Custom CSS classes to append. |
| type | string | Optional. Accepts `'section'` to render the item as a bold section header. |
| isPublished | boolean | Optional. If `false`, adds transparency and an "eye-slash" icon to represent draft/hidden content. |
| children | `SVerticalMenuLink[]` | Optional. Allows infinite nesting of submenus. |

## Slots

This component does not use slots. UI is driven entirely by the `links` prop.
