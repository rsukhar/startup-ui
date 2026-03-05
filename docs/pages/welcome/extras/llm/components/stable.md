# STable

A flexible table component with built-in styling for headers, rows, and footer, complete with generic data iteration and empty state handling.

## Import

```javascript
import { STable } from 'startup-ui';
```

## Basic Example

Provide the data array to the `data` prop and use the `#row` slot to define how each object should be rendered as a table row. The component automatically handles iterating over the data. 

```vue
<template>
    <STable :data="users" hoverable striped>
        <template #header>
            <td>ID</td>
            <td>Name</td>
            <td class="center">Role</td>
            <td class="right">Actions</td>
        </template>
        
        <template #row="{ row, index }">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td class="center">{{ row.role }}</td>
            <td class="right">
                <a href="#">Edit</a>
            </td>
        </template>
    </STable>
</template>

<script setup>
import { STable } from 'startup-ui';

const users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' }
];
<\/script>
```

## Empty State Handling

If the `data` array is empty (or the object has no keys), `STable` will automatically show a "No Data" row spanning all columns. You can customize the message displayed using the `nodata` prop or the `#nodata` slot.

```vue
<STable :data="users" nodata="No users found for this filter.">
    <!-- slots -->
</STable>
```

## Fixed Header

By providing a explicit `height` layout (like `400px` or `50vh`), the table automatically enables a fixed header (and footer) that stays stuck to the top/bottom while you scroll through the body.

```vue
<STable :data="largeDataArray" height="400px">
    <!-- The header will remain sticky while you scroll through these rows -->
</STable>
```

## Table Cell Utilities

The component comes with built-in CSS classes that you can apply directly to `<td>` elements in both the header and body rows:

- `.center`: Centers the text.
- `.right`: Aligns the text to the right.
- `.nowrap`: Prevents text wrapping (`white-space: nowrap`).
- `thead td.asc` and `thead td.desc` (Applied to header cells): Automatically adds an upward or downward arrow next to links (`<a>`) inside the header cell indicating sort direction.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | `T[] \| Record<string \| number, T>` | `undefined` | The data to iterate over. |
| hoverable | boolean | `false` | If true, adds a hover highlight effect to table rows. |
| striped | boolean | `false` | If true, adds alternating background colors to rows. |
| bordered | boolean | `false` | If true, adds vertical and horizontal borders between all cells. |
| nodata | string | `'Ничего не найдено'` | Text displayed when `data` is completely empty. |
| height | string | `undefined` | Fixed height for the container (e.g. `300px`). Automatically triggers `fixedheader` mode if set. |
| topScroll | boolean | `false` | Inverts the table so that the horizontal scrollbar appears at the top. |

## Slots

| Name | Description |
|------|-------------|
| header | Content of the single `<tr>` inside the `<thead>`. Perfect for standard tables. |
| headers | If you need complete control over `<thead>` (e.g. multiple header rows), use this instead of `#header`. |
| row | Scoped slot `{ row, index }` used to render a `<td>` cell setup for each item in the `data` prop. |
| default | If you don't use the `data` prop and `#row` slot, you can manually build your `<tbody>` inside the default slot. |
| footer | Content of the single `<tr>` inside the `<tfoot>`. |
| footers | Full control over `<tfoot>` content. |
| nodata | Custom HTML to show when `data` is empty, replacing the `nodata` text prop. |
