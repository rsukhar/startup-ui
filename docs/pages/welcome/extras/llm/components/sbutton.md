# SButton

Button component. Automatically picks the semantic element based on context: an anchor for links or a button for form submission. Allows passing an InertiaJS Link element via the `is` attribute.

## Import

```javascript
import { SButton } from 'startup-ui';
```

## Default Color

Use `color`, `outlined`, `transparent`, `disabled`, `small`, `loading` and `fullwidth` to style buttons.

```vue
<SButton>Primary Action</SButton>
<SButton outlined>Secondary Action</SButton>
<SButton transparent>Transparent Button</SButton>
<SButton disabled>Disabled Button</SButton>
<SButton small>Small Button</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <SButton>Primary Action</SButton>
        <SButton outlined>Secondary Action</SButton>
        <SButton transparent>Transparent Button</SButton>
        <SButton disabled>Disabled Button</SButton>
        <SButton small>Small Button</SButton>
    </div>
</template>

<script setup>
import { SButton } from 'startup-ui';
<\/script>
```
</details>

## Red Button

```vue
<SButton color="red">Primary Action</SButton>
<SButton outlined color="red">Secondary Action</SButton>
<SButton transparent color="red">Transparent Button</SButton>
<SButton disabled color="red">Disabled Button</SButton>
<SButton small color="red">Small Button</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <SButton color="red">Primary Action</SButton>
        <SButton outlined color="red">Secondary Action</SButton>
        <SButton transparent color="red">Transparent Button</SButton>
        <SButton disabled color="red">Disabled Button</SButton>
        <SButton small color="red">Small Button</SButton>
    </div>
</template>

<script setup>
import { SButton } from 'startup-ui';
<\/script>
```
</details>

## Green Button

```vue
<SButton color="green">Primary Action</SButton>
<SButton outlined color="green">Secondary Action</SButton>
<SButton transparent color="green">Transparent Button</SButton>
<SButton disabled color="green">Disabled Button</SButton>
<SButton small color="green">Small Button</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <SButton color="green">Primary Action</SButton>
        <SButton outlined color="green">Secondary Action</SButton>
        <SButton transparent color="green">Transparent Button</SButton>
        <SButton disabled color="green">Disabled Button</SButton>
        <SButton small color="green">Small Button</SButton>
    </div>
</template>

<script setup>
import { SButton } from 'startup-ui';
<\/script>
```
</details>

## Yellow Button

```vue
<SButton color="yellow">Primary Action</SButton>
<SButton outlined color="yellow">Secondary Action</SButton>
<SButton transparent color="yellow">Transparent Button</SButton>
<SButton disabled color="yellow">Disabled Button</SButton>
<SButton small color="yellow">Small Button</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-row">
        <SButton color="yellow">Primary Action</SButton>
        <SButton outlined color="yellow">Secondary Action</SButton>
        <SButton transparent color="yellow">Transparent Button</SButton>
        <SButton disabled color="yellow">Disabled Button</SButton>
        <SButton small color="yellow">Small Button</SButton>
    </div>
</template>

<script setup>
import { SButton } from 'startup-ui';
<\/script>
```
</details>

## Full Width Button

```vue
<SButton fullwidth>Primary Action</SButton>
<SButton fullwidth color="red">Primary Action</SButton>
<SButton fullwidth color="green">Primary Action</SButton>
<SButton fullwidth color="yellow">Primary Action</SButton>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div>
        <SButton fullwidth>Primary Action</SButton>
        <SButton fullwidth color="red">Primary Action</SButton>
        <SButton fullwidth color="green">Primary Action</SButton>
        <SButton fullwidth color="yellow">Primary Action</SButton>
    </div>
</template>

<script setup>
import { SButton } from 'startup-ui';
<\/script>
```
</details>

## Form Submission

When a button is inside a form, it automatically submits the form:

```vue
<SForm method="post" action="/users/create">
  ...
  <SButton>Create User</SButton>
</SForm>
```

## Custom Action

```vue
<SButton @click="createUser">Create User</SButton>
```

## Link Navigation

When `href` is provided, the button renders as a semantic anchor element:

```vue
<SButton href="https://pfpult.ru/docs">Documentation</SButton>
```

## InertiaJS Internal Link

Use the `is` attribute to render the button as an InertiaJS Link:

```vue
<SButton :is="Link" href="/projects/create">Create Project</SButton>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| outlined | boolean | false | Outlined button style (no fill) |
| transparent | boolean | false | Transparent button without border |
| fullwidth | boolean | false | Full width button (stretches to container width) |
| small | boolean | false | Small button size |
| disabled | boolean | false | Disables the button (non-clickable, opacity: 0.3) |
| loading | boolean | false | Loading state (non-clickable, wait cursor) |
| color | string | — | Button color: `"red"`, `"green"`, `"yellow"` or custom |
| is | string \| Component | — | HTML element or Vue component to render as (e.g. InertiaJS `Link`) |

## Slots

| Name | Description |
|------|-------------|
| default | Button content (text, icon, etc.) |
