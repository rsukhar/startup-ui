# STimeline

A vertical timeline component used to present events or data points with a connecting line and markers.

## Import

```javascript
import { STimeline } from 'startup-ui';
```

## Basic Example

Provide an array of items to the `items` prop, and define the content for each item using the `#item` slot. The slot gives you access to the current `item` and its `index`.

```vue
<STimeline :items="timelineEvents">
    <template #item="{ item }">
        <strong>{{ item.time }}</strong> - {{ item.description }}
    </template>
</STimeline>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 400px;">
        <STimeline :items="events">
            <template #item="{ item }">
                <div>
                    <strong>{{ item.last_visit_diff }} ago</strong>: {{ item.username }} stopped transitions
                </div>
            </template>
        </STimeline>
    </div>
</template>

<script setup>
import { STimeline } from 'startup-ui';

const events = [
    {
        id: 1,
        last_visit_diff: '2 d. 6 h',
        username: 'Ivanov',
    }, 
    {
        id: 2,
        last_visit_diff: '4 d. 2 h',
        username: 'Petrov',
    }, 
    {
        id: 3,
        last_visit_diff: '22 d. 1 h',
        username: 'Sidorov',
    }
];
<\/script>
```
</details>

## Custom Keys

By default, the component expects each item to have an `id` property to use as a `v-for` key. If your array objects use a different primary key, you can specify it with the `keyBy` prop.

```vue
<!-- Uses the 'guid' property for v-for tracking -->
<STimeline :items="events" keyBy="guid">
    <template #item="{ item }">
        {{ item.description }}
    </template>
</STimeline>
```

Alternatively, `keyBy` can be a function:

```vue
<STimeline :items="events" :keyBy="(item, index) => index + '-' + item.title">
    ...
</STimeline>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `T[]` | `undefined` | Required array of data objects to iterate over for the timeline. |
| keyBy | `string` \| `(item: T, index: number) => string \| number` | `'id'` | The property name or function used to extract a unique key for each item in the `v-for` loop. |

## Slots

| Name | Bindings | Description |
|------|----------|-------------|
| item | `{ item: T, index: number }` | Slot to render the content next to the timeline marker for each item. |
