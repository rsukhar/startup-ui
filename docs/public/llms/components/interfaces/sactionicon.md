# SActionIcon

Action icon (mostly used in tables). Uses FontAwesome icons. Simplifies requesting confirmation before dangerous actions (like deletion) using a single attribute.

## Import

```javascript
import { SActionIcon } from 'startup-ui';
```

## Basic Example

Standard click event:

```vue
<SActionIcon icon="pen-to-square" title="Edit" @click="edit" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <SActionIcon icon="pen-to-square" title="Edit" @click="edit" />
        <SActionIcon :icon="['far', 'calendar']" title="Calendar" @click="openCalendar" />
    </div>
</template>

<script setup>
import { SActionIcon } from 'startup-ui';

function edit() {
    console.log('Edit clicked');
}
function openCalendar() {
    console.log('Calendar clicked');
}
<\/script>
```
</details>

## Render as Anchor

If `href` attribute is provided, the icon is rendered as a semantically correct anchor:

```vue
<SActionIcon icon="pen-to-square" title="Go to site" href="https://example.com" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SActionIcon icon="arrow-up-right-from-square" title="Go to site" href="https://example.com" />
</template>

<script setup>
import { SActionIcon } from 'startup-ui';
<\/script>
```
</details>

## InertiaJS Internal Link

If you need to render an internal InertiaJS link, use the `is` attribute:

```vue
<SActionIcon icon="pen-to-square" title="Edit" :is="Link" href="/users/edit" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SActionIcon icon="pen-to-square" title="Edit" :is="Link" href="/users/edit" />
</template>

<script setup>
import { SActionIcon } from 'startup-ui';
import { Link } from '@inertiajs/vue3';
<\/script>
```
</details>

## Require Confirmation

For dangerous actions, highlight the icon with the `danger` attribute and request confirmation before execution using the `confirm` attribute:

```vue
<SActionIcon title="Delete" @click="deleteUser" icon="trash" danger confirm="Are you sure you want to delete this user?" />
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SActionIcon 
        title="Delete" 
        @click="deleteUser" 
        icon="trash" 
        danger 
        confirm="Are you sure you want to delete this user?" 
        confirmTitle="Confirm Action"
    />
</template>

<script setup>
import { SActionIcon } from 'startup-ui';

function deleteUser() {
    console.log('User deleted');
}
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | string \| string[] | required | FontAwesome icon name (e.g. `'trash'` or `['far', 'calendar']`) |
| danger | boolean | false | Highlights the icon in red color |
| confirm | string | undefined | Text for the confirmation dialog before triggering `@click` |
| confirmTitle | string | 'Необходимо подтверждение' | Title for the confirmation dialog |
| is | string \| Component | undefined | HTML element or Vue component to render as (e.g. InertiaJS `Link`) |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| click | none | Emitted when icon is clicked. Triggered AFTER confirmation dialog if `confirm` prop is present. |
