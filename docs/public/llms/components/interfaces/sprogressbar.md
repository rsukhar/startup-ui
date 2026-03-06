# SProgressBar

A progress bar component.

## Import

```javascript
import { SProgressBar } from 'startup-ui';
```

## Basic Example

Use the `percentage` prop (number from 0 to 100) to set the progress. You can pass an optional label through the default slot.

```vue
<SProgressBar :percentage="50">Updating project...</SProgressBar>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <SProgressBar :percentage="readyPercentage">
        Updating project...
    </SProgressBar>
    
    <SButton @click="readyPercentage += 10">Increase</SButton>
</template>

<script setup>
import { ref } from 'vue';
import { SProgressBar, SButton } from 'startup-ui';

const readyPercentage = ref(50);
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| percentage | number | `undefined` | Required. The current progress value from 0 to 100. |

## Slots

| Name | Description |
|------|-------------|
| default | The text label displayed next to the progress bar (e.g., "Updating project..."). |
