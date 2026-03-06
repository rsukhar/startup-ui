# SPagination

A pagination component designed to work seamlessly with server-side pagination (like Laravel's paginator) and Inertia.js. It renders a list of clickable page links and allows the user to change the number of items displayed per page.

## Import

```javascript
import { SPagination } from 'startup-ui';
```

## Basic Example

The most common use case is passing the `links` array directly from a backend paginated response. The component automatically renders Inertia `<Link>` components for each page.

```vue
<template>
    <!-- Assuming `users` is a Laravel LengthAwarePaginator object passed via Inertia props -->
    <SPagination :links="users.links" />
</template>

<script setup>
import { SPagination } from 'startup-ui';

defineProps({
    users: Object
});
<\/script>
```

## Preserving State and Scroll

By default, clicking a pagination link will preserve the scroll position on the page (`preserveScroll: true`) but will not preserve the component state (`preserveState: false`). You can override this behavior using props.

```vue
<SPagination 
    :links="users.links" 
    :preserve-scroll="false" 
    :preserve-state="true" 
/>
```

## "Per Page" Selector and Total Counter

`SPagination` can display a dropdown allowing users to change how many items they see per page. When a user selects a new value, the component automatically updates the URL query string (adding `?perpage=X` block, removing any existing `page=X`), and makes an Inertia request.

It can also show a textual counter (e.g., "Shown: 1 - 15 of 45").

```vue
<template>
    <SPagination 
        :links="users.links" 
        :per-page-options="[15, 30, 50, 100]" 
        :per_page="users.per_page"
        :from="users.from"
        :to="users.to"
        :total="users.total"
        url="/users/list"
    />
</template>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| links | `PaginationLink[]` | `[]` | The array of link objects containing `{ url, label, active }`. Usually generated directly by the backend paginator. |
| url | string | `location.pathname` | The base URL to use when the user changes the "per page" amount. |
| preserveScroll | boolean | `true` | Passed directly to Inertia links. Preserves vertical scroll position. |
| preserveState | boolean | `false` | Passed directly to Inertia links. Preserves local component state. |
| perPageOptions | `number[] \| string[] \| Record<string, any>` | `undefined` | Defines the options available in the "Items per page" select dropdown (e.g., `[10, 20, 50]`). |
| per_page | number | `undefined` | The currently selected number of items per page. Bound to the internal native select. |
| from | number | `undefined` | The starting index of the currently shown items. Needed to display the "Shown: X - Y of Z" counter. |
| to | number | `undefined` | The ending index of the currently shown items. Needed to display the counter. |
| total | number | `undefined` | The total number of records across all pages. Needed to display the counter. |

## Slots

This component does not use slots. UI is driven entirely by props.
