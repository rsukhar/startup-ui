# SNote

A text note component to display informational, warning, success, or error messages. Uses FontAwesome for icons.

## Import

```javascript
import { SNote } from 'startup-ui';
```

## Basic Example

Notes can have different color themes to represent different semantic meanings. 

```vue
<SNote>Standard style (primary color)</SNote>
<SNote gray>Gray color note</SNote>
<SNote attention>Attention required</SNote>
<SNote success>Successful action</SNote>
<SNote error>Error description</SNote>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div class="s-col">
        <SNote>Standard style (primary color)</SNote>
        <SNote gray>Gray color note</SNote>
        <SNote attention>Attention required</SNote>
        <SNote success>Successful action</SNote>
        <SNote error>Error description</SNote>
    </div>
</template>

<script setup>
import { SNote } from 'startup-ui';
<\/script>
```
</details>

## With Icon and Title

You can provide an `icon` and a `title` to make the note more descriptive. The content inside the default slot can be any HTML (like lists or paragraphs).

```vue
<SNote icon="circle-info" title="No keywords added yet">
    <ol>
        <li>Add as many search queries as possible that bring you the most revenue.</li>
        <li>The service will evaluate the competition, chance to reach the top, and budget for each keyword.</li>
    </ol>
</SNote>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SNote icon="circle-info" title="No keywords added yet">
        <ol>
            <li>Add as many search queries as possible that bring you the most revenue.</li>
            <li>The service will evaluate the competition, chance to reach the top, and budget for each keyword.</li>
        </ol>
    </SNote>
</template>

<script setup>
import { SNote } from 'startup-ui';
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | string \| string[] | undefined | FontAwesome icon name to display next to the title |
| title | string | undefined | Title text displayed at the top of the note |
| gray | boolean | false | Styles the note with a gray (neutral) background |
| attention | boolean | false | Styles the note with a yellow background (for warnings/attention) |
| success | boolean | false | Styles the note with a green background (for success messages) |
| error | boolean | false | Styles the note with a red background and border (for errors) |

## Slots

| Name | Description |
|------|-------------|
| default | Main content of the note. Supports raw text or HTML (paragraphs, lists, etc.) |
