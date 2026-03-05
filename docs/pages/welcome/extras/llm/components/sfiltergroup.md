# SFilterGroup & SFilter

A powerful combination of components used to build complex, reactive filtering interfaces. `SFilterGroup` manages the state of multiple filters and can seamlessly synchronize them with URL query parameters using Inertia.js. `SFilter` acts as a wrapper for individual input components, automatically handling data binding and debouncing.

## Import

```javascript
import { SFilterGroup, SFilter } from 'startup-ui';
```

## Basic Example

Wrap your input components (like `SInput`, `SSelect`, etc.) inside `SFilter` components, and group them inside an `SFilterGroup`. The `name` prop on `SFilter` dictates the key used in the group's `v-model`.

```vue
<template>
    <SFilterGroup v-model="filters">
        <SFilter name="search">
            <SInput placeholder="Search users..." />
        </SFilter>
        
        <SFilter name="role">
            <SSelect :options="{ admin: 'Admin', user: 'User' }" placeholder="Any Role" />
        </SFilter>
    </SFilterGroup>
</template>

<script setup>
import { ref } from 'vue';
import { SFilterGroup, SFilter, SInput, SSelect } from 'startup-ui';

// This object will automatically update: { search: '...', role: '...' }
const filters = ref({});
<\/script>
```

## Synchronizing with URL Query Parameters

The true power of `SFilterGroup` lies in its ability to bind filter states directly to the URL. By setting `:bindToQuery="true"`, any changes to the filters will automatically perform an Inertia `router.get` request, appending the filters to the URL. It also restores the initial state from the URL on page load.

To avoid spamming requests while a user is typing, you can add a `debounce` (in milliseconds) to specific `SFilter` components.

```vue
<template>
    <SFilterGroup v-model="filters" :bindToQuery="true">
        <!-- Will update the URL with ?query=... 500ms after the user stops typing -->
        <SFilter name="query" :debounce="500">
            <SInput placeholder="Type to search..." />
        </SFilter>
    </SFilterGroup>
</template>

<script setup>
import { ref } from 'vue';
const filters = ref({});
<\/script>
```

## Ignoring Specific Query Params and Values

Sometimes you don't want certain URL parameters to be cleared by the filter group, or you don't want empty values cluttering the URL. `SFilterGroup` handles this via two props:

- `ignoreQueryNames`: Array of URL parameter keys that the filter group should ignore (default: `['page']`).
- `ignoreQueryValues`: Array of values that should not be pushed to the URL. For example, if a filter is reset to an empty string, it will be removed from the URL entirely (default: `['', null, undefined, false]`).

## SFilterGroup Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `Record<string, any>` | `{}` | The object storing the state of all inner `SFilter` components. |
| bindToQuery | boolean | `false` | If true, automatically syncs the model with window URL query parameters via Inertia. |
| ignoreQueryNames | `string[]` | `['page']` | URL parameter names that should be ignored by the filter syncing process. |
| ignoreQueryValues | `any[]` | `['', null, undefined, false]` | Values that will trigger the removal of the parameter from the URL. |

## SFilter Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | `undefined` | **Required**. The key under which this filter's value will be stored in the parent `SFilterGroup`'s model. |
| debounce | number | `0` | Delay in milliseconds before saving the value. Crucial for text inputs when `bindToQuery` is active. |

## Special Handling

- **SDatePicker Ranges**: `SFilter` has built-in special handling for `SDatePicker` components operating in `range` mode. It transparently converts the returned array into a hyphen-separated string (e.g., `start-end`) for cleaner URL representation, and transforms it back into an array when passing it back to the date picker.
