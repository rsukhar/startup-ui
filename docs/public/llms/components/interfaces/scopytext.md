# SCopyText

A component that renders text and provides a convenient "click to copy" functionality with visual feedback. It uses the `useClipboard` composable from `@vueuse/core` under the hood.

## Import

```javascript
import { SCopyText } from 'startup-ui';
```

## Basic Example

By default, the component renders as a block (`layout="input"`) with a border and a copy icon on the right. Clicking it copies the text inside the default slot.

```vue
<SCopyText>ABCD-EFGH-1234-5678</SCopyText>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 450px;">
        <SCopyText>ABCD-EFGH-1234-5678</SCopyText>
    </div>
</template>

<script setup>
import { SCopyText } from 'startup-ui';
<\/script>
```
</details>

## Inline Layout

To embed the copyable text inside a sentence or paragraph, use `layout="inline"`. It removes the border and renders as an inline element with a dashed underline.

```vue
<p>
    Here is a <SCopyText layout="inline">Secret Code</SCopyText> inside a regular text block.
</p>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <p>
        Please use this <SCopyText layout="inline">special_key_123</SCopyText> to activate your account.
    </p>
</template>

<script setup>
import { SCopyText } from 'startup-ui';
<\/script>
```
</details>

## Customizing Copied Text

Sometimes you want to display a user-friendly label but copy a completely different underlying value (like an actual ID or token). Use the `copytext` prop for this:

```vue
<!-- Displays "Secret Code: 777" but copies "777" to clipboard -->
<SCopyText copytext="777">Secret Code: 777</SCopyText>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div style="max-width: 450px;">
        <SCopyText :copytext="actualToken">
            Click to copy your personal token
        </SCopyText>
    </div>
</template>

<script setup>
import { SCopyText } from 'startup-ui';

const actualToken = 'xyz_987654321_abc';
<\/script>
```
</details>

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| layout | `'input'` \| `'inline'` | `'input'` | The visual style of the component. `'input'` is a block with borders, `'inline'` is text with a dashed underline. |
| copytext | string | `undefined` | The actual string to be copied to the clipboard. If omitted, the component falls back to extracting the text content of the default slot. |
| size | `'small'` \| `'normal'` \| `'large'` | `'normal'` | Size modifier (currently prepared in props but styling relies on context font-sizes). |

## Slots

| Name | Description |
|------|-------------|
| default | The text content displayed to the user. |
