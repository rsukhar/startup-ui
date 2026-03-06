# STree

A recursive tree component for displaying hierarchical data. It supports drag-and-drop reordering, checkboxes, node selection, and local storage persistence for expanded states.

## Import

```javascript
import { STree } from 'startup-ui';
```

## Basic Example

Provide a hierarchical array of objects to the `data` prop. The component uses `v-model` to track the single selected node ID (if `selectable` is true) or an array of selected node IDs (if `checkboxes` are enabled).

```vue
<template>
    <STree :data="treeData" v-model="selectedNodeId" selectable />
</template>

<script setup>
import { ref } from 'vue';
import { STree } from 'startup-ui';

const selectedNodeId = ref('node-2');

const treeData = [
    {
        id: 'node-1',
        label: 'Folder 1',
        children: [
            { id: 'node-1-1', label: 'File A' },
            { id: 'node-1-2', label: 'File B' }
        ]
    },
    {
        id: 'node-2',
        label: 'Folder 2'
    }
];
<\/script>
```

## Checkboxes & Selection

To allow multiple selections via checkboxes, add the `checkboxes` prop. The `v-model` will automatically expect and update an array of IDs.

If you want selecting a parent node to automatically select all of its children, add the `selectWithChildren` prop.

```vue
<STree 
    :data="treeData" 
    v-model="selectedIdsArray" 
    checkboxes 
    selectWithChildren 
/>
```

## Drag & Drop

`STree` natively supports drag-and-drop operations to reorder or nest nodes. Enable it with the `draggable` prop and listen to the `@drop` event to handle the actual data mutation in your parent component.

The emitted `@drop` event provides:
- `targetNode`: The node the dragged item was dropped onto.
- `event`: The native DragEvent.
- `dropType`: A string indicating where the item was dropped relative to the target (`'before'`, `'after'`, or `'inner'`).

```vue
<template>
    <STree 
        :data="treeData" 
        draggable 
        @drop="handleDrop" 
    />
</template>

<script setup>
function handleDrop(targetNode, event, dropType) {
    // Implement your logic to reorder `treeData` here based on `dropType`
    console.log(`Dropped item ${dropType} node ${targetNode.id}`);
}
<\/script>
```

## Custom Node Rendering

If you need more than just simple text labels, use the `#node` scoped slot to fully customize how each tree item is rendered.

```vue
<STree :data="treeData">
    <template #node="{ node }">
        <div class="my-custom-node">
            <FontAwesomeIcon :icon="node.icon || 'folder'" />
            <span>{{ node.label }}</span>
            <SBadge v-if="node.isNew" color="green">New</SBadge>
        </div>
    </template>
</STree>
```

## Expanded State and Persistence

You can control which nodes are initially expanded by passing an array of IDs to `expandedKeys`.
To remember the expanded/collapsed state across page reloads, pass a unique string to `storeExpandedKeysTo` to save the state in `localStorage`.

```vue
<STree 
    :data="treeData" 
    :expandedKeys="['node-1']" 
    storeExpandedKeysTo="fileManagerTreeState" 
/>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | `STreeNode[]` | `undefined` | The hierarchical data array. Objects must have `id` and optionally `label` and `children`. |
| modelValue / v-model | `any` | `undefined` | Tracks the selected node ID (string/number) or array of IDs (if `checkboxes` is true). |
| expandedKeys | `(string \| number)[]` | `[]` | Array of node IDs that should be expanded on the first render. |
| draggable | boolean | `false` | Enables HTML5 drag-and-drop features. Emits `dragstart` and `drop` events. |
| selectable | boolean | `false` | Allows clicking a node to select it (updates `v-model` with single ID). |
| checkboxes | boolean | `false` | Renders a checkbox next to each node (updates `v-model` with an array of IDs). |
| selectWithChildren | boolean | `false` | When true (and `checkboxes` is enabled), toggling a parent toggles all its descendant checkboxes. |
| storeExpandedKeysTo | string | `undefined` | A unique key for `localStorage` to persist the tree's expanded/collapsed state. |
| bordered | boolean | `false` | Adds horizontal bottom borders between tree rows. |

### STreeNode Interface

| Property | Type | Description |
|----------|------|-------------|
| id | string \| number | **Required**. Unique identifier for the node. |
| label | string | Optional. The display text (ignored if you use the `#node` slot). |
| children | `STreeNode[]` | Optional. An array of nested child nodes. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| dragstart | `(node: STreeNode, event: DragEvent)` | Fired when the user starts dragging a node. |
| drop | `(targetNode: STreeNode, event: DragEvent, dropType: 'before' \| 'after' \| 'inner')` | Fired when a dragged node is dropped. Used to reorganize data. |
| change | `(node: STreeNode)` | Fired when a node is clicked and selected (when `selectable` is true). |

## Slots

| Name | Description |
|------|-------------|
| node | Scoped slot `{ node }` allowing custom HTML rendering for each tree item. Replaces the default `{{ node.label }}` text. |
