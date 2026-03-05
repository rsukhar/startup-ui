# SColumnSettings

A component used to configure table columns (reorder, show, hide, reset to presets) typically placed above an `STable`.

## Import

```javascript
import { SColumnSettings } from 'startup-ui';
```

## Basic Example

The component uses `v-model` (which binds to the `modelValue` prop) to control an array of string keys representing the active and ordered columns. The available columns and their display titles must be passed to the `options` prop.

```vue
<template>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <SColumnSettings 
            v-model="activeColumns" 
            :options="availableColumns" 
        />
    </div>

    <!-- Usage with STable -->
    <STable :data="users">
        <template #header>
            <td v-for="col in activeColumns" :key="col">
                {{ availableColumns[col] }}
            </td>
        </template>
        <template #row="{ row }">
            <td v-for="col in activeColumns" :key="col">
                {{ row[col] }}
            </td>
        </template>
    </STable>
</template>

<script setup>
import { ref } from 'vue';
import { SColumnSettings, STable } from 'startup-ui';

// Map of column keys to their readable titles
const availableColumns = {
    username: 'Username',
    email: 'Email',
    role: 'Role',
    balance: 'Balance'
};

// Initial state of columns
const activeColumns = ref(['username', 'role']);
<\/script>
```

## Permanent Columns

If you want to prevent users from hiding specific columns, pass an array of their keys to `permanentColumns`. These columns will be disabled in the dropdown list, meaning their checkboxes cannot be unchecked.

```vue
<SColumnSettings 
    v-model="activeColumns" 
    :options="availableColumns" 
    :permanent-columns="['username']" 
/>
```

## Column Presets

You can provide a list of presets to reset the columns to a predefined state. This is done via `columnPresets`. When presets are passed, a "Reset" section appears at the bottom of the dropdown. 

```vue
<template>
    <SColumnSettings 
        v-model="activeColumns" 
        :options="availableColumns" 
        :column-presets="presets" 
    />
</template>

<script setup>
const presets = [
    {
        title: 'Default view',
        columns: ['username', 'role']
    },
    {
        title: 'Detailed view',
        columns: ['username', 'email', 'role', 'balance']
    }
];
<\/script>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string[]` | `[]` | An array of active column keys. Configures standard `v-model` behavior. |
| options | `Record<string, string>` | `{}` | A dictionary mapping column keys to their display titles. e.g. `{ id: 'Identifier' }` |
| columnPresets | `SColumnSettingsPreset[]` | `[]` | Array of objects `{ title: string, columns: string[] }`. Used to provide quick reset options. |
| permanentColumns | `string[]` | `[]` | Array of column keys that the user is not allowed to turn off. |

## Slots

| Name | Description |
|------|-------------|
| label | The main button content that opens the dropdown. By default, it shows an icon and the text "Настроить колонки". |
| setpreset | To override the template for a single reset preset button in the dropdown footer. Exposes `{ preset }` scope. |
