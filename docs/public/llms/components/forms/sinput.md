# SInput

A versatile input component for collecting text data from the user. It supports single-line text fields, passwords, number inputs, and multi-line textareas. It also natively supports prepending and appending icons or text (prefixes/suffixes).

## Import

```javascript
import { SInput } from 'startup-ui';
```

## Basic Example

Use `v-model` to bind the input's value. The default type is `text`.

```vue
<template>
    <SInput v-model="username" placeholder="Enter your username" />
</template>

<script setup>
import { ref } from 'vue';
import { SInput } from 'startup-ui';

const username = ref('');
<\/script>
```

## Input Types

You can use the `type` prop to change the kind of input rendered. Supported types include `text`, `string`, `email`, `password`, `number`, `search`, and `textarea`.

```vue
<!-- Password input -->
<SInput v-model="password" type="password" placeholder="Password" />

<!-- Number input -->
<SInput v-model="age" type="number" placeholder="Enter your age" />
```

## Textarea

Setting `type="textarea"` replaces the `<input>` element with a `<textarea>`. You can control the initial height using the `rows` prop (defaults to 3).

```vue
<SInput 
    v-model="comment" 
    type="textarea" 
    :rows="5" 
    placeholder="Leave a detailed comment here..." 
/>
```

## Prefixes and Suffixes

You can easily add text or icons inside the input field, either before (prefix) or after (suffix) the user's text. You can use the `prefix` / `suffix` props for simple text, or the `#prefix` / `#suffix` slots for complex HTML (like FontAwesome icons).

```vue
<!-- Text/String prefix -->
<SInput v-model="price" prefix="$" type="number" />

<!-- Icon prefix using slot -->
<SInput v-model="searchQuery" placeholder="Search...">
    <template #prefix>
        <FontAwesomeIcon icon="search" />
    </template>
</SInput>

<!-- Text suffix -->
<SInput v-model="weight" suffix="kg" type="number" />
```

## Styling & Disabled State

Use the `disabled` prop to disable the input. Use `inputStyle` to apply specific CSS styles directly to the inner `<input>` or `<textarea>` element itself, rather than the wrapper `div`.

```vue
<SInput v-model="email" disabled />
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue / v-model | `number \| string \| null` | `undefined` | The bound value of the input. |
| type | `'text' \| 'string' \| 'number' \| 'email' \| 'password' \| 'textarea' \| 'search'` | `'text'` | The internal input type. Setting `textarea` renders a `<textarea>`. |
| placeholder | string | `undefined` | Placeholder text shown when input is empty. |
| prefix | string | `undefined` | Simple text to display at the start of the input. Provides `.has-prefix` class to wrapper. |
| suffix | string | `undefined` | Simple text to display at the end of the input. Provides `.has-suffix` class to wrapper. |
| disabled | boolean | `false` | Whether the input is interactive. |
| rows | number | `3` | The number of visible text lines (only applies when `type="textarea"`). |
| inputStyle | `StyleValue` | `undefined` | CSS style-object passed directly to the inner element. |

## Slots

| Name | Description |
|------|-------------|
| prefix | Advanced content (like icons) to display before the input string. Overrides the `prefix` prop. |
| suffix | Advanced content (like icons) to display after the input string. Overrides the `suffix` prop. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| change | `(value: string)` | Fired on the native HTML `@input` event. Emits the stringified native value. |
